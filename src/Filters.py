import cv2
import numpy as np
from scipy.signal import wiener
from scipy.optimize import minimize
import matplotlib.pyplot as plt
from skimage.morphology import medial_axis, skeletonize
from skimage.util import invert
from scipy.fftpack import fft2, ifft2, fftshift, ifftshift
from skimage import io, color, filters, segmentation
from flask import jsonify
from sklearn.cluster import KMeans

class Filters:
    def __init__(self, name):
        self.name = name

    def adaptive_filter(self, path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        adaptive_filtered = cv2.adaptiveThreshold(
            image, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 2)
        img_path = path + "adaptive_filter_output_img.jpg"
        cv2.imwrite(img_path, adaptive_filtered)
        return img_path

    def average_filter(self, path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        kernel_size = 5
        kernel = np.ones((kernel_size, kernel_size),
                         np.float32) / (kernel_size * kernel_size)
        average_filtered = cv2.filter2D(image, -1, kernel)
        img_path = path + "average_filter_output_img.jpg"
        cv2.imwrite(img_path, average_filtered)
        return img_path

    def butterworth_filter(self, path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        rows, cols = image.shape
        f_transform = fft2(image)
        f_transform_shifted = fftshift(f_transform)
        cutoff_frequency = 20
        order = 2
        butterworth_highpass = np.zeros_like(image)
        center_x, center_y = rows // 2, cols // 2

        for i in range(rows):
            for j in range(cols):
                distance = np.sqrt((i - center_x) ** 2 + (j - center_y) ** 2)
                butterworth_highpass[i, j] = 1 / \
                    (1 + (distance / cutoff_frequency) ** (2 * order))

        filtered_image_shifted = f_transform_shifted * butterworth_highpass
        filtered_image = ifftshift(filtered_image_shifted)
        filtered_image = ifft2(filtered_image).real
        filtered_image = cv2.normalize(
            filtered_image, None, 0, 255, cv2.NORM_MINMAX)
        img_path = path + "butterworth_filter_output_img.jpg"
        cv2.imwrite(img_path, filtered_image)
        return img_path

    def high_pass_filter(self, path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        blurred = cv2.GaussianBlur(image, (5, 5), 0)
        high_pass = image - blurred
        high_pass = cv2.normalize(high_pass, None, 0, 255, cv2.NORM_MINMAX)
        high_pass = np.uint8(high_pass)
        img_path = path + "high_pass_filter_output_img.jpg"
        cv2.imwrite(img_path, high_pass)
        return img_path

    def homomarphic_filter(self, path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        image_float = np.float32(image)
        log_image = np.log1p(image_float)
        f_transform = np.fft.fft2(log_image)
        f_transform_shifted = np.fft.fftshift(f_transform)
        D0 = 30
        c = 1
        M, N = image.shape
        u, v = np.meshgrid(np.arange(M), np.arange(N), sparse=False)
        D_uv = np.sqrt((u - M / 2) ** 2 + (v - N / 2) ** 2)
        H = (1 - np.exp(-c * (D_uv ** 2 / (D0 ** 2)))) * \
            (1 - np.exp(-c * (D0 ** 2 / D_uv ** 2)))
        H = cv2.resize(H, (image.shape[1], image.shape[0]))
        filtered_f_transform = f_transform_shifted * H
        filtered_image = np.abs(np.fft.ifft2(
            np.fft.ifftshift(filtered_f_transform)))
        filtered_image = cv2.normalize(
            filtered_image, None, 0, 255, cv2.NORM_MINMAX)
        filtered_image = np.uint8(filtered_image)
        img_path = path + "homomarphic_filter_output_img.jpg"
        cv2.imwrite(img_path, filtered_image)
        return img_path

    def laplacian_filter(self, path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        laplacian = cv2.Laplacian(image, cv2.CV_64F)
        laplacian_8bit = cv2.convertScaleAbs(laplacian)
        img_path = path + "laplacian_filter_output_img.jpg"
        cv2.imwrite(img_path, laplacian_8bit)
        return img_path

    def low_pass_filter(self, path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        blurred_image = cv2.GaussianBlur(image, (7, 7), 0)
        img_path = path + "low_pass_filter_output_img.jpg"
        cv2.imwrite(img_path, blurred_image)
        return img_path

    def non_local_mean_filter(self, path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        if image.dtype != 'uint8' or len(image.shape) != 3 or image.shape[2] not in [3, 4]:
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        denoised_image = cv2.fastNlMeansDenoisingColored(
            image, None, h=10, templateWindowSize=7, searchWindowSize=21)

        img_path = path + "non_local_mean_filter_output_img.jpg"
        cv2.imwrite(img_path, denoised_image)
        return img_path

    def notch_filter(self, path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        f_transform = np.fft.fft2(image)
        f_transform_shifted = np.fft.fftshift(f_transform)
        height, width = image.shape
        center_x, center_y = width // 2, height // 2
        notch_radius = 20
        notch_filter = np.ones((height, width), dtype=np.float32)
        cv2.circle(notch_filter, (center_x, center_y), notch_radius, 0, -1)
        filtered_f_transform = f_transform_shifted * notch_filter
        filtered_image = np.fft.ifftshift(filtered_f_transform)
        filtered_image = np.fft.ifft2(filtered_image)
        filtered_image = np.abs(filtered_image)
        filtered_image = np.uint8(filtered_image)
        img_path = path + "notch_filter_output_img.jpg"
        cv2.imwrite(img_path, filtered_image)
        return img_path

    def unsharp_masking(self, path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        blurred_image = cv2.GaussianBlur(image, (0, 0), 2)
        unsharp_mask = cv2.addWeighted(image, 1.5, blurred_image, -0.5, 0)
        img_path = path + "unsharp_masking_output_img.jpg"
        cv2.imwrite(img_path, unsharp_mask)
        return img_path

    def weiner_filters(self, path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        noise = np.random.normal(0, 25, image.shape)
        noisy_image = image + noise
        filtered_image = wiener(noisy_image, mysize=5, noise=25**2)
        img_path = path + "weiner_filter_output_img.jpg"
        cv2.imwrite(img_path, filtered_image)
        return img_path

    def dft(self, path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        dft = cv2.dft(np.float32(image), flags=cv2.DFT_COMPLEX_OUTPUT)
        dft_shift = np.fft.fftshift(dft)
        magnitude_spectrum = np.log(cv2.magnitude(
            dft_shift[:, :, 0], dft_shift[:, :, 1]) + 1)  # Adding 1 to prevent log(0)
        img_path = path + "dft_output_img.jpg"
        cv2.imwrite(img_path, magnitude_spectrum)
        return img_path
    
    def dilation(self,path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        kernel = np.ones((5, 5), np.uint8)
        dilated_image = cv2.dilate(image, kernel, iterations=1)
        img_path = path + "dilation_output_img.jpg"
        cv2.imwrite(img_path, dilated_image)
        return img_path
    
    def errosion(self,path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        kernel = np.ones((5, 5), np.uint8)
        eroded_image = cv2.erode(image, kernel, iterations=1)
        img_path = path + "eroded_output_img.jpg"
        cv2.imwrite(img_path, eroded_image)
        return img_path     
    
    def hierarchical(self,path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        kernel = np.ones((5, 5), np.uint8)
        eroded_image = cv2.erode(image, kernel, iterations=1)
        img_path = path + "hierarchical_output_img.jpg"
        cv2.imwrite(img_path, eroded_image)
        return img_path   
    
    def hough_transform(self,path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        edges = cv2.Canny(image, 50, 150, apertureSize=3)
        lines = cv2.HoughLines(edges, 1, np.pi / 180, threshold=100)
        hough_image = np.copy(image)
        if lines is not None:
            for rho, theta in lines[0]:
                a = np.cos(theta)
                b = np.sin(theta)
                x0 = a * rho
                y0 = b * rho
                x1 = int(x0 + 1000 * (-b))
                y1 = int(y0 + 1000 * (a))
                x2 = int(x0 - 1000 * (-b))
                y2 = int(y0 - 1000 * (a))
                cv2.line(hough_image, (x1, y1), (x2, y2), (0, 0, 255), 2)
        img_path = path + "hough_image_output_img.jpg"
        cv2.imwrite(img_path, hough_image)
        return img_path
    
    def region_growing(self,path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        output = np.zeros_like(image)
        seed_point = (100, 100)
        threshold = 50
        stack = [seed_point]
        while stack:
            x, y = stack.pop()
            if 0 <= x < image.shape[0] and 0 <= y < image.shape[1] and abs(int(image[x, y]) - int(image[seed_point])) < threshold and output[x, y] == 0:
                output[x, y] = 255
                stack.append((x + 1, y))
                stack.append((x - 1, y))
                stack.append((x, y + 1))
                stack.append((x, y - 1))
                
        img_path = path + "region_growing_output_img.jpg"
        cv2.imwrite(img_path, output)
        return img_path   
    
    def region_merging(self,path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        gray_image = image
        edges = filters.sobel(gray_image)
        segments = segmentation.watershed(edges, markers=400, compactness=0.001)
        segmented_image = color.label2rgb(segments, image, kind='avg')
        segmented_image = (segmented_image * 255).astype(np.uint8)
        img_path = path + "region_merging_output_img.jpg"
        io.imsave(img_path, segmented_image)
        return img_path
    
    def runLengthEncode(self,path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        image_flat = image.ravel()
        encoded_data = []
        current_pixel = image_flat[0]
        count = 1
        for pixel in image_flat[1:]:
            if pixel == current_pixel:
                count += 1
            else:
                encoded_data.extend([current_pixel, count])
                current_pixel = pixel
                count = 1

        encoded_data.extend([current_pixel, count])
        encoded_data = np.array(encoded_data)
        # print(encoded_data)
        decoded_data = []
        for i in range(0, len(encoded_data), 2):
            pixel = encoded_data[i]
            count = encoded_data[i + 1]
            decoded_data.extend([pixel] * count)
        decoded_image = np.array(decoded_data).reshape(image.shape)
        decoded_image = decoded_image.astype(np.uint8)
        img_path = path + "run_length_encoding_output_img.jpg"
        io.imsave(img_path, decoded_image)
        return img_path
    
    def vector_quantization(self,path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        reshaped_image = image.reshape((-1, 3))
        num_colors = 16
        kmeans = KMeans(n_clusters=num_colors, n_init=10)
        kmeans.fit(reshaped_image)
        cluster_centers = kmeans.cluster_centers_.astype(int)
        quantized_image = np.reshape(cluster_centers[kmeans.labels_], image.shape).astype(np.uint8)
        img_path = path + "vector_quantization_output_img.jpg"
        cv2.imwrite(img_path, quantized_image)
        return img_path 
import cv2
import numpy as np
import cv2
from scipy.optimize import minimize
import matplotlib.pyplot as plt
from skimage import io, color
from skimage.morphology import medial_axis, skeletonize
from skimage.util import invert
from scipy.fftpack import fft2, ifft2, fftshift, ifftshift

class Filters:
    def __init__(self, name):
        self.name = name
        
    def adaptive_filter(self,path):
        image = cv2.imread(self.name,cv2.IMREAD_GRAYSCALE)
        adaptive_filtered = cv2.adaptiveThreshold(image, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 2)
        img_path = path + "adaptive_filter_output_img.jpg"
        cv2.imwrite(img_path, adaptive_filtered)
        return img_path
    
    def average_filter(self,path):
        image = cv2.imread(self.name,cv2.IMREAD_GRAYSCALE)
        kernel_size = 5 
        kernel = np.ones((kernel_size, kernel_size), np.float32) / (kernel_size * kernel_size)
        average_filtered = cv2.filter2D(image, -1, kernel)
        img_path = path + "average_filter_output_img.jpg"
        cv2.imwrite(img_path, average_filtered)
        return img_path      
    
    def butterworth_filter(self,path):
        image = cv2.imread(self.name,cv2.IMREAD_GRAYSCALE)
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
                butterworth_highpass[i, j] = 1 / (1 + (distance / cutoff_frequency) ** (2 * order))

        filtered_image_shifted = f_transform_shifted * butterworth_highpass
        filtered_image = ifftshift(filtered_image_shifted)
        filtered_image = ifft2(filtered_image).real
        filtered_image = cv2.normalize(filtered_image, None, 0, 255, cv2.NORM_MINMAX)
        img_path = path + "butterworth_filter_output_img.jpg"
        cv2.imwrite(img_path, filtered_image)
        return img_path

import cv2
import numpy as np
import cv2
from scipy.optimize import minimize
import matplotlib.pyplot as plt
from skimage import io, color
from skimage.morphology import medial_axis, skeletonize
from skimage.util import invert

class Segmentation:
    def __init__(self, name):
        self.name = name
        
    def clustering(self):
        image = cv2.imread(self.name,cv2.IMREAD_GRAYSCALE)
        kernel = np.array([[1, 1, 1],[1, 1, 1],[1, 1, 1]]) / 9 
        output = cv2.filter2D(image, -1, kernel)
        path = "assets/uploads/segmantation/cluster/cluster_img.jpg"
        cv2.imwrite(path,output)
        return path
    
    def edge_detection(self):
        image = cv2.imread(self.name,cv2.IMREAD_GRAYSCALE)
        edges = cv2.Canny(image, threshold1=30, threshold2=100)
        path = "assets/uploads/segmantation/edge_detection/edge_detection.jpg"
        cv2.imwrite(path,edges)
        return path

    def thresholding(self):
        image = cv2.imread(self.name,cv2.IMREAD_GRAYSCALE)
        threshold_value = 128
        ret, thresholded_image = cv2.threshold(image, threshold_value, 255, cv2.THRESH_BINARY)
        path = "assets/uploads/segmantation/thresholding/thresholding_img.jpg"
        cv2.imwrite(path,thresholded_image)
        return path
    
    def constrained_least_squares_filter(params, *args):
        kernel = np.array(params).reshape(3, 3)  # Convert to NumPy array and reshape
        input_image, constraints = args
        filtered_image = cv2.filter2D(input_image, -1, kernel)
        diff = np.sum(np.square(filtered_image - input_image))
        penalty = 0
        for constraint in constraints:
            penalty += constraint(kernel)
        return diff + penalty

    def constraint_1(kernel):
        return np.square(np.sum(kernel) - 1)

    def ConstraintLeastSquare(self):
        input_image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        initial_kernel = np.random.rand(9)  
        constraints = [self.constraint_1] 
        result = minimize(self.constrained_least_squares_filter, initial_kernel, args=(input_image, constraints))
        optimized_kernel = result.x.reshape(3, 3)
        filtered_image = cv2.filter2D(input_image, -1, optimized_kernel)
        path = "assets/uploads/segmentation/ConstraintLeastSquare_img.jpg"
        cv2.imwrite(path, filtered_image)
        # TODO: Check the error
        # File "D:\GITHUB\IP-Project-Image-FIlters-and-Feature-Extractions\src\Segmentation.py", line 33, in constrained_least_squares_filter
        # kernel = np.array(params).reshape(3, 3)  # Convert to NumPy array and reshape
        #          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        # ValueError: cannot reshape array of size 1 into shape (3,3)
        return path
    
    def OrederStatics(self,path):
        input_image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        kernel_size = 5
        filtered_image = cv2.medianBlur(input_image, kernel_size)
        img_path = path + "/Order_statics_img.jpg"
        cv2.imwrite(img_path, filtered_image)
        return img_path
    
    def harmonics_filter(self,path):
        input_image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        harmonic_image = cv2.divide(1.0, cv2.divide(1.0, input_image + 1e-6))
        img_path = path + "harmonic_output_img.jpg"
        cv2.imwrite(img_path, harmonic_image)
        return img_path
    
    def geometric_filter(self,path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        edges = cv2.Canny(image, 50, 150, apertureSize=3)
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        geometric_img = np.ones_like(image) * 255
        for contour in contours:
            epsilon = 0.01 * cv2.arcLength(contour, True)
            approx = cv2.approxPolyDP(contour, epsilon, True)
            cv2.drawContours(geometric_img, [approx], -1, (0, 0, 0), 2)
            
        img_path = path + 'geometric_image.png'
        cv2.imwrite(img_path, geometric_img)
        return img_path
    
    def Gaussian_noise(self,path):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        if len(image.shape) < 3: 
            height, width = image.shape
            channels = 1
        else:
            height, width, channels = image.shape
        mean = 0
        stddev = 25
        gaussian_noise = np.random.normal(mean, stddev, (height, width, channels)).astype(np.uint8)
        noisy_image = cv2.add(image, gaussian_noise)
        img_path = path + 'gaussian_noise_output_image.png'
        cv2.imwrite(img_path, noisy_image)
        return img_path  
    
    def median_filter(self,path):
        input_image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        _, binary_image = cv2.threshold(input_image, 128, 255, cv2.THRESH_BINARY)
        dist_transform = cv2.distanceTransform(binary_image, distanceType=cv2.DIST_L2, maskSize=5)
        cv2.normalize(dist_transform, dist_transform, 0, 1.0, cv2.NORM_MINMAX)
        medial_like_image = cv2.threshold(dist_transform, 0.4, 1, cv2.THRESH_BINARY)[1]
        img_path = path + "meidan-filter_output_img.jpg"
        cv2.imwrite(img_path, medial_like_image * 255)
        return img_path 
    
    def salt_and_papper_noise(self,path):
        amount=0.05
        image = cv2.imread(self.name)

        if len(image.shape) == 3:
            image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            
        row, col = image.shape
        
        if len(image.shape) == 2:  
            row, col = image.shape
            
        num_salt = np.ceil(amount * image.size * 0.5)
        num_pepper = np.ceil(amount * image.size * 0.5)

        salt_coords = [np.random.randint(0, i - 1, int(num_salt)) for i in image.shape]
        image[salt_coords[0], salt_coords[1]] = 255

        pepper_coords = [np.random.randint(0, i - 1, int(num_pepper)) for i in image.shape]
        image[pepper_coords[0], pepper_coords[1]] = 0
        
        img_path = path + "salt_and_papper_noise_output_img.jpg"
        cv2.imwrite(img_path, image)
        
        return img_path 
   


import cv2
import numpy as  np
class Enhancement:
    def __init__(self, name):
        self.name = name

    def histogram(self):
        hist_img = cv2.equalizeHist(cv2.imread(self.name,cv2.IMREAD_GRAYSCALE))
        path = "assets/uploads/enhancement/histogram/histogram_img.jpg "
        cv2.imwrite(path,hist_img)
        return path
    
    def gamma_correction(self):
        gamma_img = np.power(cv2.imread(self.name,cv2.IMREAD_GRAYSCALE) / 255.0, 1.5)
        gamma_img = np.uint8(gamma_img * 255)
        path = "assets/uploads/enhancement/gamma_correction/gamma_correction_img.jpg"
        cv2.imwrite(path,gamma_img)
        return path
    
    def contrast_strching(self):
        min_out=0
        max_out=255
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        min_in = np.min(image)
        max_in = np.max(image)
        stretched_image = ((image - min_in) / (max_in - min_in)) * (max_out - min_out) + min_out
        stretched_image = ((image - min_in) / (max_in - min_in)) * (max_out - min_out) + min_out
        stretched_image = np.round(stretched_image).astype(np.uint8)
        cv2.imwrite(path,stretched_image)
        path = "assets/uploads/enhancement/contrast_strching/contrast_strching_img.jpg"
        return path

    def spatial_filter(self):
        image = cv2.imread(self.name, cv2.IMREAD_GRAYSCALE)
        kernel = np.array([[1, 1, 1],[1, 1, 1],[1, 1, 1]]) / 9 
        output_image = cv2.filter2D(image, -1, kernel)
        path = "assets/uploads/enhancement/spatial_filter/spatial_filter_img.jpg"
        cv2.imwrite(path, output_image)
        return path

    


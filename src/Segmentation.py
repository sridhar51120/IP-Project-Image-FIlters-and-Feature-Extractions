import cv2
import numpy as np
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

    def region_detection(self):
        image = cv2.imread(self.name,cv2.IMREAD_GRAYSCALE)
        _, thresh = cv2.threshold(image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
        kernel = np.ones((3, 3), np.uint8)
        opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=2)
        sure_bg = cv2.dilate(opening, kernel, iterations=3)
        dist_transform = cv2.distanceTransform(opening, cv2.DIST_L2, 5)
        _, sure_fg = cv2.threshold(dist_transform, 0.7 * dist_transform.max(), 255, 0)
        sure_fg = np.uint8(sure_fg)
        unknown = cv2.subtract(sure_bg, sure_fg)
        _, markers = cv2.connectedComponents(sure_fg)
        markers = markers + 1
        markers[unknown == 255] = 0
        cv2.watershed(image, markers)
        image[markers == -1] = [0, 0, 255] 
        path = "assets/uploads/segmantation/region_detection/region_detection.jpg"
        cv2.imwrite(path,image)
        return path

    def thresholding(self):
        image = cv2.imread(self.name,cv2.IMREAD_GRAYSCALE)
        threshold_value = 128
        ret, thresholded_image = cv2.threshold(image, threshold_value, 255, cv2.THRESH_BINARY)
        path = "assets/uploads/segmantation/thresholding/thresholding_img.jpg"
        cv2.imwrite(path,thresholded_image)
        return path

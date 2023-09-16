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

    def thresholding(self):
        image = cv2.imread(self.name,cv2.IMREAD_GRAYSCALE)
        threshold_value = 128
        ret, thresholded_image = cv2.threshold(image, threshold_value, 255, cv2.THRESH_BINARY)
        path = "assets/uploads/segmantation/thresholding/thresholding_img.jpg"
        cv2.imwrite(path,thresholded_image)
        return path

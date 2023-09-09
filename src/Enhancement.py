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
import cv2
import numpy as  np
class Enhancement:
    def __init__(self, name):
        self.name = name

    def histogram(self):
        hist_img = cv2.equalizeHist(cv2.imread(self.name,cv2.IMREAD_GRAYSCALE))
        cv2.imwrite('uploads/enhancement/histogram/histogram_image.jpg',hist_img)
        return 'uploads/enhancement/histogram/histogram_image.jpg'
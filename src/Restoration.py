import cv2
import numpy as np
import pandas as pd

class Restoration:
    def __init__(self,name):
        self.name = name
    
    def debluring(self):
        img = cv2.equalizeHist(cv2.imread(self.name,cv2.IMREAD_GRAYSCALE))
        psf = np.ones((5, 5)) / 25
        deblurred_image = cv2.filter2D(img, -1, psf)
        path = "assets/uploads/restoration/deblur/delur_img.jpg "
        cv2.imwrite(path,deblurred_image)
        return path
    
    def inpainting(self):
        pass

    def noise_reduction(self):
        pass

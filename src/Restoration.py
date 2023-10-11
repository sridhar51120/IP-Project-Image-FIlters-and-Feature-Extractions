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
        image=cv2.imread(self.name,cv2.IMREAD_GRAYSCALE)
        mask = np.zeros_like(image)
        cv2.rectangle(mask, (100, 100), (300, 300), (255, 255, 255), thickness=cv2.FILLED) 
        inpaint_image = cv2.inpaint(image, mask, inpaintRadius=5, flags=cv2.INPAINT_TELEA)
        path = "assets/uploads/restoration/inpaint/inpaint_img.jpg"
        cv2.imwrite(path,inpaint_image)
        return path

    def noise_reduction(self):
        image=cv2.imread(self.name,cv2.IMREAD_GRAYSCALE)
        mask = np.zeros_like(image)
        cv2.rectangle(mask, (100, 100), (300, 300), (255, 255, 255), thickness=cv2.FILLED) 
        inpaint_image = cv2.inpaint(image, mask, inpaintRadius=5, flags=cv2.INPAINT_TELEA)
        path = "assets/uploads/restoration/noise_reduction/noise_reduction_img.jpg"
        cv2.imwrite(path,inpaint_image)
        return path


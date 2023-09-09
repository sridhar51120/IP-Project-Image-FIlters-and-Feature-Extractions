import cv2
import numpy as np
from src.Enhancement import Enhancement
# original_image = cv2.imread('assets/img/test.jpg', cv2.IMREAD_GRAYSCALE)
# equalized_image = cv2.equalizeHist(original_image)
# cv2.imshow('equalized_image.jpg', equalized_image)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

Enhancement = Enhancement('uploads/enhancement/histogram/test.jpg')

Enhancement.histogram()


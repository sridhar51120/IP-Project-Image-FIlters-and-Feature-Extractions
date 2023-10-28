import cv2
import numpy as np
image = cv2.imread("test.jpg")

cv2.imshow("Noisy Image", noisy_image)
cv2.waitKey(0)
cv2.destroyAllWindows()
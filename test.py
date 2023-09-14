import cv2
import numpy as np

# Load the image
image = cv2.imread('test.jpg')
if image is None:
    print("Image not found.")
    exit()

# Convert the image to grayscale
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Apply thresholding to create markers for the Watershed algorithm
_, thresh = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

# Noise removal using morphological operations
kernel = np.ones((3, 3), np.uint8)
opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=2)

# Sure background area
sure_bg = cv2.dilate(opening, kernel, iterations=3)

# Finding sure foreground area
dist_transform = cv2.distanceTransform(opening, cv2.DIST_L2, 5)
_, sure_fg = cv2.threshold(dist_transform, 0.7 * dist_transform.max(), 255, 0)

# Finding unknown region
sure_fg = np.uint8(sure_fg)
unknown = cv2.subtract(sure_bg, sure_fg)

# Create markers for the Watershed algorithm
_, markers = cv2.connectedComponents(sure_fg)
markers = markers + 1
markers[unknown == 255] = 0

# Apply the Watershed algorithm
cv2.watershed(image, markers)
image[markers == -1] = [0, 0, 255]  # Outline the regions

# Display or save the region detection image
cv2.imshow('Region Detection Image', image)
cv2.waitKey(0)
cv2.destroyAllWindows()


# import cv2
# import numpy as np
# from src.Enhancement import Enhancement
# original_image = cv2.imread('assets/img/test.jpg', cv2.IMREAD_GRAYSCALE)
# equalized_image = cv2.equalizeHist(original_image)
# cv2.imshow('equalized_image.jpg', equalized_image)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

# Enhancement = Enhancement('uploads/enhancement/histogram/test.jpg')

# Enhancement.histogram()


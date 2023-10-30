

# Load the image
image = cv2.imread('input_image.jpg', 0)  # Read the image in grayscale



# Display the original and filtered images
cv2.imshow('Original Image', image)
cv2.imshow('Butterworth High-Pass Filtered Image', filtered_image.astype(np.uint8))
cv2.waitKey(0)
cv2.destroyAllWindows()

# Optionally, save the filtered image to a file
cv2.imwrite('filtered_image.jpg', filtered_image.astype(np.uint8))

import cv2
import numpy as np

# Load the image
input_image = cv2.imread("test.jpg")

# Check if the image loaded successfully
if input_image is not None:
    # Define the kernel size (usually an odd number)
    kernel_size = 3  # Adjust this based on the desired filter size

    # Convert the input image to the appropriate data type
    input_image = input_image.astype(np.float32)  # Convert to CV_32F

    # Apply the geometric mean filter
    filtered_image = cv2.pow(input_image, 1.0 / (kernel_size ** 2))

    # Convert the result back to an 8-bit image
    filtered_image = np.uint8(filtered_image)

    # Save the filtered image
    cv2.imwrite("geometric_mean_filtered_image.jpg", filtered_image)

    # Display the original and filtered images
    cv2.imshow("Original Image", input_image)
    cv2.imshow("Geometric Mean Filtered Image", filtered_image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
else:
    print("Failed to load the input image.")

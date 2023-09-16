import cv2
import numpy as np

# Load the image
image = cv2.imread('test.jpg')  # Replace 'your_image.jpg' with the path to your image

# Check if the image was loaded successfully
if image is None:
    print("Error: Could not open or read the image.")
else:
    # Get the initial size of the image
    initial_height, initial_width, _ = image.shape

    # Create a window to display the growing image
    # cv2.namedWindow('Growing Image', cv2.WINDOW_NORMAL)
    # cv2.resizeWindow('Growing Image', initial_width, initial_height)

    # Loop to gradually increase the size of the image
    for scale_factor in np.arange(0.1, 2.0, 0.01):  # Adjust the range and step size as needed
        new_height = int(initial_height * scale_factor)
        new_width = int(initial_width * scale_factor)

        # Resize the image
        resized_image = cv2.resize(image, (new_width, new_height))

        # Display the resized image
        cv2.imshow('Growing Image', resized_image)
        cv2.waitKey(10)  # Adjust the delay (in milliseconds) as needed

    # Wait for a key press and then close the window
    cv2.waitKey(0)
    cv2.destroyAllWindows()

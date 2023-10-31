#Import Required Library
import numpy as np
import cv2
# Load the degraded image
degraded_image = cv2.imread('degraded_image.jpg', 0)
# Load as grayscale (0)
# Compute the point spread function (PSF) or create a simulated PSF
# PSF represents the blur in the image caused by the system
# For simplicity, you can create a simple averaging filter (use a suitable PSF for real images)
PSF = np.ones((5, 5)) / 25
# Example: 5x5 averaging filter
# Apply Wiener deconvolution
restored_image = cv2.filter2D(degraded_image, -1, PSF)
# Estimate the noise variance in the degraded image
# In practice, this could be estimated from the known noise characteristics or using statistical methods
# For this example, let's assume a known variance
noise_var = 0.1
# Apply Wiener deconvolution to restore the image using the estimated noise variance
wiener_restoration = np.fft.ifft2(np.fft.fft2(restored_image) / (np.fft.fft2(PSF) + noise_var))
# Normalize the restored image
wiener_restoration = np.uint8(wiener_restoration)
# Display the original, degraded, and Wiener-restored images
cv2.imshow('Original Image', cv2.imread('original_image.jpg'))
# Display original image
cv2.imshow('Degraded Image', degraded_image)
# Display Degraded image
cv2.imshow('Wiener-Restored Image', wiener_restoration)
# Display Wiener-Restored image
cv2.waitKey(0)
cv2.destroyAllWindows()
# Save the Wiener-restored image
cv2.imwrite('wiener_restored_image.jpg', wiener_restoration)
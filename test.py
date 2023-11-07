import numpy as np
import cv2
from sklearn.cluster import KMeans
from sklearn.metrics import pairwise_distances_argmin_min

# Load the image
image = cv2.imread('image.jpg')

# Reshape the image into a 2D array of pixels
pixels = image.reshape(-1, 3)  # Assumes a color image (3 channels)

# Number of clusters (codebook vectors)
num_clusters = 16  # You can adjust this number as needed

# Perform k-means clustering
kmeans = KMeans(n_clusters=num_clusters, random_state=0).fit(pixels)

# Get the cluster centroids (codebook vectors)
codebook = kmeans.cluster_centers_

# Assign each pixel to the nearest cluster centroid
labels = pairwise_distances_argmin_min(pixels, codebook)[0]

# Create the vector quantized image
quantized_image = codebook[labels].reshape(image.shape)

# Display the original and vector quantized images (optional)
cv2.imshow('Original Image', image)
cv2.imshow('Vector Quantized Image', quantized_image)
cv2.waitKey(0)
cv2.destroyAllWindows()

# Save the vector quantized image (optional)
cv2.imwrite('path/to/save/vq_image.jpg', quantized_image)

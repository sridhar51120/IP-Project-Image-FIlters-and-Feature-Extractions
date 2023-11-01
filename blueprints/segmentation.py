from flask import Blueprint, render_template, redirect, url_for, request, session
from src.Segmentation import Segmentation
import os
import cv2

bp = Blueprint("segmentation", __name__, url_prefix="/segmentation")


@bp.route("/Clustering", methods=['GET'])
def Clustering_temp():
    data = {
        'title': 'Clustering image Technique',
        'def': 'Clustering images is a common task in image processing and computer vision, where you group similar pixels or regions together based on certain criteria. One popular method for image clustering is K-means clustering. Here"s a brief overview and a workflow for clustering images using Python with the K-means algorithm:'
    }

    workflows = [
        {'title': '1. Data Preparation',
            'description': 'Convert the image to a numerical format where each pixel is represented as a data point with feature values. For RGB images, you might represent each pixel as a 3D vector (R, G, B values) or use other feature extraction techniques.'},
        {'title': '2. Feature Extraction (if needed)', 'description': 'Depending on your image clustering goals, you may want to extract meaningful features from the image, such as color histograms, texture descriptors, or deep learning features using pre-trained neural networks.'},
        {'title': '3. K-means Clustering',
         'description': 'Import the scikit-learn library in Python, which provides a robust implementation of the K-meansalgorithm.Choose the number of clusters (K) you want to create. This may require prior knowledge orexperimentation.Fit the K-means model to your image data using the KMeans class. You can specify variousinitialization methods and hyperparameters.Perform clustering by calling the fit method on your image data.'},
        {'title': '4. Cluster Assignment', 'description': 'Once the K-means model is trained, each pixel in the image will be assigned to one of the K clusters based on its similarity to cluster centroids.'},
        {'title': '5. Visualize Results (Optional)', 'description': 'You can create a new image where each pixel"s color is replaced with the color of the centroid it belongs to. This will give you a visual representation of the clustering results.'},
        {'title': '6. Analysis and Post-processing (Optional)',
         'description': 'Analyze the clustering results, which may involve evaluating cluster quality or further processing based on your application.'},
        {'title': '7. Save or Display Results',
         'description': 'Save the clustered image or display it to visualize the final output.'}
    ]

    code = [
        {'comment': '# Import Required Library', 'code': 'import cv2'},
        {'comment': '', 'code': 'import numpy as np'},
        {'comment': '', 'code': 'from sklearn.cluster import KMeans'},
        {'comment': '# Load the image',
            'code': 'image = cv2.imread("input_image.jpg")'},
        {'comment': '', 'code': 'height, width, _ = image.shape'},
        {'comment': '# Reshape the image into a flat array of pixels',
            'code': 'image_data = image.reshape(-1, 3)'},
        {'comment': '# Choose the number of clusters (K)', 'code': 'K = 5'},
        {'comment': '# Create and fit the K-means model',
            'code': 'kmeans = KMeans(n_clusters=K)'},
        {'comment': '', 'code': 'kmeans.fit(image_data)'},
        {'comment': '# Get cluster labels for each pixel', 'code': ''},
        {'comment': '', 'code': 'labels = kmeans.predict(image_data)'},
        {'comment': '# Replace pixel values with cluster centroid values',
            'code': 'segmented_image = kmeans.cluster_centers_[labels].reshape(height, width, 3).astype(np.uint8)'},
        {'comment': '# Display the segmented image',
            'code': 'cv2.imshow("Segmented_Image.png", segmented_image)'},
        {'comment': '# save the segmented image',
            'code': 'cv2.imshow("Segmented Image", segmented_image)'},
        {'comment': '', 'code': 'cv2.waitKey(0)'},
        {'comment': '', 'code': 'cv2.destroyAllWindows()'}
    ]
    return render_template("Clustering.html", data=data, workflowtitle="Brief overview of how Clustering Works", workflows=workflows, code=code)


@bp.route("/Clustering_output", methods=['POST'])
def Clustering_output():
    if request.method == 'POST':
        if 'cluster-input-image-file' in request.files:
            file = request.files['cluster-input-image-file']
            img_path = f'assets/uploads/segmantation/cluster/{file.filename}'
            file.save(os.path.join(img_path))
            segmantation = Segmentation(img_path)
            clustered_img = segmantation.clustering()

            data = {
                'img_url': img_path,
                'clustered_img': clustered_img
            }
            return {
                'template': render_template('OutputCollapse/segmentation/clustering.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'clustered_img': clustered_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'


@bp.route("/Edge_detection", methods=['GET'])
def Edge_detection_temp():
    data = {
        'title': 'Edge detection Technique( Canny technique )',
        'def': 'Edge detection is a fundamental technique in image processing that is used to identify the boundaries of objects within an image. It works by highlighting abrupt changes in pixel intensity, which often correspond to edges in the image. There are several algorithms for edge detection, with the Canny edge detector being one of the most widely used.'
    }

    workflows = [
        {'title': '1) Preprocessing', 'description': 'Before applying the Canny edge detection algorithm, it"s often necessary to perform some preprocessing on the image. Common preprocessing steps include: 1) Grayscale Conversion: Convert the image to grayscale to simplify the edge detection process, as edges can be defined by variations in intensity rather than color. 2) Gaussian Blur: Apply Gaussian smoothing to the grayscale image to reduce noise. This helps to ensure that small variations in pixel values do not lead to false edges.'},
        {'title': '2) Gradient Calculation', 'description': 'Canny edge detection relies on detecting changes in intensity, which are often related to gradients in the image. This involves the following steps: 1) Gradient Magnitude: Calculate the gradient magnitude at each pixel to represent the strength of the edges. 2) Gradient Direction: Calculate the gradient direction at each pixel to determine the orientation of the edges.'},
        {'title': '3) Non-Maximum Suppression', 'description': 'In this step, you suppress non-maximum gradient values to thin out the edges. The idea is to keep only the local maximum gradient values and set the rest to zero. This results in a one-pixel-wide edge.'},
        {'title': '4) Edge Tracking by Hysteresis', 'description': 'Canny edge detection employs a dual-threshold technique to determine which edges to keep and which to discard: 1) High Threshold: Pixels with gradient values above this threshold are considered strong edge points. 2) Low Threshold: Pixels with gradient values below this threshold are discarded. 3) Edge Tracking: Pixels with gradient values between the low and high thresholds are considered weak edge points. These weak edges are only retained if they are connected to strong edges. This is typically done using edge tracking algorithms like the depth-first search.'},
        {'title': '5) Edge Linking', 'description': 'Once you have identified the strong and weak edges, you need to link the weak edges to the strong ones. This can be achieved through edge tracking, connectivity analysis, or other algorithms that establish continuous edge contours.'},
        {'title': '6) Postprocessing', 'description': 'After detecting edges, you may perform further postprocessing, such as: 1) Edge Thinning: Further thinning the edges if necessary. 2) Edge Localization: Refine edge positions for sub-pixel accuracy. 3) Edge Enhancement: Apply techniques to enhance the visual representation of edges.'},
        {'title': '7) Visualization', 'description': 'The final step often involves overlaying the detected edges onto the original image to visualize the results.'}
    ]

    code = [
        {'comment': '# Import Required Library', 'code': 'import numpy as np'},
        {'comment': '', 'code': 'import cv2'},
        {'comment': '# Load the image',
            'code': 'image = cv2.imread("input_image.jpg")'},
        {'comment': '# Apply Canny edge detection',
            'code': 'edges = cv2.Canny(image, threshold1, threshold2)'},
        {'comment': '# Save the image',
            'code': 'cv2.imwrite("edge_detected_image.jpg", edges)'}
    ]

    return render_template("Edge_detection.html", data=data, workflowtitle="Brief overview of how Edge Detection Works", workflows=workflows, code=code)


@bp.route("/Edge_detection_output", methods=['POST'])
def Edge_detection_output():
    if request.method == 'POST':
        if 'edge-detect-input-image-file' in request.files:
            file = request.files['edge-detect-input-image-file']
            img_path = f'assets/uploads/segmantation/edge_detection/{file.filename}'
            file.save(os.path.join(img_path))
            segmantation = Segmentation(img_path)
            edge_detection = segmantation.edge_detection()

            data = {
                'img_url': img_path,
                'edge_detection': edge_detection
            }

            return {
                'template': render_template('OutputCollapse/segmentation/edge_detection.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'edge_detection': edge_detection.replace("assets", "")
            }
        else:
            return 'No file part in the request'


@bp.route("/Thresholding", methods=['GET'])
def Thresholding_temp():
    data = {
        'title': 'Thresholding Technique',
        'def': 'Thresholding is a fundamental image processing technique used to separate objects or regions of interest from the background in an image by dividing pixel values into two categories: foreground and background. It"s a common technique used in various computer vision and image analysis applications. In thresholding, you choose a threshold value, and pixels with values above the threshold are assigned to one category (usually white), while pixels with values below the threshold are assigned to the other category (usually black).'
    }
    workflows = [
        {'title': 'Read the Image','description':' Load the image in a suitable format.'},
        {'title': 'Preprocess the Image','description':'Enhance the image quality if needed (e.g., denoising, resizing, or color space conversion).'},
        {'title': 'Threshold Method','description':'Choose an appropriate thresholding technique. Common methods include:  1) Global Thresholding: Determine a single threshold value to classify pixels, 2) Local/Adaptive Thresholding: Use different thresholds for different parts of the image based on the local intensity,3) Otsu"s Method: Automatically calculate the optimal threshold value.'},
        {'title': 'Determining the Threshold Value','description':' 1) Manual Thresholding: Select a threshold value by analyzing the image histogram or visually inspecting the image characteristics. 2) Automatic Thresholding: Use algorithms to determine the threshold value based on specific criteria (e.g., minimizing intra-class variance in Otsu"s method).'},
        {'title': 'Applying the Threshold','description':' 1) Thresholding Process: Apply the chosen thresholding technique to create a binary image where pixel values are set to either 0 or 1 (or 0 or 255). 2) Thresholding Function: In OpenCV, this can be achieved using the cv2.threshold() function.'},
        {'title': 'Post-Processing','description':' 1) Morphological Operations: Optionally perform morphological operations (like erosion, dilation, opening, or closing) to refine the binary image by eliminating noise or filling gaps. 2) Connected Component Analysis: Analyze and process separate connected components in the binary image.'},
        {'title': 'Validation and Result Assessment','description':' 1) Result Evaluation: Evaluate the segmented binary image to ensure it meets the intended objective. 2) Validation Criteria: Check for accuracy in pixel classification or segmentation results.'},
        {'title': 'Visualization and Further Analysis','description':' 1) Visualize the Results: Present the binary segmented image or overlay it on the original image for better visualization. 2) Use in Subsequent Processing: Utilize the segmented binary image for further image processing steps or analysis, depending on the application (e.g., feature extraction or object detection).'},
        {'title': 'Fine-tuning and Iteration','description':' 1) Adjustment: If necessary, revisit the threshold selection or parameter settings and reapply the process. 2) Iterate and Refine: Fine-tune the thresholding technique or post-processing steps based on evaluation.'}
    ]
    return render_template("Thresholding.html", data=data, workflowtitle="Brief overview of how Thresolding Works", workflows=workflows)


@bp.route("/Thresolding_output", methods=['POST'])
def Thresolding_output():
    if request.method == 'POST':
        if 'thresolding-input-image-file' in request.files:
            file = request.files['thresolding-input-image-file']
            img_path = f'assets/uploads/segmantation/{file.filename}'
            file.save(os.path.join(img_path))
            segmantation = Segmentation(img_path)
            thresholding = segmantation.thresholding()

            data = {
                'img_url': img_path,
                'thresholding': thresholding
            }

            return {
                'template': render_template('OutputCollapse/segmentation/thresholding.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'thresholding': thresholding.replace("assets", "")
            }
        else:
            return 'No file part in the request'


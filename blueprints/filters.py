from flask import Blueprint, render_template, redirect, url_for, request, session
import os
from src.Filters import Filters
import cv2

bp = Blueprint("/filters", __name__, url_prefix="/filters3")


@bp.route("/descrete_forier_trasnform", methods=['GET'])
def descrete_forier_trasnform_temp():
    data = {
        'title': 'Discrete Fourier Transform (DFT)',
        'def': "The Discrete Fourier Transform (DFT) is a fundamental tool in image processing used to analyze the frequency content of images. It converts spatial domain information of an image into the frequency domain, allowing for various manipulations and analyses of image data."
    }

    workflows = [
        {'title': '1)   Image Acquisition',
            'description': 'Start by acquiring or loading the digital image you want to process. Ensure that the image is in a digital format (e.g., grayscale or color) and can be represented as a matrix of pixel values.'},
        {'title': '2)   Preprocessing', 'description': 'Apply any necessary preprocessing steps to the image. This may include operations like resizing, noise reduction, and contrast enhancement. Preprocessing helps ensure that the image is in a suitable condition for frequency domain analysis.'},
        {'title': '3)   Windowing (Optional)', 'description': 'Consider applying a windowing function to the image. Windowing is optional but can help reduce spectral leakage and artifacts caused by abrupt changes at the image boundaries. Common windowing functions include Hamming, Hanning, and Blackman.'},
        {'title': '4)   Zero-Centering', 'description': 'To facilitate analysis, shift the zero frequency component to the center of the image by multiplying the image by a phase factor, rotating the image accordingly.'},
        {'title': '5)   2D DFT Calculation', 'description': 'Apply the 2D DFT algorithm to the preprocessed and zero-centered image. This is usually done by applying the 1D DFT separately to each row and then to each column of the image.'},
        {'title': '6)   Frequency Domain Analysis', 'description': 'Examine the resulting 2D DFT matrix, which represents the image"s frequency domain information. You can analyze the magnitude and phase components of the frequency spectrum. The magnitude spectrum shows the strength of different frequencies, while the phase spectrum provides information about their spatial arrangement.'},
        {'title': '7)   Frequency Filtering (Optional)', 'description': 'Depending on your application, you may perform frequency domain filtering to enhance or suppress specific frequency components. Common filters include high-pass, low-pass, band-pass, and notch filters. Filtering can help remove noise or emphasize certain features.'},
        {'title': '8)   Inverse DFT (IDFT)', 'description': 'If necessary, perform the inverse DFT (IDFT) to convert the filtered or processed frequency domain data back to the spatial domain. This step reconstructs the image from the frequency components.'},
        {'title': '9)   Postprocessing', 'description': 'Apply any postprocessing steps to the reconstructed image, such as scaling, clipping, or contrast adjustment, to achieve the desired visual result.'},
        {'title': '10)  Display or Save', 'description': 'Finally, display the processed image or save it to a file. You can visualize the changes made to the image in the spatial domain.'},
    ]
    return render_template("dft.html", data=data, workflowtitle="Brief overview of how Discrete Fourier Transform (DFT) Works", workflows=workflows)


@bp.route("/descrete_forier_trasnform_output", methods=['POST'])
def descrete_forier_trasnform_output():
    if request.method == 'POST':
        if 'dft-input-image-file' in request.files:
            file = request.files['dft-input-image-file']
            img_dir = 'assets/uploads/filters/dft/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.dft(img_dir)
            data = {
                'img_url': img_path,
                'dft_output_img': output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/dft.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'dft_output_img': output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'


@bp.route("/dilation", methods=['GET'])
def dilation_temp():
    data = {
        'title': 'Dilation (Binary Dilation)',
        'def': 'Binary dilation is a fundamental operation in image processing primarily used on binary images, where pixels are either foreground (usually denoted as white) or background (often black). The process involves expanding the boundaries of the foreground pixels, effectively thickening the shapes within the image.'
    }

    workflows = [
        {'title': '1)   Input Binary Image',
            'description': 'Begin with a binary image where pixels are either foreground (white) or background (usually black). This is the image you want to perform dilation on.'},
        {'title': '2)   Define the Structuring Element', 'description': 'Select or create a structuring element, which is a small binary matrix or kernel. The size and shape of the structuring element are important and determine how the dilation operation will affect the image. Common shapes include squares, circles, and rectangles.'},
        {'title': '3)   Place the Structuring Element',
            'description': 'Begin sliding the structuring element over the input binary image. Position the center (origin) of the structuring element at the first pixel location in the image.'},
        {'title': '4)   Element Comparison', 'description': 'For each position of the structuring element, compare it with the corresponding pixels in the input image. The center of the structuring element aligns with a pixel in the image, and this is the focus of the comparison.'},
        {'title': '5)   Dilation Operation',
            'description': 'If any part of the structuring element overlaps with a foreground (white) pixel in the image, consider it a match. This means that the shape represented by the structuring element can be expanded at this location.'},
        {'title': '6)   Set the Output Pixel',
            'description': 'The output pixel at the center of the structuring element is set to foreground (white) if there is a match within the defined neighborhood. If there"s no match, the output pixel remains background (black).'},
        {'title': '7)   Move the Structuring Element',
            'description': 'Slide the structuring element to the next position in the image and repeat the comparison and dilation operation.'},
        {'title': '8)   Iterate', 'description': 'Continue this process for all possible positions of the structuring element over the entire input binary image.'},
        {'title': '9)   Output Binary Dilated Image',
            'description': 'The result of this process is a binary dilated image where the boundaries of the foreground objects have been expanded based on the structuring element.'}
    ]
    return render_template("dilation.html", data=data, workflowtitle="Brief overview of how Dilation Works", workflows=workflows)


@bp.route("/dilation_output", methods=['POST'])
def dilation_output():
    if request.method == 'POST':
        if 'dilation-input-image-file' in request.files:
            file = request.files['dilation-input-image-file']
            img_dir = 'assets/uploads/filters/dilation/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.dilation(img_dir)
            data = {
                'img_url': img_path,
                'dilation_output_img': output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/dilation.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'dilation_output_img': output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'


@bp.route("/erosion", methods=['GET'])
def erosion_temp():
    data = {
        'title': 'Erosion',
        'def': 'Erosion is a fundamental image processing operation primarily used on binary images, where pixels are either foreground (usually denoted as white) or background (often black). The goal of erosion is to erode or shrink the boundaries of the foreground objects in an image.'
    }

    workflows = [
        {'title': '1)   Structuring Element', 'description': 'Like other morphological operations, erosion relies on a structuring element, which is a small matrix or kernel that defines the neighborhood for each pixel in the image. The structuring element"s size and shape determine the nature of the erosion operation.'},
        {'title': '2)   Overlaying the Structuring Element',
            'description': 'The structuring element is placed at all possible positions on the input binary image.'},
        {'title': '3)   Comparing Pixels',
            'description': ' At each position, the foreground (white) pixel in the input image where the origin of the structuring element aligns is examined. If the structuring element completely fits within the foreground region, a match is considered. The center of the structuring element defines the output pixel for that position.'},
        {'title': '4)   Setting the Output Pixel',
            'description': ' If there is a match within the defined neighborhood, the output pixel at the center of the structuring element is set to the foreground (white) value. If there is any part of the structuring element that doesn"t match with the foreground, the output pixel is set to the background (black) value.'},
        {'title': '5)   Iterative Process', 'description': ' Erosion can be a single iteration operation, or it can be applied multiple times in succession, depending on the desired degree of erosion. Each iteration will further erode the object boundaries by one step.'},
        {'title': '6)   Result', 'description': 'The final result after applying erosion is a binary image with shrunken foreground objects. The degree of shrinkage depends on the size and shape of the structuring element and the number of iterations.'}
    ]
    return render_template("erosion.html", data=data, workflowtitle="Brief overview of how Erosion Works", workflows=workflows)


@bp.route("/erosion_output", methods=['POST'])
def erosion_output():
    if request.method == 'POST':
        if 'errosion-input-image-file' in request.files:
            file = request.files['errosion-input-image-file']
            img_dir = 'assets/uploads/filters/errosion/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.errosion(img_dir)
            data = {
                'img_url': img_path,
                'erroded_img': output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/erosion.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'erroded_img': output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'


@bp.route("/hierarichal_image", methods=['GET'])
def hierarichal_image_temp():
    data = {
        'title': 'Hierarchical image',
        'def': 'Hierarchical image processing involves a multi-layered approach to analyze and process images at different levels of abstraction or detail. This method allows for the extraction of information from images at various scales or levels, enabling a more comprehensive understanding of the visual data.'
    }

    workflows = [
        {'title': '1)   Image Acquisition',
            'description': 'Obtain the image from a source such as a camera, scanner, or database. This forms the basis for further processing.'},
        {'title': '2)   Preprocessing', 'description': 'This step involves initial cleaning and enhancing of the acquired image. It may include operations like resizing, color space conversion, noise reduction, and normalization to prepare the image for subsequent analysis.'},
        {'title': '3)   Pyramid Generation', 'description': ' Construct image pyramids at multiple resolutions. Pyramids are a hierarchical representation of an image with different levels of detail. The most common types are Gaussian and Laplacian pyramids. Gaussian pyramids reduce the image"s resolution successively, while Laplacian pyramids help to reconstruct the image.'},
        {'title': '4)   Feature Extraction', 'description': 'Identify and extract key features from the image. This can include edge detection, corner detection, texture analysis, and other methods to highlight important visual elements within the image.'},
        {'title': '5)   Segmentation', 'description': 'Divide the image into meaningful parts or regions. Segmentation methods could involve thresholding, clustering, region growing, or more advanced techniques like watershed or active contours to delineate objects or areas of interest.'},
        {'title': '6)   Object Recognition', 'description': 'Identify and classify objects or patterns within the segmented regions. This could involve comparing extracted features against a database or using machine learning algorithms to recognize objects based on learned patterns.'},
        {'title': '7)   Contextual Analysis', 'description': 'Understand the relationships between different objects or regions in the image. This step aims to analyze the spatial and semantic context to refine the understanding of the overall scene.'},
        {'title': '8)   Post-Processing and Analysis', 'description': 'Further refine the processed image or the extracted data. This could involve tasks like refining boundaries, resolving ambiguities, or performing additional analysis to derive higher-level insights.'},
        {'title': '9)   Decision Making or Action', 'description': 'Based on the processed information, make decisions or take actions. This could include automated decisions based on predefined criteria or presenting information to human operators for further assessment and action.'}
    ]
    return render_template("Hierarchical_Image.html", data=data, workflowtitle="Brief overview of how Hierarchical image processing Works", workflows=workflows)


@bp.route("/hierarichal_image_output", methods=['POST'])
def hierarichal_image_output():
    if request.method == 'POST':
        if 'hierarchical-image-input-image-file' in request.files:
            file = request.files['hierarchical-image-input-image-file']
            img_dir = 'assets/uploads/filters/hierarchical/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.hierarchical(img_dir)
            data = {
                'img_url': img_path,
                'hierarchical': output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/Hierarchical_Image.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'hierarchical': output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'


@bp.route("/hough_trasform", methods=['GET'])
def hough_trasform_temp():
    data = {
        'title': 'Hough Transform',
        'def': 'The Hough Transform is a powerful technique in image processing used for detecting shapes or patterns, particularly lines or curves within an image. It"s commonly used in computer vision and image analysis. '
    }

    workflows = [
        {'title': '1)   Edge Detection', 'description': 'The first step in many Hough Transform workflows involves detecting edges within the image. Popular edge detection algorithms like Canny, Sobel, or Prewitt are employed to highlight significant changes in intensity, which often represent potential edges.'},
        {'title': '2)   Parameter Space Initialization',
            'description': 'The Hough Transform relies on a parameter space to detect lines or other shapes. For detecting lines, the parameters are often slope (m) and intercept (c) in the equation y = mx + c. The parameter space usually represents these parameters, often in an accumulator array or a voting space.'},
        {'title': '3)   Voting',
            'description': 'For each edge point obtained in the edge detection step, the corresponding parameters (slope and intercept for lines) are calculated and incremented in the parameter space. This process "votes" for potential lines that could pass through these edge points.'},
        {'title': '4)   Accumulator Thresholding',
            'description': 'The accumulator array is examined to find peaks. These peaks represent the parameters (slope and intercept for lines) where there is a significant accumulation of votes, indicating potential lines present in the image.'},
        {'title': '5)   Line Reconstruction', 'description': 'The peaks identified in the parameter space correspond to the potential lines in the original image. The parameters obtained from the accumulator space are then used to reconstruct these lines in the image.'},
        {'title': '6)   Post-processing', 'description': 'Refinement steps might include line segment detection, non-maximum suppression to eliminate weak or overlapping lines, and further filtering based on properties like length or orientation.'}
    ]
    return render_template("hough_transform.html", data=data, workflowtitle="Brief overview of how Hough Trasform Works", workflows=workflows)


@bp.route("/hough_trasform_output", methods=['POST'])
def hough_trasform_output():
    if request.method == 'POST':
        if 'hough-tansform-input-image-file' in request.files:
            file = request.files['hough-tansform-input-image-file']
            img_dir = 'assets/uploads/filters/hough_transform/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.hough_transform(img_dir)
            data = {
                'img_url': img_path,
                'hough_transform': output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/hough_transform.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'hough_transform': output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'


@bp.route("/region_growing", methods=['GET'])
def region_growing_temp():
    data = {
        'title': 'Region growing',
        'def': 'Region growing is a segmentation technique in image processing used to group together pixels with similar characteristics to form regions or regions of interest within an image. The key idea behind region growing is to start with a seed point (or points) and iteratively add neighboring pixels that meet certain criteria to the growing region.'
    }

    workflows = [
        {'title': '1)   Initialization',
            'description': 'Select one or more seed points within the image. These seed points serve as the starting points for region growing.'},
        {'title': '2)   Criteria for Growth', 'description': 'Define a criterion or a set of criteria that determine whether a neighboring pixel should be added to the region. Common criteria include similarity in intensity, color, texture, or other image features'},
        {'title': '3)   Queue or Stack Initialization',
            'description': 'Create a data structure (usually a queue or stack) to keep track of pixels that are candidates for inclusion in the region. Initially, this structure contains the seed points.'},
        {'title': '4)   Region Growing Iteration',
            'description': 'While the queue or stack is not empty, perform the following steps:   1. Dequeue or pop a pixel from the queue or stack.  2. Examine the pixel and compare its characteristics (e.g., intensity) with the criteria defined in step 2. 3. If the pixel meets the criteria, add it to the growing region and mark it as visited. You can also update the region"s properties (e.g., centroid, size, mean intensity) at this stage.  4. Enqueue or push the unvisited neighboring pixels that meet the criteria to the queue or stack for further processing.'},
        {'title': '5)   Termination Condition', 'description': 'Define a termination condition. The region growing process continues until this condition is met. It can be based on factors like the size of the region, a specific threshold, or no more suitable pixels to add.'},
        {'title': '6)   Post-Processing (Optional)', 'description': 'Perform any necessary post-processing on the segmented region, such as noise removal, smoothing, or shape analysis, depending on the specific application.'},
        {'title': '7)   Visualization or Analysis',
            'description': 'Display or analyze the segmented regions as per your requirements, which may include highlighting, measuring, or further processing.'}
    ]
    return render_template("region_growing.html", data=data, workflowtitle="Brief overview of how Region Growing Works", workflows=workflows)


@bp.route("/region_growing_output", methods=['POST'])
def region_growing_output():
    if request.method == 'POST':
        if 'region-growing-input-image-file' in request.files:
            file = request.files['region-growing-input-image-file']
            img_dir = 'assets/uploads/filters/region_growing/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.region_growing(img_dir)
            data = {
                'img_url': img_path,
                'region_growing': output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/region_growing.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'region_growing': output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'


@bp.route("/region_merging", methods=['GET'])
def region_merging_temp():
    data = {
        'title': 'Region merging',
        'def': 'Region merging is a method used in image processing and computer vision to group adjacent or similar regions within an image to form larger, more coherent regions. It"s a technique often employed in segmentation tasks, aiming to simplify an image by grouping similar pixels or regions together. '
    }

    workflows = [
        {'title': '1)   Image Preprocessing', 'description': '1) Input Image: Begin with an input image, which could be grayscale or color. 2) Noise Reduction: Apply any necessary noise reduction techniques to improve the quality of the image.'},
        {'title': '2)   Initial Segmentation', 'description': 'Grid Partitioning or Initial Region Generation: 1) Divide the image into smaller regions or segments. This division could be based on a grid or an initial over-segmentation method.2) Region Representation: Each region is represented by its attributes such as color, intensity, texture, or any other features suitable for the segmentation task.'},
        {'title': '3)   Region Similarity Measurement', 'description': 'Similarity Metrics: Define similarity measures to evaluate the similarity between neighboring regions or pixels. These metrics could include color similarity, intensity values, texture, gradient, or other relevant features.'},
        {'title': '4)   Region Merging', 'description': '1) Merge Decision: Compare neighboring regions based on the similarity measures. If the similarity between adjacent regions meets certain predefined criteria or thresholds, merge these regions together.2) Connected Component Analysis: Ensure connectedness and coherence of the merged regions. This step involves validating that the newly merged regions maintain their connectivity.'},
        {'title': '5)   Iterative Processing', 'description': 'Iteratively perform the region merging process, re-evaluating and potentially further merging the regions until a stopping criterion is met. This could be a maximum region size, a predetermined number of iterations, or when no further merges meet the similarity criteria.'},
        {'title': '6)   Post-processing', 'description': '1) Region Labeling: Assign unique labels or identifiers to different segmented regions.2) Visualization or Further Analysis: Visualize the segmented regions or perform additional processing or analysis based on the resulting segmentation for the specific application requirements.'},
        {'title': '7)   Evaluation and Validation', 'description': 'Quantitative Assessment: Assess the quality and accuracy of the segmentation. This could involve comparing the segmented regions with ground truth data, if available, or using performance metrics such as precision, recall, or F1-score.'}
    ]
    return render_template("region_merging.html", data=data, workflowtitle="Brief overview of how Region Merging Works", workflows=workflows)


@bp.route("/region_merging_output", methods=['POST'])
def region_merging_output():
    if request.method == 'POST':
        if 'region-merging-input-image-file' in request.files:
            file = request.files['region-merging-input-image-file']
            img_dir = 'assets/uploads/filters/region_merging/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.region_merging(img_dir)
            data = {
                'img_url': img_path,
                'region_merging': output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/region_merging.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'region_merging': output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'


@bp.route("/runLengthCoding", methods=['GET'])
def runLengthCoding_temp():
    data = {
        'title': 'Run-length encoding (RLE)',
        'def': 'Run-length encoding (RLE) is a simple form of data compression that finds applications in various fields, including image processing, to efficiently store or transmit data. In image processing, RLE can be used for compressing images by encoding consecutive pixels of the same value into a shorter form.'
    }

    workflows = [
        {'title': '1)   Image Preprocessing', 'description': 'The process often begins with image preprocessing, which may involve operations such as noise reduction, normalization, or other pre-filtering techniques to enhance the quality or characteristics of the image.'},
        {'title': '2)   Image Segmentation', 'description': 'Identifying regions or objects of interest in the image. This step is crucial to define distinct areas or shapes in the image before applying RLE.'},
        {'title': '3)   Run-Length Encoding',
            'description': 'a. Run Formation: Scan the image in a particular order (e.g., row-wise or column-wise) and identify runs of consecutive pixels with the same value.b. Run-Length Encoding: Encode these runs by storing the value of the pixel and the length of the run into a more compact form. For example, rather than storing each pixel value individually, RLE encodes sequences like "15 black pixels followed by 20 white pixels" as "15B20W."'},
        {'title': '4)   Data Transmission/Storage', 'description': 'The compressed data generated by RLE can then be transmitted or stored more efficiently than the original image data, particularly if the image contains long sequences of repeated pixel values.'},
        {'title': '5)   Decoding/Reconstruction', 'description': 'When the compressed data needs to be utilized or displayed, it must be decoded back into its original format. The decoding process involves the reverse operation of RLE, where the encoded runs are expanded back into individual pixel values to reconstruct the image.'},
        {'title': '6)   Post-Processing',
            'description': 'After decoding, further image processing or analysis can be performed on the reconstructed image as required.'}
    ]
    return render_template("runLengthEncode.html", data=data, workflowtitle="Brief overview of how Run Length Coding Works", workflows=workflows)


@bp.route("/runLengthCoding_output", methods=['POST'])
def runLengthCoding_output():
    if request.method == 'POST':
        if 'run-length-coding-input-image-file' in request.files:
            file = request.files['run-length-coding-input-image-file']
            img_dir = 'assets/uploads/filters/runLengthEncode/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.runLengthEncode(img_dir)
            data = {
                'img_url': img_path,
                'runLengthEncode': output_img

            }
            return {
                'template': render_template('OutputCollapse/filters/runLengthEncode.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'runLengthEncode': output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'


@bp.route("/vectorQuantization", methods=['GET'])
def vectorQuantization_temp():
    data = {
        'title': 'Vector quantization',
        'def': 'Vector quantization is a technique used in image processing for data compression, image representation, and analysis. It involves grouping similar data points (vectors) into clusters and then representing these clusters with a smaller number of representative vectors, thereby reducing the overall data size.'
    }

    workflows = [
        {'title': '1)   Preprocessing the Image',
            'description': 'Convert the image into a format suitable for processing (e.g., RGB to grayscale if necessary).Resize or scale the image to a manageable size if needed.'},
        {'title': '2)   Dividing the Image into Blocks',
            'description': 'Divide the image into smaller blocks or segments. This step is critical in preparing the data for vector quantization.'},
        {'title': '3)   Vectorization',
            'description': 'Convert each block of the image into a vector representation. For instance, if using an 8x8 block, each block becomes a vector of 64 elements (pixel values).'},
        {'title': '4)   Clustering', 'description': 'Apply clustering algorithms, such as k-means, to group these vectors into clusters based on similarity. This step involves finding centroids that represent the "average" of each cluster.'},
        {'title': '5)   Quantization', 'description': 'Replace each vector in the image with the centroid of the cluster it belongs to. This step effectively reduces the data size by using fewer representative vectors to approximate the original data.'},
        {'title': '6)   Codebook Generation',
            'description': 'Create a codebook that contains the centroids (vectors) representing each cluster formed in the previous step. This codebook is used for reconstruction or decoding.'},
        {'title': '7)   Encoding', 'description': 'Represent the image using indices that point to the corresponding vectors in the codebook. This encoded form is more compact and requires fewer bits to store or transmit.'},
        {'title': '8)   Decoding and Reconstruction',
            'description': 'To view or process the compressed image, reverse the process by using the indices to retrieve vectors from the codebook and replace them back into the image.'}
    ]
    return render_template("VectorQuantization.html", data=data, workflowtitle="Brief overview of how Vector Quantization Works", workflows=workflows)


@bp.route("/vectorQuantization_output", methods=['POST'])
def vectorQuantization_output():
    if request.method == 'POST':
        if 'vector-quantization-input-image-file' in request.files:
            file = request.files['vector-quantization-input-image-file']
            img_dir = 'assets/uploads/filters/vector_quantization/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.vector_quantization(img_dir)
            data = {
                'img_url': img_path,
                'vector_quantization': output_img

            }
            return {
                'template': render_template('OutputCollapse/filters/vector_quantization.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'vector_quantization': output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'

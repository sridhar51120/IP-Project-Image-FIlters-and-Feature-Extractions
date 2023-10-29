from flask import Blueprint, render_template, redirect, url_for, request, session
from src.Segmentation import Segmentation
import os
import cv2

bp = Blueprint("filters1", __name__, url_prefix="/filter1")


@bp.route("/Constrained_least_square_filtering", methods=['GET'])
def Constrained_least_square_filtering_temp():
    data = {
        'title' : 'Constrained least square filtering',
        'def' : 'Constrained least square filtering is an image processing technique used to improve the quality of images by minimizing the impact of noise while preserving important image features. It involves solving a constrained optimization problem where a specific constraint is placed on the image or filtered version'
    }

    workflows = [
        {'title': '1) Image Preprocessing:','description':'Start with the acquisition of the image you want to process. Ensure that the image is appropriately preprocessed if needed, which may involve resizing, grayscale conversion, or contrast adjustment.'},
        {'title': '2) Noise Characterization','description':'Analyze the noise in the image. Calculate its statistical properties, such as mean, variance, and distribution type. Understanding the noise characteristics is crucial for selecting an appropriate constrained optimization model.'},
        {'title': '3) Formulating the Objective Function','description':'Define the objective function that represents the image filtering problem. In constrained least square filtering, the objective function often consists of a data fidelity term, a regularization term, and a constraint term. The data fidelity term measures how well the filtered image matches the original image, the regularization term enforces a prior on the image, and the constraint term ensures that the filtered image adheres to specific constraints'},
        {'title': '4) Selecting a Regularization Technique','description':'Choose a regularization technique based on the specific requirements of your application. Common regularization methods include Total Variation (TV) regularization, L1 regularization, and wavelet-based regularization. The choice depends on the nature of the image and the desired trade-off between noise reduction and detail preservation.'},
        {'title': '5) Setting the Constraints','description':'Define the constraints you want to apply to the filtered image. Constraints can be used to enforce specific properties such as non-negativity, positivity, or bounded values in the filtered image.'},
        {'title': '6) Optimization Algorithm','description':'Select an optimization algorithm to solve the constrained optimization problem. Common optimization techniques for constrained least square filtering include gradient descent, interior-point methods, and ADMM (Alternating Direction Method of Multipliers).'},
        {'title': '7) Parameter Tuning','description':'Experiment with different parameter settings for the regularization term, constraint term, and optimization algorithm. Cross-validation or other validation techniques can help in parameter selection'},
        {'title': '8) Solving the Optimization Problem','description':'Apply the chosen optimization algorithm to solve the constrained optimization problem. This will yield the filtered image that minimizes the objective function under the specified constraints.'},
        {'title': '9) Evaluation','description':'Assess the effectiveness of the constrained least square filtering by using appropriate quality metrics and visual inspection. Ensure that the output meets your image processing goals and the constraints are satisfied'}
        ]

    code = [
        {'comment' : '# import required libraries', 'code' : 'import numpy as np'},
        {'comment' : '', 'code' : 'import cv2'},
        {'comment' : '', 'code' : 'from scipy.optimize import minimize'},
        {'comment' : '# Load the input image', 'code' : 'input_image = cv2.imread("test.jpg", cv2.IMREAD_GRAYSCALE)'},
        {'comment' : '# Define the constrained least squares filter function', 'code' : 'def constrained_least_squares_filter(kernel, input_image, constraints):'},
        {'comment' : '    # Reshape the kernel to the desired shape (e.g., 3x3)', 'code' : '    kernel = kernel.reshape(3, 3)'},
        {'comment' : '    # Apply the filter using convolution', 'code' : '    filtered_image = cv2.filter2D(input_image, -1, kernel)'},
        {'comment' : '    # Calculate the squared difference between filtered and input images', 'code' : '    diff = np.sum(np.square(filtered_image - input_image))'},
        {'comment' : '    # Apply constraints as penalty terms', 'code' : '    penalty = 0'},
        {'comment' : '', 'code' : '    for constraint in constraints:'},
        {'comment' : '', 'code' : '        penalty += constraint(kernel)'},
        {'comment' : '    # Return the objective function value (minimize squared difference + penalties)', 'code' : '    return diff + penalty'},
        {'comment' : '# Define constraints (modify as needed)', 'code' : 'def constraint_1(kernel):'},
        {'comment' : '    # Example constraint: ensure the sum of the kernel elements is 1', 'code' : '    return np.square(np.sum(kernel) - 1)'},
        {'comment' : '# Initial guess for the filter kernel (as a 1D array)', 'code' : 'initial_kernel = np.random.rand(9)'},
        {'comment' : '# Define constraints as a list', 'code' : 'constraints = [constraint_1]'},
        {'comment' : '# Minimize the objective function', 'code' : 'result = minimize(constrained_least_squares_filter, initial_kernel, args=(input_image, constraints))'},
        {'comment' : '# Get the optimized filter kernel (reshape to 3x3)', 'code' : 'optimized_kernel = result.x.reshape(3, 3)'},
        {'comment' : '# Apply the optimized filter to the input image', 'code' : 'filtered_image = cv2.filter2D(input_image, -1, optimized_kernel)'},
        {'comment' : '# Save or display the filtered image', 'code' : 'cv2.imwrite("output.jpg", filtered_image)'},
        {'comment' : '', 'code' : 'cv2.imshow("Filtered Image", filtered_image)'},
        {'comment' : '', 'code' : 'cv2.waitKey(0)'},
        {'comment' : '', 'code' : 'cv2.destroyAllWindows()'}
    ]
    return render_template("Constrained_least_square_filtering.html", data=data, workflowtitle="Brief overview of how Constrained Least Square Filtering Works", workflows=workflows, code=code)


@bp.route("/Constrained_least_square_filtering_output", methods=['POST'])
def Constrained_least_square_filtering_output():
    if request.method == 'POST':
        if 'constraine-least-input-image-file' in request.files:
            file = request.files['constraine-least-input-image-file']
            img_path = f'assets/uploads/segmantation/{file.filename}'
            file.save(os.path.join(img_path))
            const = Segmentation(img_path)
            constaint_img = const.ConstraintLeastSquare()

            data = {
                'img_url': img_path,
                'constaint_img': constaint_img
            }

            return {
                'template': render_template('OutputCollapse/segmentation/Constrained_least_square_filtering.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'constaint_img': constaint_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'


@bp.route("/Order_statistics_filters", methods=['GET'])
def Order_statistics_filters_temp():
    data = {
        'title' : 'Order Statistics Filters',
        'def' : 'Order Statistics Filters are used in image processing for tasks like noise reduction, image enhancement, and feature extraction. These filters are based on selecting pixel values from a neighborhood around a central pixel and ordering them to obtain the desired result.'
    }

    workflows = [
        {'title': '1) Image Preprocessing','description':'Begin by acquiring the image you want to process. Ensure that the image is in the appropriate format and grayscale if necessary.'},
        {'title': '2) Structuring Element Definition','description':'Define a structuring element, which is a small, typically square or rectangular, window that moves across the image to process each pixel. The size and shape of the structuring element depend on the specific task you want to accomplish.'},
        {'title': '3) Neighborhood Selection','description':'Determine the size of the neighborhood around each pixel that the filter will consider. The choice of the neighborhood size is crucial and should be based on the characteristics of the image and the desired filtering effect.'},
        {'title': '4) Order Statistics Selection','description':'Choose the specific order statistics operation you want to perform, such as median, minimum, maximum, or any other percentile (e.g., 10th percentile). The selection depends on the goal of the operation. For instance, the median is often used for noise reduction, while minimum and maximum may be used for morphological operations.'},
        {'title': '5) Sliding Window','description':'Slide the structuring element across the entire image. At each position, the filter calculates the chosen order statistic value from the pixel values within the neighborhood.'},
        {'title': '6) Filter Operation','description':'Apply the selected order statistics operation to the pixel values within the neighborhood defined by the structuring element. This step generates a new pixel value for the central pixel.'},
        {'title': ') Border Handling','description':'Handle the borders of the image appropriately. There are various methods for border handling, including zero-padding, mirror reflection, or periodic extension.'},
        {'title': '8) Iterative Refinement (Optional)','description':'If the initial order statistics filtering results are unsatisfactory, consider experimenting with different structuring element sizes, order statistics, or additional post-processing steps to optimize the results.'},
        {'title': '9) Quality Assessment','description':'Assess the effectiveness of the order statistics filter by using relevant quality metrics, such as PSNR (Peak Signal-to-Noise Ratio), SSIM (Structural Similarity Index), or visual inspection. Ensure that the output meets your image processing goals.'}
        ]

    code = [
        {'comment' : '# Import Required Library', 'code' : 'import cv2'},
        {'comment' : '# Load the Input Image', 'code' : 'input_image = cv2.imread("input_img.jpg", cv2.IMREAD_GRAYSCALE)'},
        {'comment' : '# Define Kernal size of the image', 'code' : 'kernel_size = 5'},
        {'comment' : '# Apply Median Blur Operation', 'code' : 'filtered_image = cv2.medianBlur(input_image, kernel_size)'},
        {'comment' : '# Save the file', 'code' : 'cv2.imwrite(img_path, filtered_image)'},
        {'comment' : '# Display the file using opencv Lib', 'code' : 'cv2.imshow("filtered_image","Output Image")'},
        {'comment' : '', 'code' : 'cv2.waitKey(0)'},
        {'comment' : '', 'code' : 'cv2.destroyAllwindows()'}
        
    ]
    return render_template("Order_statistics_filters.html", data=data, workflowtitle="Brief overview of how Order Statistics Filters Works", workflows=workflows, code=code)

@bp.route("/Order_statistics_filters_output", methods=['POST'])
def Order_statistics_filters_output():
    if request.method == 'POST':
        if 'order-statics-input-image-file' in request.files:
            file = request.files['order-statics-input-image-file']
            img_dir = 'assets/uploads/filters/order_statistics_filters/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Segmentation(img_path)
            output_img = const.OrederStatics(img_dir)
            data = {
                'img_url': img_path,
                'Order_statistics': output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/order_statics.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'Order_statistics': output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'

@bp.route("/Hormonic_Filter", methods=['GET'])
def Hormonic_Filter_temp():
    data = {
        'title' : 'Hormonic Filter',
        'def' : 'The harmonic mean is a mathematical operation used in various image processing techniques, such as contrast enhancement, edge detection, and filtering.'
    }

    workflows = [
        {'title': '1) Image Preprocessing','description':'Start with the acquisition of the image you want to process. Ensure that the image is appropriately preprocessed if needed, which may involve resizing, grayscale conversion, or contrast adjustment.'},
        {'title': '2) Local Neighborhood Definition','description':'Define a local neighborhood around each pixel in the image. The size of the neighborhood depends on the specific image processing task and the scale at which you want to apply the harmonic mean operation.'},
        {'title': '3) Harmonic Mean Calculation','description':'For each pixel in the image, compute the harmonic mean of the pixel values within the defined local neighborhood. The harmonic mean for a set of values (x1, x2, ..., xn) is calculated as n divided by the sum of the reciprocals of the values: H = n / (1/x1 + 1/x2 + ... + 1/xn).'},
        {'title': '4) Filtering or Enhancement','description':'The harmonic mean can be used as a filter or enhancement operation. It tends to emphasize the influence of lower-intensity values, making it sensitive to fine details and edges in the image. Applications include: 1) Edge enhancement,2) Contrast enhancement,3) Denoising'},
        {'title': '5) Parameter Tuning','description':'Experiment with different local neighborhood sizes and configurations to fine-tune the harmonic mean operation for your specific image processing goals. Smaller neighborhoods may emphasize fine details, while larger neighborhoods may provide more smoothing.'},
        {'title': '6) Evaluation','description':'Assess the effectiveness of the harmonic mean operation by using relevant quality metrics and visual inspection. Ensure that the output meets your image processing objectives.'},
        {'title': '7) Iterative Refinement (Optional)','description':'If the initial harmonic mean results are unsatisfactory, consider iterating through the process with different neighborhood sizes and configurations to optimize the results'}
        ]

    code = [
        {'comment' : '# Import Required library', 'code' : 'import numpy as np'},
        {'comment' : '', 'code' : 'import cv2'},
        {'comment' : '# Load the image', 'code' : 'image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)'},
        {'comment' : '# Perform Discrete Fourier Transform (DFT)', 'code' : 'dft = cv2.dft(np.float32(image), flags=cv2.DFT_COMPLEX_OUTPUT)'},
        {'comment' : '', 'code' : 'dft_shift = np.fft.fftshift(dft)'},
        {'comment' : '# High-pass filter: increase high-frequency components', 'code' : 'rows, cols = image.shape'},
        {'comment' : '', 'code' : 'crow, ccol = rows // 2, cols // 2'},
        {'comment' : '', 'code' : 'mask = np.ones((rows, cols, 2), np.uint8)'},
        {'comment' : '', 'code' : 'mask[crow - strength:crow + strength, ccol - strength:ccol + strength] = 0'},
        {'comment' : '# Apply the high-pass filter', 'code' : 'dft_shift = dft_shift * mask'},
        {'comment' : '# Inverse DFT', 'code' : 'f_ishift = np.fft.ifftshift(dft_shift)'},
        {'comment' : '', 'code' : 'img_back = cv2.idft(f_ishift)'},
        {'comment' : '', 'code' : 'img_back = cv2.magnitude(img_back[:, :, 0], img_back[:, :, 1])'},
        {'comment' : '# Normalize the output image to display it properly', 'code' : 'img_back = cv2.normalize(img_back, None, alpha=0, beta=255, norm_type=cv2.NORM_MINMAX, dtype=cv2.CV_8U)'},
        {'comment' : '# Display the original and harmonic images', 'code' : 'cv2.imshow("Original Image", image)'},
        {'comment' : '', 'code' : 'cv2.imshow(f"Harmonic Image (Strength = {strength})", img_back)'},
        {'comment' : '', 'code' : 'cv2.waitKey(0)'},
        {'comment' : '', 'code' : 'cv2.destroyAllWindows()'},
        {'comment' : '# Save the resulting image', 'code' : 'harmonic_img_path = "harmonic_image.png"'},
        {'comment' : '', 'code' : 'cv2.imwrite(harmonic_img_path, img_back)'},
        {'comment' : '', 'code' : 'print(f"Harmonic image saved as {harmonic_img_path}")'}
    ]
    return render_template("Hormonic_Filter.html",data=data,workflowtitle="Brief overview of how Hormonic Filter Works",workflows=workflows,code=code)

@bp.route("/Hormonic_Filter_output", methods=['POST'])
def Hormonic_Filter_output():
    if request.method == 'POST':
        if 'harmonic-filter-input-image-file' in request.files:
            file = request.files['harmonic-filter-input-image-file']
            img_dir = 'assets/uploads/filters/harmonics/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Segmentation(img_path)
            output_img = const.harmonics_filter(img_dir)
            data = {
                'img_url': img_path,
                'harmonic_filter': output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/harmonic_filter.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'harmonic_filter': output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'


@bp.route("/geometric_mean", methods=['GET'])
def geometric_mean_temp():
    data = {
        'title' : 'Geometric Mean',
        'def' : 'Geometric Mean is a mathematical operation that is used in various image processing applications, such as image enhancement and noise reduction. The geometric mean emphasizes the middle range of pixel values and can help mitigate the effects of extreme values or outliers.'
    }

    workflows = [
        {'title': '1) Image Acquisition','description':'Start with the acquisition of the image you want to process. Ensure that the image is in a suitable format and resolution for your intended application.'},
        {'title': '2) Preprocessing (Optional)','description':'Depending on the specific characteristics of your image, you may need to perform preprocessing steps such as resizing, contrast adjustment, or color space conversion. Preprocessing is often necessary to ensure that the image is ready for the geometric mean operation.'},
        {'title': '3) Image Segmentation (Optional)','description':'If your image processing task involves isolating specific regions or objects within the image, consider applying image segmentation techniques. This can help you work with specific image areas independently.'},
        {'title': '4) Local Window Selection','description':'Decide on the size and shape of the local window or neighborhood that you"ll use for the geometric mean operation. The size of the window affects the scale over which the geometric mean is computed.'},
        {'title': '5) Local Window Scanning','description':'Slide the selected local window over the entire image. For each position, extract the pixel values within the window.'},
        {'title': '6) Geometric Mean Calculation','description':'Compute the geometric mean of the pixel values within the local window. This is done by taking the product of the values and then taking the Nth root, where N is the number of values.'},
        {'title': '7) Output Image Update','description':'Replace the central pixel value within the local window with the computed geometric mean. This updates the output image.'},
        {'title': '8) Iterative Process','description':'Continue the process of scanning the local window over the entire image, calculating the geometric mean, and updating the output image until you have processed the entire image.'},
        {'title': '9) Quality Assessment','description':'Evaluate the effectiveness of the geometric mean operation by using appropriate quality metrics and visual inspection. Ensure that the image retains its important features while suppressing unwanted variations.'},
        {'title': '10) Post-Processing (Optional)','description':'Depending on the results and your specific goals, you may apply post-processing techniques such as contrast enhancement, edge detection, or further filtering to improve the image.'}
        ]

    code = [
        {'comment' : '# Import Required Library', 'code' : 'import cv2'},
        {'comment' : '', 'code' : 'import numpy as np'},
        {'comment' : '# load the Image', 'code' : 'image = cv2.imread(image_path)'},
        {'comment' : '# Convert the RGB Image to Gray Image', 'code' : 'gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)'},
        {'comment' : '# Perform Canny edge detection', 'code' : 'edges = cv2.Canny(gray, 50, 150, apertureSize=3)'},
        {'comment' : '# Find contours', 'code' : 'contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)'},
        {'comment' : '# Create a white canvas', 'code' : 'geometric_img = np.ones_like(image) * 255'},
        {'comment' : '# Draw approximated polygons around contours', 'code' : 'for contour in contours:'},
        {'comment' : '', 'code' : 'epsilon = 0.01 * cv2.arcLength(contour, True)'},
        {'comment' : '', 'code' : 'approx = cv2.approxPolyDP(contour, epsilon, True)'},
        {'comment' : '', 'code' : 'cv2.drawContours(geometric_img, [approx], -1, (0, 0, 0), 2)'},
        {'comment' : ' # Display the geometric image', 'code' : 'cv2.imshow("Geometric Image", geometric_img)'},
        {'comment' : '', 'code' : 'cv2.waitKey(0)'},
        {'comment' : '', 'code' : 'cv2.destroyAllWindows()'},
        {'comment' : '# Save the resulting image', 'code' : 'geometric_img_path = "geometric_image.png"'},
        {'comment' : '', 'code' : 'cv2.imwrite(geometric_img_path, geometric_img)'},
        {'comment' : '', 'code' : 'print(f"Geometric image saved as {geometric_img_path}")'}
    ]
    return render_template("geometric_mean.html",data=data,workflowtitle="Brief overview of how Gamma_correction Works",workflows=workflows,code=code)

@bp.route("/geometric_mean_output", methods=['POST'])
def geometric_mean_output():
    if request.method == 'POST':
        if 'geometric-filter-input-image-file' in request.files:
            file = request.files['geometric-filter-input-image-file']
            img_dir = 'assets/uploads/filters/geometric_mean/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Segmentation(img_path)
            output_img = const.geometric_filter(img_dir)
            data = {
                'img_url': img_path,
                'median_img': output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/geometric_mean.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'median_img': output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'
        
@bp.route("/median_Filter", methods=['GET'])
def median_Filter_temp():
    data = {
        'title' : 'Median Filter',
        'def' : 'Median Filter is a common image processing technique used to reduce noise and enhance image quality, especially in the presence of salt-and-pepper noise. The median filter replaces each pixel"s intensity value with the median value of the intensities within a local neighborhood.'
    }
    workflows = [
        {'title': '1) Input Image','description':'Start with the noisy image that requires denoising, particularly one affected by salt-and-pepper noise.'},
        {'title': '2) Define the Neighborhood','description':'Choose the size of the neighborhood (typically a square or rectangular window) within which the median value will be calculated. The neighborhood size is a crucial parameter that affects the extent of noise reduction and the preservation of image details.'},
        {'title': '3) Padding (Optional)','description':'If the neighborhood extends beyond the image boundary, decide how to handle the edges. Common options include zero-padding, reflection padding, or replication of boundary pixels.'},
        {'title': '4) Iterate Through the Image','description':'For each pixel in the image, apply the median filtering operation:  1)Create a window centered at the current pixel, with a size determined by the chosen neighborhood size.2) Collect all the pixel intensities within the window.3) Sort the collected intensities in ascending order.4) Set the current pixel"s intensity to the median value from the sorted list.'},
        {'title': '5) Repeat for All Pixels','description':'Iterate through all pixels in the image, applying the median filtering operation to each one.'},
        {'title': '6) Output Image','description':'The result is a denoised image with salt-and-pepper noise significantly reduced while preserving important image features.'},
        {'title': '7) Quality Assessment','description':'Assess the quality of the denoised image using relevant image quality metrics or visual inspection. Ensure that noise has been effectively reduced while maintaining the image"s essential details and features.'},
        {'title': '8) Adjust the Neighborhood Size (Optional)','description':'Depending on the characteristics of the noise and the specific image, you may need to experiment with different neighborhood sizes to find the optimal setting. A smaller neighborhood provides stronger denoising but may blur fine details, while a larger neighborhood can preserve more detail but may leave some noise.'},
        {'title': '9) Post-Processing (Optional)','description':'Depending on the results and your specific application, you can apply additional image processing steps such as contrast stretching, sharpening, or color correction to further enhance the visual quality of the denoised image.'}
        ]

    code = [
        {'comment' : '# Import Required Librayr', 'code' : 'import cv2'},
        {'comment' : '', 'code' : 'import numpy as np'},
        {'comment' : '# Load the image', 'code' : 'image = cv2.imread(image_path)'},
        {'comment' : '# Apply the median filter', 'code' : 'filtered_image = cv2.medianBlur(image, kernel_size)'},
        {'comment' : '# Display the original and filtered images', 'code' : 'cv2.imshow("Original Image", image)'},
        {'comment' : '', 'code' : 'cv2.imshow(f"Median Filtered Image (Kernel Size = {kernel_size})", filtered_image)'},
        {'comment' : '', 'code' : 'cv2.waitKey(0)'},
        {'comment' : '', 'code' : 'cv2.destroyAllWindows()'},
        {'comment' : '# Save the resulting image', 'code' : 'filtered_img_path = "median_filtered_image.png"'},
        {'comment' : '', 'code' : 'cv2.imwrite(filtered_img_path, filtered_image)'},
        {'comment' : '', 'code' : 'print(f"Median filtered image saved as {filtered_img_path}")'}
    ]
    return render_template("Median_Filter.html",data=data,workflowtitle="Brief overview of how Median Filter Works",workflows=workflows,code=code)

@bp.route("/median_filter_output", methods=['POST'])
def medial_filter_output():
    if request.method == 'POST':
        if 'median-filter-input-image-file' in request.files:
            file = request.files['median-filter-input-image-file']
            img_dir = 'assets/uploads/filters/median_filter/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Segmentation(img_path)
            output_img = const.median_filter(img_dir)
            data = {
                'img_url': img_path,
                'median_img': output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/Median_Filter.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'median_img': output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'

@bp.route("/Salt_and_papper_noise", methods=['GET'])
def Salt_and_papper_noise_temp():
    data = {
        'title' : 'Salt-and-Pepper Noise ',
        'def' : 'Salt-and-Pepper Noise appears as random black and white pixels, typically caused by errors in data transmission or faulty pixels in a camera sensor'
    }

    workflows = [
        {'title': '1) Image Inspection and Preprocessing','description':'Start by examining the noisy image to understand the extent and nature of salt-and-pepper noise. Ensure that the image is properly preprocessed, such as converting it to grayscale if needed.'},
        {'title': '2) Noise Characterization','description':'Understand the characteristics of salt-and-pepper noise. It appears as random, isolated black and white pixels with values at the minimum or maximum of the intensity range.'},
        {'title': '3) Visual Inspection and Quality Assessment','description':'Visually inspect the image and assess the quality of the noise reduction process. Take note of important image features that must be preserved during the denoising.'},
        {'title': '4) Thresholding','description':'Apply a threshold to the noisy image. Pixels with intensity values below the threshold are set to zero (black), while those above the threshold are set to the maximum intensity (white). This step may remove some of the noise, but it can also lead to information loss.'},
        {'title': '5) Median Filtering','description':'The median filter is a common and effective technique for salt-and-pepper noise reduction. It replaces each pixel with the median value within a local neighborhood. Experiment with different neighborhood sizes to find the optimal setting.'},
        {'title': '6) Adaptive Median Filtering','description':'For images with varying noise densities, consider using adaptive median filtering. In this approach, the neighborhood size is adjusted based on the local characteristics of the image.'},
        {'title': '7) Noise Detection','description':'If the noise levels vary across the image, use noise detection techniques to identify noisy pixels. This information can guide the application of filtering methods.'},
        {'title': '8) Post-Processing (Optional)','description':'Depending on the specific application and results, apply additional image processing steps such as contrast stretching or edge enhancement to improve the visual quality of the denoised image.'},
        {'title': '9) Quality Assessment and Validation','description':'Evaluate the denoised image using relevant quality metrics and visual inspection. Ensure that the salt-and-pepper noise is adequately reduced while preserving important image details.'},
        {'title': '10) Iterative Refinement (Optional)','description':'If the initial denoising results are unsatisfactory, consider repeating the denoising process with different parameter settings or alternative filtering methods to achieve the desired outcome.'}
        ]

    code = [
        {'comment' : '# Import required library', 'code' : 'import numpy and np'},
        {'comment' : '', 'code' : 'import cv2'},
        {'comment' : '# Load the Input Image', 'code' : 'image = cv2.imread(image_path)'},
        {'comment' : '# Convert the image to grayscale if it"s not already', 'code' : ''},
        {'comment' : '# Check for color image', 'code' : 'if len(image.shape) == 3:  '},
        {'comment' : '', 'code' : 'image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)'},
        {'comment' : '# Extract image dimensions', 'code' : 'if len(image.shape) == 2:  # Grayscale image'},
        {'comment' : '', 'code' : 'row, col = image.shape'},
        {'comment' : '', 'code' : 'else:'},
        {'comment' : '', 'code' : 'raise ValueError("Invalid image format. Expected grayscale image.")'},
        {'comment' : '# Add salt and pepper noise', 'code' : 'num_salt = np.ceil(amount * image.size * 0.5)'},
        {'comment' : '', 'code' : 'num_pepper = np.ceil(amount * image.size * 0.5)'},
        {'comment' : '# Add salt noise', 'code' : 'salt_coords = [np.random.randint(0, i - 1, int(num_salt)) for i in image.shape]'},
        {'comment' : '', 'code' : 'image[salt_coords[0], salt_coords[1]] = 255'},
        {'comment' : ' # Add pepper noise', 'code' : 'pepper_coords = [np.random.randint(0, i - 1, int(num_pepper)) for i in image.shape]'},
        {'comment' : '', 'code' : 'image[pepper_coords[0], pepper_coords[1]] = 0'},
        {'comment' : '# Display the noisy image', 'code' : "cv2.imshow('Noisy Image', image)"},
        {'comment' : '', 'code' : 'cv2.waitKey(0)'},
        {'comment' : '', 'code' : 'cv2.destroyAllWindows()'},
        {'comment' : '# Save the resulting image', 'code' : ''},
        {'comment' : '', 'code' : "noisy_img_path = 'noisy_image.png'"},
        {'comment' : '', 'code' : 'cv2.imwrite(noisy_img_path, image)'},
        {'comment' : '', 'code' : 'print(f"Noisy image with salt and pepper noise saved as {noisy_img_path}")'}
    ]
    return render_template("Salt_and_papper_noise.html",data=data,workflowtitle="Brief overview of how Gamma_correction Works",workflows=workflows,code=code)

@bp.route("/salt_and_papper_noise_output", methods=['POST'])
def salt_and_papper_noise_output():
    if request.method == 'POST':
        if 'salt-and-papper-noise-input-image-file' in request.files:
            file = request.files['salt-and-papper-noise-input-image-file']
            img_dir = 'assets/uploads/filters/salt_and_papper_noise/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Segmentation(img_path)
            output_img = const.salt_and_papper_noise(img_dir)
            data = {
                'img_url': img_path,
                'salt_and_papper_noise' : output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/Salt_and_papper_noise.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'salt_and_papper_noise': output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'
        
@bp.route("/Gaussian_Noise", methods=['GET'])
def Gaussian_Noise_temp():
    data = {
        'title' : 'Gaussian Noise',
        'def' : 'Gaussian noise is characterized by a bell-shaped normal distribution of pixel values around the mean'
    }

    workflows = [
        {'title': '1) Image Acquisition','description':'Start with the acquisition of the image that contains Gaussian noise. Ensure that you have a clear understanding of the image and the noise characteristics.'},
        {'title': '2) Noise Characterization','description':'Analyze the noise in the image. Gaussian noise follows a normal distribution, so estimate the noise parameters, including the mean (usually close to zero) and standard deviation (sigma) to understand the noise characteristics.'},
        {'title': '3) Preprocessing (Optional)','description':'If needed, perform preprocessing tasks such as resizing, color space conversion, or contrast adjustment to prepare the image for noise reduction.'},
        {'title': '4) Algorithm Selection','description':'Choose an appropriate noise reduction algorithm for Gaussian noise based on the noise characteristics. Common algorithms include: 1) Gaussian smoothing (convolution with a Gaussian kernel). 2) Wiener filtering. 3) Non-local means denoising. 4) Bilateral filtering. 4) Anisotropic diffusion. 5)  Total variation denoising.'},
        {'title': '5) Parameter Tuning','description':'If the chosen algorithm has adjustable parameters (e.g., kernel size, filter weights, or regularization parameters), experiment with different settings to find the optimal values. This can be done through cross-validation or other validation techniques.'},
        {'title': '6) Algorithm Application','description':'Apply the selected Gaussian noise reduction algorithm to the image. The Gaussian filter, for example, involves convolution with a Gaussian kernel to reduce noise.'},
        {'title': '7) Quality Assessment','description':'Assess the effectiveness of the noise reduction by using appropriate quality metrics, such as Peak Signal-to-Noise Ratio (PSNR), Mean Squared Error (MSE), or Structural Similarity Index (SSIM). Visual inspection is also valuable to ensure the output meets your image processing goals.'},
        {'title': '8) Iterative Refinement (Optional)','description':'If the initial results are unsatisfactory, consider iterating through the process by revisiting parameter settings and trying different algorithms to optimize the results.'}
        ]

    code = [
        {'comment' : '# Import Required Library', 'code' : 'import cv2'},
        {'comment' : '', 'code' : 'import numpy as np'},
        {'comment' : '# Load the image', 'code' : 'image = cv2.imread("test.jpg")'},
        {'comment' : '# Get the dimensions of the image', 'code' : 'height, width, channels = image.shape'},
        {'comment' : '# Define the mean and standard deviation for the Gaussian noise', 'code' : 'mean = 0'},
        {'comment' : '# You can adjust this value to control the noise level', 'code' : 'stddev = 25 '},
        {'comment' : '# Generate Gaussian noise with the same dimensions as the image', 'code' : 'gaussian_noise = np.random.normal(mean, stddev, (height, width, channels)).astype(np.uint8)'},
        {'comment' : '# Add the Gaussian noise to the image', 'code' : 'noisy_image = cv2.add(image, gaussian_noise)'},
        {'comment' : '# Save or display the noisy image', 'code' : 'cv2.imwrite("noisy_image.jpg", noisy_image)'},
        {'comment' : '', 'code' : 'cv2.imshow("Noisy Image", noisy_image)'},
        {'comment' : '', 'code' : 'cv2.waitKey(0)'},
        {'comment' : '', 'code' : 'cv2.destroyAllWindows()'}
    ]
    return render_template("Gaussian_Noise.html",data=data,workflowtitle="Brief overview of how Gamma_correction Works",workflows=workflows,code=code)

@bp.route("/Gaussian_noise_output", methods=['POST'])
# TODO:
# oise_output
#     output_img = const.Gaussian_noise(img_dir)
#                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
#   File "D:\GITHUB\IP-Project-Image-FIlters-and-Feature-Extractions\src\Segmentation.py", line 92, in Gaussian_noise
#     height, width, channels = image.shape
# ValueError: not enough values to unpack (expected 3, got 2)
def Gaussian_noise_output():
    if request.method == 'POST':
        if 'gaussian-noise-input-image-file' in request.files:
            file = request.files['gaussian-noise-input-image-file']
            img_dir = 'assets/uploads/filters/gaussian_filter/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Segmentation(img_path)
            output_img = const.Gaussian_noise(img_dir)
            data = {
                'img_url': img_path,
                'Gaussian_noise': output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/Gaussian_Noise.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'Gaussian_noise': output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'
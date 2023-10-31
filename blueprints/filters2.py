from flask import Blueprint, render_template, redirect, url_for, request, session
from src.Filters import Filters
import os
import cv2

bp = Blueprint("filters2", __name__, url_prefix="/filters2")


@bp.route("/weiner_filter", methods=['GET'])
def weiner_temp():
    data = {
        'title': 'Wiener Filter',
        'def': 'The Wiener filter is an adaptive filter that minimizes the mean square error between the original and the filtered image. It is often used for noise reduction.'
    }

    workflows = [
        {'title': '1) Problem Definition', 'description': 'Clearly define the problem you want to address using the Wiener Filter. Determine the nature of the signal and the characteristics of the noise to be removed or reduced.'},
        {'title': '2) Data Acquisition',
            'description': 'Collect the noisy signal or image that you want to process using the Wiener Filter.'},
        {'title': '3) Estimate Power Spectral Density (PSD)',
         'description': 'Calculate or estimate the Power Spectral Density of the noisy signal. This step requires defining the noise and signal components in the frequency domain.'},
        {'title': '4) Estimate Signal PSD',
            'description': 'Separate the signal from the noise in the frequency domain, and estimate the Power Spectral Density of the signal component.'},
        {'title': '5) Wiener Filter Design', 'description': 'Calculate the Wiener Filter based on the estimated signal and noise Power Spectral Densities. The Wiener Filter can be designed in either the frequency domain or the time domain.'},
        {'title': '6) Filter Application', 'description': 'Apply the Wiener Filter to the noisy signal or image. This typically involves convolution in the spatial domain or multiplication in the frequency domain.'},
        {'title': '7) Post-processing (Optional)', 'description': 'After applying the Wiener Filter, you may need to perform post-processing, such as thresholding or contrast adjustment, to further enhance the filtered signal or image.'},
        {'title': '8) Evaluation',
            'description': 'Assess the quality of the filtered signal or image using appropriate metrics. Common metrics include Signal-to-Noise Ratio (SNR) and Mean Square Error (MSE). Visual inspection can also be informative.'},
        {'title': '9) Parameter Tuning',
            'description': 'If necessary, fine-tune the parameters used in the Wiener Filter design or post-processing to optimize the results.'},
        {'title': '10) Iterative Refinement (Optional)', 'description': 'If the initial results are unsatisfactory, consider reiterating the process by refining your PSD estimation, changing filter design parameters, or adopting more advanced techniques.'}
    ]

    code = [
        {'comment': '', 'code': ''}
    ]
    return render_template("Weiner.html", data=data, workflowtitle="Brief overview of how Weiner Filter Works", workflows=workflows, code=code)

@bp.route("/weiner_filter_output", methods=['POST'])
def weiner_filter_output():
    if request.method == 'POST':
        if 'weiner-input-image-file' in request.files:
            file = request.files['weiner-input-image-file']
            img_dir = 'assets/uploads/filters/weiner_filter/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.weiner_filters(img_dir)
            data = {
                'img_url': img_path,
                'weiner_filter' : output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/Weiner.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'weiner_filter' : output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'
        
@bp.route("/butterworth_filter", methods=['GET'])
def butterworth_filter_temp():
    data = {
        'title': 'Butterworth Filter',
        'def': 'The Butterworth filter is a type of low-pass or high-pass filter with a smooth and adjustable frequency response. It"s used for various filtering tasks, such as noise reduction and sharpening.'
    }

    workflows = [
        {'title': '1) Define Objectives and Requirements',
            'description': 'Clearly specify the objectives of using the Butterworth filter. Determine whether you need a low-pass, high-pass, or band-pass filter and establish the filter"s cutoff frequency and order.'},
        {'title': '2) Image Preprocessing (For Image Filtering)',
         'description': 'If you"re applying the Butterworth filter to an image, perform any necessary preprocessing, such as resizing, grayscale conversion, or noise reduction, to prepare the image for filtering.'},
        {'title': '3) Calculate the Cutoff Frequency',
            'description': 'Determine the appropriate cutoff frequency for your filter based on your application requirements. The cutoff frequency is the frequency at which the filter"s response drops to -3 dB.'},
        {'title': '4) Select the Filter Order', 'description': 'The filter order defines the steepness of the filter"s roll-off. Higher orders result in steeper roll-offs but may introduce more distortion. Choose an order that balances between filtering requirements and computational efficiency.'},
        {'title': '5) Design the Butterworth Filter',
            'description': 'Use the Butterworth filter design equations to generate the transfer function or coefficients for your filter. The filter design process is based on the selected cutoff frequency, order, and filter type (low-pass, high-pass, etc.).'},
        {'title': '6) Frequency Domain Conversion',
            'description': 'If working with images, convert the image to the frequency domain using the Fast Fourier Transform (FFT) or a similar method.'},
        {'title': '7) Filter Application',
            'description': 'Apply the Butterworth filter by convolving the filter"s transfer function or coefficients with the image in the frequency domain. Ensure you apply the filter to the appropriate frequency components (low, high, or band).'},
        {'title': '8) Inverse Frequency Domain Conversion',
            'description': 'After filtering, transform the image back to the spatial domain using the inverse FFT. The result will be the filtered image.'},
        {'title': '9) Post-processing (For Image Filtering)',
         'description': 'Perform any necessary post-processing steps, such as contrast stretching or normalization, to enhance the visual quality of the filtered image.'},
        {'title': '10) Quality Assessment',
            'description': 'Evaluate the quality of the filtered image. Use appropriate metrics like Peak Signal-to-Noise Ratio (PSNR) or Structural Similarity Index (SSIM) to assess the impact of filtering on image fidelity.'},
        {'title': '11) Iterative Refinement (If Necessary)',
         'description': 'If the filter results are unsatisfactory, you may need to revisit the design parameters, such as the cutoff frequency or order, and make adjustments for better results.'}
    ]

    code = [
        {'comment': '', 'code': ''}
    ]
    return render_template("butterworth_filter.html", data=data, workflowtitle="Brief overview of how Butter worth filter Works", workflows=workflows, code=code)

@bp.route("/butterworth_filter_output", methods=['POST'])
def butterworth_filter_output():
    if request.method == 'POST':
        if 'butterworth-input-image-file' in request.files:
            file = request.files['butterworth-input-image-file']
            img_dir = 'assets/uploads/filters/butterworth_filters/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.butterworth_filter(img_dir)
            data = {
                'img_url': img_path,
                'butterworth_high_pass_filter' : output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/butterworth_filter.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'butterworth_high_pass_filter' : output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'
        
        
@bp.route("/homomorphic_filters", methods=['GET'])
def homomorphic_filters_temp():
    data = {
        'title': 'Homomorphic Filtering',
        'def': 'Homomorphic filtering is used for enhancing images captured under non-uniform illumination conditions. It separates the reflectance and illumination components and processes them separately in the frequency domain.'
    }

    workflows = [
        {'title': '1) Image Acquisition',
            'description': 'Begin with acquiring the image(s) that you want to enhance. It"s important to understand that homomorphic filtering is particularly useful for images with non-uniform illumination, such as those captured in outdoor scenes or under certain lighting conditions.'},
        {'title': '2) Image Preprocessing (Optional)', 'description': 'Depending on the quality of the input image and your specific requirements, you might want to perform preprocessing tasks like resizing, noise reduction, or color space conversion.'},
        {'title': '3) Conversion to Logarithmic Space',
            'description': 'Homomorphic filtering is typically applied in the frequency domain. The first step is to convert the image from the spatial domain to the logarithmic domain (logarithm of the intensity values). This operation linearizes the multiplicative effects of illumination.'},
        {'title': '4) Fast Fourier Transform (FFT)', 'description': 'Apply the Fast Fourier Transform to the logarithmic image to obtain its frequency components. The FFT converts the image from the spatial domain to the frequency domain.'},
        {'title': '5) Filter Design',
            'description': 'Design a filter that amplifies the low-frequency components (illumination) and attenuates the high-frequency components (reflectance). The filter can be defined in the frequency domain or the spatial domain and should be based on the illumination characteristics.'},
        {'title': '6) Filter Application', 'description': 'Convolve the designed filter with the transformed image in the frequency domain. This step enhances the low-frequency components while suppressing the high-frequency components.'},
        {'title': '7) Inverse FFT', 'description': 'Apply the Inverse Fast Fourier Transform to convert the filtered image back to the spatial domain.'},
        {'title': '8) Exponential Operation', 'description': 'Apply an exponential operation to the filtered image to reverse the initial logarithmic transformation, restoring it to the original intensity values.'},
        {'title': '9) Post-processing (Optional)', 'description': 'Depending on the results and your specific application, you may want to perform additional post-processing tasks such as contrast stretching, noise reduction, or further enhancements.'},
        {'title': '10) Visualization and Assessment',
            'description': 'Visualize the enhanced image and assess its quality. Consider using metrics like contrast, color balance, and the preservation of details to evaluate the results.'},
        {'title': '11) Iterative Refinement', 'description': 'If the initial results are unsatisfactory, consider iterating the process by revisiting steps 5 to 10, possibly with different filter designs or parameters.'}
    ]

    code = [
        {'comment': '', 'code': ''}
    ]
    return render_template("Hormonic_Filter.html", data=data, workflowtitle="Brief overview of how Homomarphic Filter Works", workflows=workflows, code=code)

# TODO: PermissionError: [Errno 13] Permission denied: 'assets/uploads/filters/homomarphic/'
@bp.route("/homomarphic_filter_output", methods=['POST'])
def homomarphic_filter_output():
    if request.method == 'POST':
        if 'harmonic-filter-input-image-file' in request.files:
            file = request.files['harmonic-filter-input-image-file']
            img_dir = 'assets/uploads/filters/homomarphic/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.homomarphic_filter(img_dir)
            data = {
                'img_url': img_path,
                'homomorphic_filter' : output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/Homomorphic.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'homomorphic_filter' : output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'

@bp.route("/notch_filter", methods=['GET'])
def notch_filter_temp():
    data = {
        'title': 'Notch Filtering',
        'def': 'Notch filters are used to suppress specific unwanted frequency components, such as periodic noise or interference patterns. They notch out frequencies at specified locations in the spectrum.'
    }

    workflows = [
        {'title': '1) Preprocessing', 'description': 'Start with the acquisition of the image or signal and ensure that it is properly preprocessed. Remove any unwanted artifacts or conduct initial noise reduction if necessary.'},
        {'title': '2) Understanding the Frequency Components',
            'description': 'Analyze the image or signal to identify the frequencies or spectral components that need to be removed. This involves understanding the nature of the noise or interference patterns.'},
        {'title': '3) Designing the Notch Filter', 'description': 'Design a notch filter or a set of notch filters based on the frequencies you want to eliminate. A notch filter is essentially a band-stop filter that attenuates a specific range of frequencies. You need to specify the center frequency and bandwidth of the notches.'},
        {'title': '4) Frequency Domain Transformation',
            'description': 'Convert the image or signal from the spatial domain to the frequency domain using the Fast Fourier Transform (FFT) or another appropriate method. This step is essential for applying the notch filter in the frequency domain.'},
        {'title': '5) Filter Application',
            'description': 'Apply the designed notch filter(s) in the frequency domain to attenuate the unwanted frequency components. This can be achieved by multiplying the Fourier transform of the image or signal by the notch filter(s).'},
        {'title': '6) Inverse Transform',
            'description': 'After applying the notch filter(s) in the frequency domain, perform the inverse Fourier Transform to return the data to the spatial domain. This will give you the filtered image or signal.'},
        {'title': '7) Quality Assessment', 'description': 'Evaluate the effectiveness of the notch filtering by assessing the filtered image or signal. Use relevant quality metrics to ensure that the unwanted frequency components are sufficiently removed while the essential features are preserved.'},
        {'title': '8) Iterative Refinement (Optional)', 'description': 'If the initial filtering results are unsatisfactory or if there are multiple unwanted frequencies to eliminate, you may need to iterate the process, revisiting steps 3 to 7 with different filter parameters or additional filters.'}
    ]

    code = [
        {'comment': '', 'code': ''}
    ]
    return render_template("notch_filter.html", data=data, workflowtitle="Brief overview of how Gamma_correction Works", workflows=workflows, code=code)

@bp.route("/notch_filter_output", methods=['POST'])
def notch_filter_output():
    if request.method == 'POST':
        if 'notch-input-image-file' in request.files:
            file = request.files['notch-input-image-file']
            img_dir = 'assets/uploads/filters/notch_filter/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.notch_filter(img_dir)
            data = {
                'img_url': img_path,
                'notch_filter' : output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/notch_filter.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'notch_filter' : output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'
        
        
@bp.route("/adaptive_filter", methods=['GET'])
def adaptive_filter_temp():
    data = {
        'title': 'Adaptive Filtering',
        'def': 'Adaptive filters adjust their filter coefficients based on local image characteristics, providing better noise reduction and edge preservation.'
    }

    workflows = [
        {'title': '1) Image Preprocessing', 'description': 'Start with acquiring and preprocessing the image. Preprocessing may include resizing, color space conversion, and noise reduction if necessary. Ensure that the image is in a suitable format for adaptive filtering.'},
        {'title': '2) Parameter Selection',
            'description': 'Choose or define the parameters for the adaptive filtering algorithm. These parameters may include filter size, the shape of the kernel, and the type of adaptive filtering method (e.g., mean, median, or bilateral).'},
        {'title': '3) Kernel Definition',
            'description': 'Define the local neighborhood (kernel) that will be used for filtering. The size and shape of the kernel should be selected based on the characteristics of the noise and the desired level of local adaptation.'},
        {'title': '4) Sliding Window or Patch Processing',
            'description': 'Adaptive filtering is typically applied in a sliding window or patch-based approach. A window or patch moves over the image, and for each position, local statistics are computed within the kernel.'},
        {'title': '5) Local Statistics Calculation', 'description': 'Calculate local statistics within the kernel for each position, such as the local mean, variance, or other suitable measures of local image properties. These statistics serve as the basis for the filtering process.'},
        {'title': '5) Filtering', 'description': 'Apply the adaptive filtering algorithm to each position in the image using the local statistics. The filter output at each position depends on the local information, and it can include the weighted average of pixel values or other operations.'},
        {'title': '6) Edge Preservation', 'description': 'Depending on the application, consider using edge-preserving filtering techniques in adaptive filtering to avoid blurring edges and fine details. Bilateral and anisotropic filters are examples of such techniques.'},
        {'title': '7) Result Analysis', 'description': 'Assess the results of the adaptive filtering. Use quality metrics like PSNR, SSIM, or visual inspection to determine if the filtering has achieved the desired enhancement while suppressing noise and artifacts.'},
        {'title': '8) Iterative Refinement (Optional)', 'description': 'If the initial filtering results are not satisfactory, you may consider iterating the process by revisiting steps 2 to 8 with different parameter settings or using alternative adaptive filtering methods.'},
        {'title': '9) Post-Processing (Optional)', 'description': 'Depending on the application, you may perform additional post-processing steps, such as contrast stretching, sharpening, or color correction to further enhance the image.'}
    ]

    code = [
        {'comment': '', 'code': ''}
    ]
    return render_template("adaptive_filter.html", data=data, workflowtitle="Brief overview of how Adaptive filter Works", workflows=workflows, code=code)

@bp.route("/adpative_filter_output", methods=['POST'])
def adpative_filter_output():
    if request.method == 'POST':
        if 'adaptive-input-image-file' in request.files:
            file = request.files['adaptive-input-image-file']
            img_dir = 'assets/uploads/filters/adaptivefilter/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.adaptive_filter(img_dir)
            data = {
                'img_url': img_path,
                'Adaptive_filter': output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/adaptive_filter.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'Adaptive_filter': output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'
        
@bp.route("/non_local_means_filter", methods=['GET'])
def non_local_means_filter_temp():
    data = {
        'title': 'Non-Local Means (NLM) Denoising',
        'def': 'NLM filters are used to remove noise while preserving fine details by considering similarities between image patches.'
    }

    workflows = [
        {'title': 'Image Preprocessing', 'description': 'Start with the acquisition and preparation of the noisy image. Ensure that the image is appropriately formatted and normalized, if necessary.'},
        {'title': 'Parameter Selection',
            'description': 'Determine key parameters for the NLM algorithm, such as the search window size, the patch size, and the level of filtering (e.g., intensity or color). Selecting these parameters is crucial for the effectiveness of the denoising process.'},
        {'title': 'Patch Extraction', 'description': 'Divide the image into overlapping patches. These patches will serve as the local neighborhoods from which similarities will be calculated.'},
        {'title': 'Similarity Calculation', 'description': 'For each patch in the image, compare it to all other patches within a search window. Calculate the similarity between patches using metrics like the squared Euclidean distance or other suitable similarity measures.'},
        {'title': 'Weight Calculation', 'description': 'Use the calculated similarities to assign weights to the patches in the search window. Patches that are more similar to the target patch receive higher weights. These weights represent the importance of each patch in the filtering process.'},
        {'title': 'Filtering', 'description': 'For each patch in the image, calculate a weighted average of all patches in the search window. This weighted average effectively replaces the noisy pixel value in the target patch. Repeat this process for all patches in the image.'},
        {'title': 'Aggregation', 'description': 'Reconstruct the filtered image by aggregating the results from the previous step. You can use techniques like overlapping patches and weighted averaging for this purpose.'},
        {'title': 'Post-Processing (Optional)', 'description': 'Depending on the results and the specific requirements of your application, you may perform additional post-processing steps, such as contrast stretching or sharpening.'},
        {'title': 'Quality Assessment',
            'description': 'Evaluate the effectiveness of the NLM denoising algorithm by using appropriate quality metrics, such as Peak Signal-to-Noise Ratio (PSNR), Structural Similarity Index (SSIM), or visual inspection. This step is essential to ensure that noise reduction does not cause the loss of essential image details or introduce artifacts.'}
    ]

    code = [
        {'comment': '', 'code': ''}
    ]
    return render_template("non_local_means_filter.html", data=data, workflowtitle="Brief overview of how Non Local Means Filter Works", workflows=workflows, code=code)

@bp.route("/non_local_mean_filter_output", methods=['POST'])
def non_local_mean_filter_output():
    if request.method == 'POST':
        if 'non-local-means-input-image-file' in request.files:
            file = request.files['non-local-means-input-image-file']
            img_dir = 'assets/uploads/filters/non_local_means_filters/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.non_local_mean_filter(img_dir)
            data = {
                'img_url': img_path,
                'non_local_mean' : output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/non_local_means_filter.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'non_local_mean' : output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'

@bp.route("/unsharp_mask_filters", methods=['GET'])
def unsharp_mask_filters_temp():
    data = {
        'title': 'Unsharp Masking',
        'def': 'Unsharp masking combines the original image with a blurred version of itself to enhance edges and fine details. It"s useful for image sharpening.'
    }

    workflows = [
        {'title': '1) Image Preprocessing', 'description': 'Start with the acquisition and preprocessing of the input image. Ensure that you have a clear understanding of the image and its characteristics. Basic preprocessing may involve resizing, color space conversion, or noise reduction.'},
        {'title': '2) Image Blurring', 'description': 'Create a blurred version of the original image. The most common blurring filters used for this purpose are Gaussian or median filters. The choice of the blurring filter and the kernel size will affect the degree of sharpening and smoothing.'},
        {'title': '3) High-Pass Image Creation', 'description': 'Subtract the blurred image from the original image to create a high-pass filtered image. This high-pass image contains the edges and fine details that you want to enhance.'},
        {'title': '4) Amplification of High Frequencies',
            'description': 'The high-pass image often has a narrow intensity range. To enhance it, you can amplify the high-frequency components by multiplying the high-pass image with a gain factor (k) greater than 1. This factor is a key parameter to control the degree of sharpening.'},
        {'title': '5) Addition to Original Image', 'description': 'Add the amplified high-pass image back to the original image to obtain the sharpened image. This process enhances the edges and details while retaining the overall structure and color of the original image.'},
        {'title': '6) Parameter Selection and Experimentation',
            'description': 'Choose appropriate parameters such as the blurring filter, kernel size, and gain factor (k). Experiment with different parameter settings to achieve the desired level of sharpening while avoiding artifacts or noise amplification.'},
        {'title': '7) Quality Assessment',
            'description': 'Evaluate the quality of the sharpened image. Use quality metrics like the Structural Similarity Index (SSIM) or Peak Signal-to-Noise Ratio (PSNR) to measure the effectiveness of the unsharp masking. Visual inspection is also crucial.'}
    ]

    code = [
        {'comment': '', 'code': ''}
    ]
    return render_template("unsharp_masking.html", data=data, workflowtitle="Brief overview of how Unsharp Masking Works", workflows=workflows, code=code)

@bp.route("/unsharp_masking_output", methods=['POST'])
def unsharp_masking_output():
    if request.method == 'POST':
        if 'unsharp-masking-input-image-file' in request.files:
            file = request.files['unsharp-masking-input-image-file']
            img_dir = 'assets/uploads/filters/low_pass_filters/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.unsharp_masking(img_dir)
            data = {
                'img_url': img_path,
                'unsharp_masking' : output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/unsharp_masking.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'unsharp_masking' : output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'
        
@bp.route("/low_pass_filter", methods=['GET'])
def low_pass_filter_temp():
    data = {
        'title': 'Low-Pass Filtering',
        'def': 'Low-pass filters, like Gaussian or mean filters, reduce high-frequency components, smoothing the image and suppressing noise.'
    }

    workflows = [
        {'title': 'Image Preprocessing', 'description': 'Start with acquiring and preprocessing the input image. Ensure that the image is properly formatted and adjusted for any specific requirements of the filtering algorithm. This may include resizing, color space conversion, and noise removal.'},
        {'title': 'Select the Low-Pass Filter', 'description': 'Choose an appropriate low-pass filter based on the specific characteristics of your image and the filtering objectives. Common choices include Gaussian filters, mean filters, and Butterworth filters. The choice depends on the trade-off between noise reduction and detail preservation.'},
        {'title': 'Kernel Size and Parameters', 'description': 'Determine the size of the filter kernel and its parameters, such as the standard deviation for a Gaussian filter or the order and cut-off frequency for a Butterworth filter. These parameters affect the extent of filtering and must be carefully selected based on the specific image and noise characteristics.'},
        {'title': 'Filter Design and Implementation',
            'description': 'Design and implement the selected filter. Convolve the filter kernel with the image using convolution operations, considering boundary handling methods (e.g., zero-padding or border replication) to handle the edges of the image.'},
        {'title': 'Normalization (Optional)', 'description': 'Some filters may require normalization to ensure that the resulting image has a consistent brightness level. This step ensures that the overall image intensity is preserved after filtering.'},
        {'title': 'Post-Filtering Processing (Optional)', 'description': 'Depending on the application and the characteristics of the image, you may apply additional post-filtering processing, such as contrast stretching, intensity scaling, or gamma correction, to adjust the filtered image"s appearance.'},
        {'title': 'Evaluation and Quality Assessment',
            'description': 'Assess the effectiveness of the low-pass filtering process. Use appropriate quality metrics to evaluate the results. Peak Signal-to-Noise Ratio (PSNR), Structural Similarity Index (SSIM), and visual inspection can be useful for assessing image quality.'}
    ]

    code = [
        {'comment': '', 'code': ''}
    ]
    return render_template("low_pass_filters.html", data=data, workflowtitle="Brief overview of how Low pass Filter Works", workflows=workflows, code=code)

@bp.route("/low_pass_filter_output", methods=['POST'])
def low_pass_filter_output():
    if request.method == 'POST':
        if 'low-pass-input-image-file' in request.files:
            file = request.files['low-pass-input-image-file']
            img_dir = 'assets/uploads/filters/low_pass_filters/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.low_pass_filter(img_dir)
            data = {
                'img_url': img_path,
                'low_pass_filter' : output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/low_pass_filters.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'low_pass_filter' : output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'
        
@bp.route("/high_pass_filter", methods=['GET'])
def high_pass_filter_temp():
    data = {
        'title': 'High-Pass Filtering',
        'def': 'High-pass filters, such as the Laplacian or gradient filters, enhance the high-frequency components of an image, making edges and details more pronounced.'
    }

    workflows = [
        {'title': 'Image Acquisition and Preprocessing',
            'description': 'Start with the acquisition of the image you want to process. Ensure that the image is properly formatted and preprocessed if necessary (e.g., resizing, noise reduction, or color space conversion).'},
        {'title': 'Kernel Design',
            'description': 'Select or design a high-pass filter kernel. Common kernels include the Laplacian of Gaussian (LoG) filter, the Sobel or Prewitt edge detection filters, and custom-designed kernels.'},
        {'title': 'Kernel Size Selection', 'description': 'Choose an appropriate kernel size, which determines the spatial extent of the filtering operation. The size of the kernel should be proportional to the size of the features you want to emphasize.'},
        {'title': 'Convolution Operation', 'description': 'Apply the selected high-pass filter kernel to the image using convolution. Convolution involves sliding the kernel over the entire image and calculating the weighted sum of pixel values in the kernel"s neighborhood.'},
        {'title': 'Normalization (Optional)', 'description': 'Depending on the specific filter used, you may need to normalize the output image to ensure that the pixel values fall within a specific range (e.g., 0 to 255).'},
        {'title': 'Edge Localization (Optional)', 'description': 'To precisely locate edges in the image, you can apply zero-crossing detection to the filtered image. This technique identifies pixels where the intensity changes sign, indicating the presence of edges.'},
        {'title': 'Enhancement and Post-processing (Optional)', 'description': 'You may adjust the contrast and brightness of the high-pass filtered image to enhance the visibility of edges and fine details. Additionally, you can combine the high-pass filtered image with the original image to create an enhanced version of the original.'},
        {'title': 'Quality Assessment',
            'description': 'Evaluate the results using appropriate quality metrics such as edge sharpness, signal-to-noise ratio (SNR), or visual inspection to ensure that the high-pass filtering has achieved the desired outcome.'},
        {'title': 'Iterative Refinement (Optional)', 'description': 'If the initial results are unsatisfactory, consider experimenting with different kernel designs, sizes, and post-processing steps to fine-tune the enhancement.'}
    ]

    code = [
        {'comment': '', 'code': ''}
    ]
    return render_template("high_pass_filter.html", data=data, workflowtitle="Brief overview of how High Pass Filter Works", workflows=workflows, code=code)

@bp.route("/high_pass_filter_output", methods=['POST'])
def high_pass_filter_output():
    if request.method == 'POST':
        if 'high-pass-input-image-file' in request.files:
            file = request.files['high-pass-input-image-file']
            img_dir = 'assets/uploads/filters/highpassFilter/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.high_pass_filter(img_dir)
            data = {
                'img_url': img_path,
                'high_pass_filter' : output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/high_pass_filter.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'high_pass_filter' : output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'

@bp.route("/laplacian_filter", methods=['GET'])
def laplacian_filter_temp():
    data = {
        'title': 'Laplacian Filtering',
        'def': 'The Laplacian filter enhances edges and fine details by emphasizing high-frequency components. It"s often followed by zero-crossing detection for edge localization.'
    }

    workflows = [
        {'title': 'Image Acquisition and Preprocessing', 'description': 'Start by acquiring the image you want to process. Ensure that the image is in a suitable format and resolution for your task. You may need to perform some preprocessing steps, such as resizing or color space conversion, before applying Laplacian filtering.'},
        {'title': 'Kernel Selection',
            'description': 'Choose an appropriate Laplacian kernel for your filtering task. Common options include the standard 3x3 Laplacian kernel, the 5x5 Laplacian of Gaussian (LoG) kernel, or more complex variants. The choice of kernel affects the filtering results, with larger kernels providing a wider edge detection response.'},
        {'title': 'Image Conversion',
            'description': 'Convert the image to grayscale if it"s in color. Laplacian filtering is often applied to single-channel (grayscale) images.'},
        {'title': 'Convolution', 'description': 'Perform convolution between the chosen Laplacian kernel and the grayscale image. You can use standard convolution techniques, such as the "full" or "valid" convolution, depending on your requirements. This step calculates the Laplacian response of the image.'},
        {'title': 'Laplacian Response Visualization', 'description': 'Visualize the Laplacian response to see the edges and details detected in the image. You can create an output image or overlay the Laplacian response on the original image to better understand the detected features.'},
        {'title': 'Thresholding', 'description': 'Apply thresholding to the Laplacian response to extract edges or features. Pixels with responses above a certain threshold are considered part of an edge. Experiment with different threshold values to control the level of detail extraction.'},
        {'title': 'Post-processing (Optional)', 'description': 'Depending on the application, you might perform post-processing steps, such as morphological operations (dilation or erosion), to refine the detected edges or enhance the final result.'},
        {'title': 'Feature Extraction or Image Enhancement',
            'description': 'The Laplacian response can be used for various purposes, such as feature extraction, image enhancement, or object detection. Consider how the filtered image will be used in your specific application.'},
        {'title': 'Quality Assessment', 'description': 'Evaluate the performance of the Laplacian filtering by using appropriate quality metrics. For edge detection tasks, metrics like precision and recall can be useful for assessing the accuracy of edge detection.'}
    ]

    code = [
        {'comment': '', 'code': ''}
    ]
    return render_template("laplacian_filter.html", data=data, workflowtitle="Brief overview of how Laplacian Filter Works", workflows=workflows, code=code)

@bp.route("/laplacian_filter_output", methods=['POST'])
def laplacian_filter_output():
    if request.method == 'POST':
        if 'laplacian-input-image-file' in request.files:
            file = request.files['laplacian-input-image-file']
            img_dir = 'assets/uploads/filters/laplacian_filter/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.laplacian_filter(img_dir)
            data = {
                'img_url': img_path,
                'laplacian_filter' : output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/laplacian_filter.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'laplacian_filter' : output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'
        
# @bp.route("/median_filter", methods=['GET'])
# def median_filter_temp():
#     data = {
#         'title': 'Median Filtering',
#         'def': 'Median filtering replaces each pixel with the median value of its neighborhood, making it effective for removing salt-and-pepper noise while preserving edges.'
#     }

#     workflows = [
#         {'title': 'Image Acquisition and Preprocessing',
#             'description': 'Begin with the acquisition of the noisy image. Ensure it is in a suitable format for processing. You may want to convert the image to grayscale if it is in color.'},
#         {'title': 'Noise Characterization', 'description': 'Analyze the noise in the image to determine the extent and characteristics of salt-and-pepper noise. Understanding the nature of the noise helps in selecting the right filter size.'},
#         {'title': 'Filter Selection',
#             'description': 'Choose an appropriate filter size (usually a square or rectangular neighborhood) for the median filter. The filter size should be large enough to cover noise spikes but not too large to blur image details.'},
#         {'title': 'Image Partitioning (Optional)', 'description': 'Divide the image into non-overlapping blocks or apply median filtering locally if there are variations in noise characteristics across the image.'},
#         {'title': 'Noise Reduction', 'description': 'Apply the median filter to each block or the entire image. For each pixel, the filter computes the median value of the pixel intensities in its neighborhood. The median value replaces the central pixel value.'},
#         {'title': 'Post-processing (Optional)', 'description': 'Depending on the results and the specific requirements of your application, you may perform additional post-processing steps, such as contrast enhancement or further noise reduction.'},
#         {'title': 'Quality Assessment', 'description': 'Evaluate the effectiveness of the median filtering by using appropriate quality metrics or visual inspection. Compare the filtered image with the noisy original to ensure that noise has been effectively reduced while preserving image details.'},
#         {'title': 'Iterative Refinement (Optional)', 'description': 'If the initial median filtering results are unsatisfactory, you can experiment with different filter sizes and configurations or consider alternative noise reduction methods.'}
#     ]

#     code = [
#         {'comment': '', 'code': ''}
#     ]
#     return render_template("median_filter.html", data=data, workflowtitle="Brief overview of how Median Filter Works", workflows=workflows, code=code)


@bp.route("/average_filter", methods=['GET'])
def average_filter_temp():
    data = {
        'title': 'Average Filter',
        'def': 'The average filter replaces each pixel with the average of its neighboring pixels within a defined window (kernel). It smooths the image, reducing noise but also blurring edges.'
    }

    workflows = [
        {'title': 'Image Import and Preprocessing', 'description': 'Begin by importing the image you want to process. Ensure that the image is in a format suitable for your image processing environment or library. If necessary, perform any preliminary preprocessing tasks like resizing, grayscale conversion, or color space conversion.'},
        {'title': 'Kernel Design', 'description': 'Decide on the size of the kernel or the neighborhood that you want to use for averaging. Common sizes are 3x3, 5x5, or 7x7 kernels. Larger kernels provide stronger smoothing but may blur fine details.'},
        {'title': 'Image Padding', 'description': 'To apply the kernel to edge pixels, you"ll need to pad the image. There are various methods for padding, such as zero-padding or mirror padding. Padding ensures that the kernel can be centered on all image pixels.'},
        {'title': 'Filter Implementation', 'description': 'Implement the average filter by iterating over each pixel in the image and computing the average of pixel values within the defined kernel window. The average is calculated by summing the pixel values and dividing by the total number of pixels in the kernel.'},
        {'title': 'Output Image Generation',
            'description': 'Create a new image (output image) that will store the results of the average filtering. The output image should have the same dimensions as the input image.'},
        {'title': 'Filter Application', 'description': 'Apply the average filter to each pixel in the input image by using the computed average values from the previous step. Replace the pixel value in the output image with the calculated average.'},
        {'title': 'Handling Image Borders', 'description': 'For pixels near the image borders, the kernel may extend beyond the image boundaries. You can handle this by using different border-pixel strategies, such as omitting the edge pixels, extending the image by reflection, or wrapping around.'},
        {'title': 'Normalization (Optional)', 'description': 'You may choose to normalize the output image if the kernel sum is not equal to one. Normalization ensures that the output image has the same overall brightness as the input image.'},
        {'title': 'Output Image Display', 'description': 'Display or save the resulting smoothed image to visualize the effects of the average filtering. Consider using visualization tools or libraries compatible with your image processing environment.'}
    ]

    code = [
        {'comment': '', 'code': ''}
    ]
    return render_template("Average_filter.html", data=data, workflowtitle="Brief overview of how Average Filter Works", workflows=workflows, code=code)

@bp.route("/average_filter_output", methods=['POST'])
def average_filter_output():
    if request.method == 'POST':
        if 'average-input-image-file' in request.files:
            file = request.files['average-input-image-file']
            img_dir = 'assets/uploads/filters/average_filters/'
            os.makedirs(img_dir, exist_ok=True)
            img_path = os.path.join(img_dir, file.filename)
            file.save(img_path)
            const = Filters(img_path)
            output_img = const.average_filter(img_dir)
            data = {
                'img_url': img_path,
                'Average_filter' : output_img
            }
            return {
                'template': render_template('OutputCollapse/filters/Average_filter.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'Average_filter' : output_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'
from flask import Blueprint, render_template, redirect, url_for, request, session
from src.Enhancement import Enhancement
import os

bp = Blueprint("enhancement", __name__, url_prefix="/enhancement")


@bp.route("/Histogram_Equalization", methods=['GET'])
def Histogram_Equalization_temp():
    data = {
        'title': 'Histogram Equalization',
        'def': "Histogram Equalization is a technique used in image processing to enhance the contrastof an image by redistributing the intensity levels of pixels in such a way that the histogram of the resulting image is approximately uniform. This can be particularly useful when dealing with images that have poor contrast, making it easier to identify details and features.",
    }
    workflows = [
        {'title': '1. Histogram', 'description': 'Start with an input grayscale image and compute its histogram. The histogram represents the frequency of each pixel intensity level in the image. It shows how many pixels have a particular intensity.'},
        {'title': '2. Cumulative Distribution Function (CDF)', 'description': '                    Calculate the Cumulative Distribution Function (CDF) from the histogram. The CDF represents the cumulative sum of histogram values, normalized to the range of pixel intensities (typically 0 to 255 in an 8-bit image).'},
        {'title': '3. Transformation Function', 'description': 'Create a transformation function that maps the original pixel intensities to new values.This function is derived from the CDF and aims to stretch the intensity levels to cover the full range evenly.'},
        {'title': '4. Pixel Mapping', 'description': 'Apply the transformation function to each pixel in the original image. This maps the original pixel values to new values, effectively redistributing the intensities.'},
        {'title': '5. Output Image', 'description': 'The result is an output image where the pixel intensities are adjusted to have a more uniform distribution. Dark and light areas are enhanced, and details become more visible.'},
        {'title': '6. Enhanced Contrast', 'description': 'The output image has improved contrast and is visually more appealing. It brings out subtle details and makes it easier to distinguish objects in the image.'}
    ]

    return render_template("Histogram_Equalization.html", data=data, workflowtitle="Brief overview of how Histogram Equalization Works", workflows=workflows)


@bp.route("/Histogram_Equalization_modal", methods=['GET'])
def Histogram_Equalization_modal():
    return render_template("modals\histo.html")


@bp.route("/Histogram_Equalization_output", methods=['POST'])
def Histogram_Equalization_output():
    if request.method == 'POST':
        if 'histogram-input-image-file' in request.files:
            file = request.files['histogram-input-image-file']
            img_path = f'assets/uploads/enhancement/histogram/{file.filename}'
            file.save(os.path.join(img_path))
            enhancement = Enhancement(img_path)
            hist_img = enhancement.histogram()
            data = {
                'img_url': img_path,
                'histo_img': hist_img
            }
            return {
                'template': render_template('OutputCollapse/enhancement/histogram.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'histo_img': hist_img.replace("assets", "")
            }
        else:
            return 'No file part in the request'


@bp.route("/Gamma_correction", methods=['GET'])
def Gamma_correction_temp():
    data = {
        'title': 'Gamma Correction Technique',
        'def': 'Edge detection is a fundamental technique in image processing that is used to identify the boundaries of objects within an image. It works by highlighting abrupt changes in pixel intensity, which often correspond to edges in the image. There are several algorithms for edge detection, with the Canny edge detector being one of the most widely used.'
    }

    workflows = [
        {'title': '1. Canny Edge Detector',
            'description': 'A widely-used algorithm that finds edges by looking for areas of rapid change in intensity.'},
        {'title': '2. Sobel Operator',
         'description': 'Uses convolution to compute the gradient of the image, highlighting areas of rapid intensity change.'},
        {'title': '3. Prewitt Operator',
         'description': 'Similar to Sobel, used for gradient computation.'},
        {'title': '4. Laplacian of Gaussian (LoG)',
         'description': 'Applies Gaussian smoothing followed by the Laplacian operator to detect edges.'},
        {'title': '5. Zero Crossing Detector',
         'description': 'Identifies zero crossings in the second derivative of the image to find edges.'}
    ]

    return render_template("Gamma_correction.html", data=data, workflowtitle="Brief overview of how Gamma_correction Works", workflows=workflows)


@bp.route("/Gamma_correction_output", methods=['POST'])
def Gamma_correction_output():
    if request.method == 'POST':
        if 'gamma-correction-input-image-file' in request.files:
            file = request.files['gamma-correction-input-image-file']
            img_path = f'assets/uploads/enhancement/gamma_correction/{file.filename}'
            file.save(os.path.join(img_path))
            enhancement = Enhancement(img_path)
            gamm_img = enhancement.gamma_correction()
            data = {
                'img_url': img_path,
                'gamm_img': gamm_img
            }

            return {
                'template': render_template('OutputCollapse/enhancement/gamma_correction.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'gamm_img': gamm_img.replace("assets", "")
            }

        else:
            return 'No file part in the request'


@bp.route("/Contrast_Stretching", methods=['GET'])
def Contrast_Stretching_temp():
    data = {
        'title': 'Contrast stretching Technique',
        'def': 'Contrast stretching, also known as contrast enhancement or normalization, is a technique used in image processing to improve the visibility of details in an image by expanding the range of pixel values. It"s particularly useful when an image has poor contrast, meaning that the difference between the darkest and brightest pixels is limited. Contrast stretching works by linearly stretching the pixel values so that the minimum pixel value becomes darker, and the maximum pixel value becomes brighter, while maintaining the relative differences between the other pixel values.'
    }

    workflows = [
        {'title': '1. Find the Minimum and Maximum Pixel Values',
            'description': 'First, you find the minimum and maximum pixel values in the input image.'},
        {'title': '2. Define the New Minimum and Maximum Values',
         'description': 'Decide on the desired minimum and maximum values for the output image. Typically, the minimum is set to 0, and the maximum is set to 255 for an 8-bit image. These values define the new range for pixel values.'},
        {'title': '3. Apply Contrast Stretching',
         'description': 'For each pixel in the input image, apply the following formula to stretch the pixel value to the new range:'},
        {'title': '4. Normalize', 'description': 'Optionally, you can normalize the pixel values to ensure the corrected image maintains the same dynamic range as the original.'}
    ]


    return render_template("Contrast_Stretching.html", data=data, workflowtitle="Brief overview of how Contrast_Stretching Works", workflows=workflows)


@bp.route("/Contrast_Stretching_output", methods=['POST'])
def Contrast_Stretching_output():
    if request.method == 'POST':
        if 'contrast-strching-input-image-file' in request.files:
            file = request.files['contrast-strching-input-image-file']
            img_path = f'assets/uploads/enhancement/contrast_strching/{file.filename}'
            file.save(os.path.join(img_path))
            enhancement = Enhancement(img_path)
            contrast_img = enhancement.contrast_strching()
            data = {
                'img_url': img_path,
                'contrast_img': contrast_img
            }

            return {
                'template': render_template('OutputCollapse/enhancement/contrast_strching.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'contrast_img': contrast_img.replace("assets", "")
            }

        else:
            return 'No file part in the request'


@bp.route("/Spatial_filtering", methods=['GET'])
def Spatial_filtering_temp():
    data = {
        'title': 'Spatial filter Technique',
        'def': 'Spatial filtering is a fundamental image processing technique used to enhance or suppress specific features in an image by applying a filter, also known as a kernel or mask, to each pixel in the image. The filter is a small matrix or window that slides over the image, and for each position, it computes a weighted sum of the pixel values within the window. This weighted sum is assigned to the corresponding pixel in the output image.'
    }

    workflows = [
        {'title': '1. Image Representation','description': 'The input image is usually represented as a 2D matrix, where each element represents the intensity or color value of a pixel.'},
        {'title': '2. Define the Filter Kernel:', 'description': 'You need to define a filter kernel, which is a smaller 2D matrix. The size and values of this kernel depend on the specific image processing task you want to perform. For example, to perform blurring,you might use a kernel that averages the pixel values in its neighborhood.'},
        {'title': '3. Convolution Operation', 'description': 'The convolution operation involves sliding the filter kernel over the entire input image. At each position, the filter is centered on a pixel, and a weighted sum of the pixel values within the kernel"s neighborhood is computed. The result of this computation is assigned to the corresponding pixel in the output image.'},
        {'title': '4. Border Handling', 'description': 'During convolution, the filter kernel may extend beyond the borders of the input image. Various techniques, such as zero-padding or mirroring, can be used to handle these border pixels.'},
        {'title': '5.Output Image', 'description': 'After applying the filter to every pixel in the input image, you get a new image called the filtered image or spatially filtered image. This image may highlight certain features or characteristics based on the chosen filter kernel.'}
    ]

    return render_template("Spatial_filtering.html", data=data, workflowtitle="Brief overview of how Spatial_filtering Works", workflows=workflows)


@bp.route("/Spatial_filtering_output", methods=['POST'])
def Spatial_filtering_output():
    if request.method == 'POST':
        if 'spatial-filter-input-image-file' in request.files:
            file = request.files['spatial-filter-input-image-file']
            img_path = f'assets/uploads/enhancement/spatial_filter/{file.filename}'
            file.save(os.path.join(img_path))
            enhancement = Enhancement(img_path)
            spatial_filter = enhancement.spatial_filter()
            data = {
                'img_url': img_path,
                'spatial_filter': spatial_filter
            }

            return {
                'template': render_template('OutputCollapse/enhancement/spatial_filtering.html', data=data),
                'img_url': img_path.replace("assets", ""),
                'spatial_filter': spatial_filter.replace("assets", "")
            }

        else:
            return 'No file part in the request'

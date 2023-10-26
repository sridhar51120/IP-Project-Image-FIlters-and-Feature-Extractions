from flask import Blueprint, render_template, redirect, url_for, request, session
from src.Restoration import Restoration
import os

bp = Blueprint("restoring", __name__, url_prefix="/restoring")

@bp.route("/deblur",methods=['GET'])
def deblur_temp():
   data = {
    'title' : 'Debluring Technique',
    'def' : 'Deblurring is a common problem in image processing, and there are various techniques to address it. In this response, I"ll provide you with a basic workflow for deblurring an image using Python and OpenCV. Keep in mind that deblurring can be a complex task, and the success of the process depends on factors like the type of blur, the quality of the original image, and the chosen deblurring method.'
   }

   workflows = [
    {'title': '1) Image Acquisition and Preprocessing','description':'Start with the acquisition of the blurred image. Ensure the image is of the highest quality possible.Apply basic preprocessing steps like noise reduction, contrast enhancement, and resizing as necessary.'},
    {'title': '2) Blur Type Analysis','description':'Determine the type of blur present in the image. Common types include motion blur, out-of-focus blur, and defocus blur. The chosen deblurring method may vary based on the blur type.'},
    {'title': '3) Point Spread Function (PSF) Estimation','description':'Estimate the PSF, which characterizes the blur in the image. This is crucial for most deblurring techniques.PSF estimation can be done through various methods, including blind deconvolution or using reference objects with known shapes.'},
    {'title': '4) Deblurring Techniques','description':'Select an appropriate deblurring method based on the blur type and the available resources. Common deblurring techniques include: 1) Wiener Filter, 2) Regularized Inverse Filtering,3) Blind Deconvolution,4) Deep Learning-based Methods,5) Iterative Methods'},
    {'title': '5) Parameter Tuning','description':'Depending on the chosen deblurring method, there might be several parameters to adjust. Fine-tune these parameters for optimal results.'},
    {'title': '6) Dealing with Noise','description':'Address noise in the image during the deblurring process, as deblurring can amplify noise. This can involve denoising techniques in conjunction with deblurring.'},
    {'title': '7) Evaluation:','description':'Assess the quality of the deblurred image using relevant metrics, such as PSNR (Peak Signal-to-Noise Ratio) and SSIM (Structural Similarity Index), or through visual inspection.'},
    {'title': '8) Post-processing','description':'Further enhance the deblurred image by performing post-processing operations like contrast adjustment, sharpening, and color correction.'},
    {'title': '9) Validation and Iteration','description':'Verify the results and, if necessary, iterate through the process with adjustments to parameters or methods to achieve better deblurring.'},
    {'title': '10) Output and Application','description':'Use the deblurred image for its intended application, whether it"s for scientific analysis, medical diagnosis, or any other purpose.'}
    ]

   code = [
      {'comment' : '# Import Cv2 Library', 'code' : 'import cv2'},
      {'comment' : '# Load the image', 'code' : 'image = cv2.imread("input_image.jpg", cv2.IMREAD_GRAYSCALE)'},
      {'comment' : '# Convert Image to Grayscale', 'code' : 'blurred_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)'},
      {'comment' : '# Specify the kernel size for blurring (you may need to adjust this)', 'code' : 'kernel_size = 5'},
      {'comment' : '# Apply Gaussian blur to the grayscale image', 'code' : 'blurred_gray = cv2.GaussianBlur(blurred_gray, (kernel_size, kernel_size), 0)'},
      {'comment' : '# Specify the Wiener filter parameters (you may need to adjust these)', 'code' : 'deblur_image = cv2.deconvolve(blurred_gray, kernel_size, 0.01)'},
      {'comment' : '# Display the Deblurred Image', 'code' : 'cv2.imshow("Deblurred Image", deblur_image)'},
      {'comment' : '', 'code' : 'cv2.waitKey(0)'},
      {'comment' : '', 'code' : 'cv2.destroyAllWindows()'}
   ]
   return render_template("deblur.html",data=data,workflowtitle="Brief overview of how Deblur Works",workflows=workflows,code=code)

@bp.route("/deblur_output",methods=['POST'])
def deblur_output():
      if request.method == 'POST':
         if 'deblur-input-image-file' in request.files:
            file = request.files['deblur-input-image-file']
            img_path = f'assets/uploads/restoration/deblur/{file.filename}'
            file.save(os.path.join(img_path)) 
            restoration = Restoration(img_path)
            deblur_img = restoration.debluring()
            
            data = {
                  'img_url': img_path,
                  'deblur_img' : deblur_img
               }
            
            return {
               'template' : render_template('OutputCollapse/restoring/deblur.html',data = data),
               'img_url': img_path.replace("assets", ""),
               'deblur_img' : deblur_img.replace("assets", "")
               }
         else:
            return 'No file part in the request'

@bp.route("/in_paint",methods=['GET'])
def in_paint_temp():
   data = {
    'title' : 'In Painting Technique',
    'def' : 'Image inpainting is a technique in image processing that involves filling in missing or damaged regions of an image with plausible content. This can be useful for repairing damaged photographs, removing unwanted objects or text, or even generating realistic content in the missing regions of an image. Inpainting is often used in restoration and image editing tasks.'
   }

   workflows = [
      {'title': '1. Problem Definition','description':'Define the inpainting problem, specifying the missing or damaged regions in the input image.Determine the scope and scale of inpainting, i.e., whether it"s a small scratch or a large missing area.'},
      {'title': '2. Data Preparation','description':'Acquire and preprocess the input image, ensuring that it"s appropriately formatted and any noise or artifacts are removed.'},
      {'title': '3. Mask Creation','description':'Create a binary mask that represents the damaged or missing regions in the image. Inpainting will be performed in the areas covered by this mask.'},
      {'title': '4. Feature Extraction','description':'Extract relevant features or contextual information from the surrounding regions of the image. This can include color, texture, and structural information.'},
      {'title': '5. Algorithm Selection','description':'Choose an inpainting algorithm based on the nature of the problem and the available resources. Common inpainting algorithms include:  1) Patch-Based Inpainting. 2) Texture Synthesis.  3) Deep Learning-based Inpainting.'},
      {'title': '6. Inpainting Process','description':'Apply the selected inpainting algorithm to the image with the damaged regions, using the mask created earlier.'},
      {'title': '7. Post-Processing','description':'Perform any necessary post-processing steps to enhance the inpainted results. This may include smoothing, blending, or adjusting colors to ensure a seamless integration of the inpainted areas with the original image.'},
      {'title': '8. Evaluation','description':'Assess the quality of the inpainting results using appropriate evaluation metrics. Common metrics include structural similarity (SSIM), peak signal-to-noise ratio (PSNR), and human visual assessment.'},
      {'title': '9. Iterative Refinement (Optional)','description':'If the inpainting results are not satisfactory, consider iterative refinement using additional inpainting passes or fine-tuning of parameters.'},
      {'title': '10. Visualization and Output','description':'Generate the final inpainted image and save or display it as needed.'}
      ]

   code = [
      {'comment' : '# Import Cv2 Library', 'code' : 'import cv2'},
      {'comment' : '# Load the image', 'code' : 'image = cv2.imread("input_image.jpg", cv2.IMREAD_GRAYSCALE)'},
      {'comment' : '# Create a mask (white rectangle) to inpaint a specific region', 'code' : 'mask = np.zeros_like(image)'},
      {'comment' : '', 'code' : 'cv2.rectangle(mask, (100, 100), (300, 300), (255, 255, 255), thickness=cv2.FILLED)'},
      {'comment' : '# Display the mask (optional)', 'code' : 'cv2.imshow("Mask", mask)'},
      {'comment' : '', 'code' : 'cv2.waitKey(0)'},
      {'comment' : '', 'code' : 'cv2.destroyAllWindows()'}
   ]
   return render_template("in_paint.html",data=data,workflowtitle="Brief overview of how In Paint Works",workflows=workflows,code=code)


@bp.route("/in_paint_output",methods=['POST'])
def in_paint_output():
      if request.method == 'POST':
         if 'inpaint-input-image-file' in request.files:
            file = request.files['inpaint-input-image-file']
            img_path = f'assets/uploads/restoration/inpaint/{file.filename}'
            file.save(os.path.join(img_path)) 
            restoration = Restoration(img_path)
            inpaint_img = restoration.inpainting()
            data = {
                  'img_url': img_path,
                  'inpaint_img' : inpaint_img
               }
            
            return {
               'template' : render_template('OutputCollapse/restoring/in_paint.html',data = data),
               'img_url': img_path.replace("assets", ""),
               'inpaint_img' : inpaint_img.replace("assets", "")
               }
         else:
            return 'No file part in the request'

@bp.route("/noise_reduction",methods=['GET'])
def noise_reduction_temp():
   data = {
    'title' : 'Noise reduction Technique',
    'def' : 'Noise reduction is a digital image processing technique used to reduce unwanted artifacts or disturbances in an image, often referred to as "noise." Noise can manifest as random variations in brightness or color in an image and can result from various sources such as electronic sensor limitations, low light conditions, or transmission errors. Reducing noise can enhance the visual quality and clarity of an image.'
   }

   workflows = [
      {'title': '1) Image Preprocessing','description':'Before applying Gaussian filtering, it"s essential to preprocess the image if necessary. This may involve converting the image to grayscale or adjusting its contrast and brightness.'},
      {'title': '2) Filter Size Selection','description':'The most crucial parameter when using Gaussian filters is the filter size (or kernel size). A larger filter size results in a stronger smoothing effect. You need to choose an appropriate filter size based on the characteristics of the image and the specific task. Smaller filters preserve more fine details, while larger filters can remove finer details and noise.'},
      {'title': '3) Standard Deviation (σ) Selection','description':'The standard deviation (σ) determines the spread of the Gaussian distribution and impacts the strength of the filtering. A higher σ results in a wider distribution and stronger smoothing. Lower σ values are used for preserving edges and fine details. Typically, you"ll need to experiment with different σ values to achieve the desired smoothing effect.'},
      {'title': '4) Convolution','description':'Apply the Gaussian filter by convolving the image with the Gaussian kernel. The kernel is generated based on the chosen filter size and σ value. This convolution operation is performed for each pixel in the image.'},
      {'title': '5) Boundary Handling','description':'Decide how to handle the filter when it reaches the image"s boundaries. Common options include zero-padding, wrapping around, or reflecting the image. Your choice can affect the results, especially near the image"s edges.'},
      {'title': '6) Implementation Tools','description':'You can implement Gaussian filtering using various tools and libraries, such as OpenCV, MATLAB, Python (with libraries like NumPy and SciPy), or dedicated image processing software. Choose the tool that best fits your project"s requirements and your familiarity with it.'},
      {'title': '7) Visual Inspection','description':'After applying the Gaussian filter, visually inspect the results to ensure they meet your objectives. You may need to make adjustments to the filter size and σ values if the image is over-smoothed or if important features are lost.'},
      {'title': '8) Iterative Filtering','description':'In some cases, you may need to apply Gaussian filtering iteratively, especially if the image contains high levels of noise. Applying the filter multiple times with gradually increasing σ values can help achieve better noise reduction while preserving important details.'},
      {'title': '9) Post-Processing','description':'Depending on the specific image processing task, you may need to perform additional post-processing steps. For example, if you"re using Gaussian filtering for edge detection, you might apply gradient operators to detect edges more effectively.'},
      {'title': '10) Performance Optimization','description':'For large images or real-time applications, consider optimizing the Gaussian filtering process for speed. This can involve using separable filters or GPU acceleration to improve processing time.'}
      ]

   code = [
      {'comment' : '# Import Cv2 Library', 'code' : 'import cv2'},
      {'comment' : '# Load the image', 'code' : 'image = cv2.imread("input_image.jpg", cv2.IMREAD_GRAYSCALE)'},
      {'comment' : '# Apply median filtering for noise reduction', 'code' : 'filtered_image = cv2.medianBlur(noisy_image, 3)'},
      {'comment' : '# Save the filtered image', 'code' : 'cv2.imwrite("filtered_image.jpg", filtered_image) '},
      {'comment' : '# display the filtered image', 'code' : 'cv2.imshow("Filtered Image", filtered_image)'},
      {'comment' : '', 'code' : 'cv2.waitKey(0)'},
      {'comment' : '','code' : 'cv2.destroyAllWindows()'}
   ]
   return render_template("noise_reduction.html",data=data,workflowtitle="Brief overview of how Noise reduction Works",workflows=workflows,code=code)


@bp.route("/noise_reduction_output",methods=['POST'])
def noise_reduction_output():
      if request.method == 'POST':
         if 'noise-input-image-file' in request.files:
            file = request.files['noise-input-image-file']
            img_path = f'assets/uploads/restoration/noise_reduction/{file.filename}'
            file.save(os.path.join(img_path)) 
            restoration = Restoration(img_path)
            noise_img = restoration.noise_reduction()

            data = {
                  'img_url': img_path,
                  'noise_img' : noise_img
               } 
            return {
               'template' : render_template('OutputCollapse/restoring/noise_reduction.html',data = data),
               'img_url': img_path.replace("assets", ""),
               'noise_img' : noise_img.replace("assets", "")
               }
         else:
            return 'No file part in the request'


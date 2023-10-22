from flask import Blueprint, render_template, redirect, url_for, request, session
from src.Enhancement import Enhancement
import os

bp = Blueprint("enhancement", __name__, url_prefix="/enhancement")


@bp.route("/Histogram_Equalization",methods=['GET'])
def Histogram_Equalization_temp():
   data = {
      'title' : 'Histogram Equalization',
      'def' : "Histogram Equalization is a technique used in image processing to enhance the contrastof an image by redistributing the intensity levels of pixels in such a way that the histogram of the resulting image is approximately uniform. This can be particularly useful when dealing with images that have poor contrast, making it easier to identify details and features.",  
   }
   workflows = [
        {'title': '1. Histogram', 'description': 'Start with an input grayscale image and compute its histogram. The histogram represents the frequency of each pixel intensity level in the image. It shows how many pixels have a particular intensity.'},
        {'title': '2. Cumulative Distribution Function (CDF)', 'description': '                    Calculate the Cumulative Distribution Function (CDF) from the histogram. The CDF represents the cumulative sum of histogram values, normalized to the range of pixel intensities (typically 0 to 255 in an 8-bit image).'},
        {'title': '3. Transformation Function', 'description': 'Create a transformation function that maps the original pixel intensities to new values.This function is derived from the CDF and aims to stretch the intensity levels to cover the full range evenly.'},
        {'title' : '4. Pixel Mapping', 'description' : 'Apply the transformation function to each pixel in the original image. This maps the original pixel values to new values, effectively redistributing the intensities.'},
        {'title' : '5. Output Image', 'description' : 'The result is an output image where the pixel intensities are adjusted to have a more uniform distribution. Dark and light areas are enhanced, and details become more visible.'},
        {'title' : '6. Enhanced Contrast', 'description' : 'The output image has improved contrast and is visually more appealing. It brings out subtle details and makes it easier to distinguish objects in the image.'}
    ]
   code = [
      {'comment' : '# Import Cv2 Library', 'code' : 'import cv2'},
      {'comment' : '# Load the image', 'code' : "original_image = cv2.imread('your_image.jpg', cv2.IMREAD_GRAYSCALE)"},
      { 'comment' : "# Apply histogram equalization", 'code' : "equalized_image = cv2.equalizeHist(original_image)"},
      {'comment':'# Save the equalized image','code': "cv2.imwrite('equalized_image.jpg', equalized_image)"}
   ]
   return render_template("Histogram_Equalization.html",data=data,workflowtitle="Brief overview of how Histogram Equalization Works",workflows=workflows,code=code)

@bp.route("/Histogram_Equalization_modal",methods=['GET'])
def Histogram_Equalization_modal():
   return render_template("modals\histo.html")


@bp.route("/Histogram_Equalization_output",methods=['POST'])
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
                  'histo_img' : hist_img
               }
            return {
               'template' : render_template('InputCollapse/enhancement/histogram.html',data = data),
               'img_url': img_path.replace("assets", ""),
               'histo_img' : hist_img.replace("assets", "")
               }
         else:
            return 'No file part in the request'
         
@bp.route("/Gamma_correction",methods=['GET'])
def Gamma_correction_temp():
   return render_template("Gamma_correction.html")

@bp.route("/Gamma_correction_output",methods=['POST'])
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
                  'gamm_img' : gamm_img
               }
            
            return {
               'template' : render_template('InputCollapse/enhancement/gamma_correction.html',data = data),
               'img_url': img_path.replace("assets", ""),
               'gamm_img' : gamm_img.replace("assets", "")
               }
         
         else:
            return 'No file part in the request'

@bp.route("/Contrast_Stretching",methods=['GET'])
def Contrast_Stretching_temp():
   return render_template("Contrast_Stretching.html")

@bp.route("/Contrast_Stretching_output",methods=['POST'])
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
                  'contrast_img' : contrast_img
               }
            
            return {
               'template' : render_template('InputCollapse/enhancement/contrast_strching.html',data = data),
               'img_url': img_path.replace("assets", ""),
               'contrast_img' : contrast_img.replace("assets", "")
               }
         
         else:
            return 'No file part in the request'

@bp.route("/Spatial_filtering",methods=['GET'])
def Spatial_filtering_temp():
   return render_template("Spatial_filtering.html")
         
@bp.route("/Spatial_filtering_output",methods=['POST'])
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
                  'spatial_filter' : spatial_filter
               }
            
            return { 
               'template' : render_template('InputCollapse/enhancement/spatial_filtering.html',data = data),
               'img_url': img_path.replace("assets", ""),
               'spatial_filter' : spatial_filter.replace("assets", "")
               }
         
         else:
            return 'No file part in the request'

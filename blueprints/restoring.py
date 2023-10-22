from flask import Blueprint, render_template, redirect, url_for, request, session
from src.Restoration import Restoration
import os

bp = Blueprint("restoring", __name__, url_prefix="/restoring")

@bp.route("/deblur",methods=['GET'])
def deblur_temp():
   return render_template("deblur.html")

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
               'template' : render_template('InputCollapse/restoring/deblur.html',data = data),
               'img_url': img_path.replace("assets", ""),
               'deblur_img' : deblur_img.replace("assets", "")
               }
         else:
            return 'No file part in the request'

@bp.route("/in_paint",methods=['GET'])
def in_paint_temp():
   return render_template("in_paint.html")


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
               'template' : render_template('InputCollapse/restoring/in_paint.html',data = data),
               'img_url': img_path.replace("assets", ""),
               'inpaint_img' : inpaint_img.replace("assets", "")
               }
         else:
            return 'No file part in the request'

@bp.route("/noise_reduction",methods=['GET'])
def noise_reduction_temp():
   return render_template("noise_reduction.html")


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
               'template' : render_template('InputCollapse/restoring/noise_reduction.html',data = data),
               'img_url': img_path.replace("assets", ""),
               'noise_img' : noise_img.replace("assets", "")
               }
         else:
            return 'No file part in the request'


from flask import Blueprint, render_template, redirect, url_for, request, session
from src.Segmentation import Segmentation
import os

bp = Blueprint("segmentation", __name__, url_prefix="/segmentation")

@bp.route("/Clustering",methods=['GET'])
def Clustering_temp():
   return render_template("Clustering.html")

@bp.route("/Clustering_output",methods=['POST'])
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
                  'clustered_img' : clustered_img
               }
            return {
               'template' : render_template('segmentation/clustering.html',data = data),
               'img_url': img_path.replace("assets", ""),
               'clustered_img' : clustered_img.replace("assets", "")
               }
         else:
            return 'No file part in the request'
         
         
@bp.route("/Edge_detection",methods=['GET'])
def Edge_detection_temp():
   return render_template("Edge_detection.html")

@bp.route("/Edge_detection_output",methods=['POST'])
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
                  'edge_detection' : edge_detection
               }
            
            return {
               'template' : render_template('segmentation/edge_detection.html',data = data),
               'img_url': img_path.replace("assets", ""),
               'edge_detection' : edge_detection.replace("assets", "")
               }
         else:
            return 'No file part in the request'

@bp.route("/Region_growing",methods=['GET'])
def Region_growing_temp():
   return render_template("Region_growing.html")

@bp.route("/Region_growing_output",methods=['POST'])
def Region_growing_output():
      if request.method == 'POST':
         if 'region-growing-input-image-file' in request.files:
            file = request.files['region-growing-input-image-file']
            img_path = f'assets/uploads/segmantation/region_detection/{file.filename}'
            file.save(os.path.join(img_path)) 
            segmantation = Segmentation(img_path)
            region_detection = segmantation.region_detection()
            
            data = {
                  'img_url': img_path,
                  'region_detection' : region_detection
               }
            
            return {
               'template' : render_template('segmentation/region_detection.html',data = data),
               'img_url': img_path.replace("assets", ""),
               'region_detection' : region_detection.replace("assets", "")
               }
         else:
            return 'No file part in the request'


@bp.route("/Thresholding",methods=['GET'])
def Thresholding_temp():
   return render_template("Thresholding.html")


@bp.route("/Thresolding_output",methods=['POST'])
def Thresolding_output():
      if request.method == 'POST':
         if 'thresolding-input-image-file' in request.files:
            file = request.files['thresolding-input-image-file']
            img_path = f'assets/uploads/segmantation/thresholding/{file.filename}'
            file.save(os.path.join(img_path)) 
            segmantation = Segmentation(img_path)
            thresholding = segmantation.thresholding()
            
            data = {
                  'img_url': img_path,
                  'thresholding' : thresholding
               }
            
            return {
               'template' : render_template('segmentation/thresholding.html',data = data),
               'img_url': img_path.replace("assets", ""),
               'thresholding' : thresholding.replace("assets", "")
               }
         else:
            return 'No file part in the request'

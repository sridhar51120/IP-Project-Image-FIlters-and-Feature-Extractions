
from flask import Flask, redirect, url_for, request, render_template, session,Blueprint, Response, jsonify
import cv2

app = Flask(__name__,static_folder='assets',static_url_path='/')

@app.route("/",methods=['GET'])
def dashboard():
   return render_template("dashboard.html")

@app.route("/Histogram_Equalization",methods=['GET'])
def Histogram_Equalization_temp():
   return render_template("Histogram_Equalization.html")

@app.route("/Histogram_Equalization_output",methods=['GET'])
def Histogram_Equalization_output():
   return render_template("Histogram_Equalization.html")

# original_image = cv2.imread('your_image.jpg', cv2.IMREAD_GRAYSCALE)

# # Apply histogram equalization
# equalized_image = cv2.equalizeHist(original_image)

# # Save the equalized image
# cv2.imwrite('equalized_image.jpg', equalized_image)

@app.route('/upload', methods=['POST'])
def upload_image():
   image_name = request.files['my_image']
   if image_name:
      return jsonify({'message': f'Image name received: {image_name}'})
   
   return jsonify({'error': 'Image name not received'})

if __name__ == '__main__':
   app.run(host='127.0.0.1', port=5000, debug=True)

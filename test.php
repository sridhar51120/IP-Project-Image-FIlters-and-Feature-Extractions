<?php
// Load the image
$image = new Imagick('input_image.jpg');

// Apply non-local means denoising
$image->nlmeans(10, 10, 0.3, 3);  // Adjust the parameters as needed

// Set the output image format (optional)
$image->setImageFormat('jpg');

// Output the image
header("Content-Type: image/jpeg");
echo $image;

?>
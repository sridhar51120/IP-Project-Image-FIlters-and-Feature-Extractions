using System;
using System.Drawing;
class UnsharpMasking
{
      static void Main()
          {
              // Load the image
              string imagePath = "Input_image.jpg";
              Bitmap originalImage = new Bitmap(imagePath);
              // Apply unsharp masking
              Bitmap unsharpMaskedImage = ApplyUnsharpMask(originalImage);
              // Save the unsharp mask image
              string outputImagePath = "unsharp_maskoutput_image.jpg";
              unsharpMaskedImage.Save(outputImagePath);
              // Dispose the image objects
              originalImage.Dispose();
              unsharpMaskedImage.Dispose();
              Console.WriteLine("Unsharp mask applied and saved successfully.");
              }
              static Bitmap ApplyUnsharpMask(Bitmap originalImage)
              {
                  Bitmap blurredImage = new Bitmap(originalImage.Width, originalImage.Height);
                  // Apply Gaussian blur to the original image
                  using (Graphics g = Graphics.FromImage(blurredImage))
                  {
                      Rectangle rect = new Rectangle(0, 0, originalImage.Width, originalImage.Height);
                      g.DrawImage(originalImage, rect);
                      using (ImageAttributes imageAttr = new ImageAttributes())
                      {
                          float[] matrix = { 0, 0, 0, 0, 1, 0, 0, 0, 0 };
                          imageAttr.SetColorMatrix(new ColorMatrix(matrix));
                          using (Graphics g2 = Graphics.FromImage(blurredImage))
                          {
                              g2.DrawImage(blurredImage, rect, 0, 0, originalImage.Width, originalImage.Height, GraphicsUnit.Pixel, imageAttr);
                          }
                      }
                  }
                  // Calculate the unsharp mask image
                  Bitmap unsharpMaskedImage = new Bitmap(originalImage.Width, originalImage.Height);
                  for (int y = 0; y < originalImage.Height; y++)
                      {
                          for (int x = 0; x < originalImage.Width; x++)
                          {
                              Color originalColor = originalImage.GetPixel(x, y);
                              Color blurredColor = blurredImage.GetPixel(x, y);
                              int r = Clamp(originalColor.R * 2 - blurredColor.R, 0, 255);
                              int g = Clamp(originalColor.G * 2 - blurredColor.G, 0, 255);
                              int b = Clamp(originalColor.B * 2 - blurredColor.B, 0, 255);
                              Color newColor = Color.FromArgb(r, g, b);
                              unsharpMaskedImage.SetPixel(x, y, newColor);
                          }
                      }
                      return unsharpMaskedImage;
                  }
                  static int Clamp(int value, int min, int max)
                  {
                      return Math.Max(min, Math.Min(max, value));
                  }
}
import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.CvType;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

public class WeinerFilter {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }

    public static void main(String[] args) {
        // Load the degraded image
        Mat degradedImage = Imgcodecs.imread("input_image.jpg", Imgcodecs.IMREAD_GRAYSCALE);

        // Create a PSF (Point Spread Function)
        Mat psf = Mat.ones(5, 5, CvType.CV_32F);
        Core.divide(psf, new Scalar(25), psf);

        // Apply Wiener deconvolution
        Mat wienerRestoration = new Mat();
        double noiseVariance = 0.1;
        Imgproc.deconvolveWiener(degradedImage, psf, wienerRestoration, noiseVariance);

        // Normalize the restored image
        Core.normalize(wienerRestoration, wienerRestoration, 0, 255, Core.NORM_MINMAX);

        // Save the Wiener-filtered image
        Imgcodecs.imwrite("wiener_restored_image.jpg", wienerRestoration);
    }
}

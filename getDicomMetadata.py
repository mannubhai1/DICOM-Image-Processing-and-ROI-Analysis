import os
import pydicom
import numpy as np

# Paths to data and save location
root_dir = './GEMS_IMG_06252024/2024_JUN/25/'  # Directory containing the subdirectories with DICOM files
output_file = './dicom_metadata.txt' 

with open(output_file, 'w') as f:
    
    for subdir in os.listdir(root_dir):
        subdir_path = os.path.join(root_dir, subdir)
        
        if os.path.isdir(subdir_path):
            # Look for DICOM files in the subdirectory
            for file in os.listdir(subdir_path):
                dicom_file_path = os.path.join(subdir_path, file)
                # print(dicom_file_path)
                
                if os.path.isfile(dicom_file_path):  # Ensure it is a file
                    try:
                        # Read the DICOM file
                        ds = pydicom.filereader.dcmread(dicom_file_path)
                        # print(dir(pydicom))
                        
                        # ds2 = pydicom.dcmread('GEMS_IMG_06252024/2024_JUN/25/MH8399/O6P8JI80.dcm')
                        # print(ds2)
                        # with open('dicom_file_content.txt', 'w') as f2:
                        #     f2.write(str(ds2))
                        f.write(f"Metadata for {dicom_file_path}:\n")
                        # if 'PixelSpacing' in ds:
                        #     pixel_spacing = ds.PixelSpacing
                        #     row_spacing, column_spacing = pixel_spacing
                        #     f.write(f"\nPixel Spacing: {pixel_spacing}\n")
                            
                        #     # Calculate image dimensions in mm
                        #     pixel_array = ds.pixel_array
                        #     rows, cols = pixel_array.shape
                        #     image_width_mm = cols * float(column_spacing)
                        #     image_height_mm = rows * float(row_spacing)
                        #     f.write(f"Image Dimensions: {cols} x {rows} pixels\n")
                        #     f.write(f"Physical Dimensions: {image_width_mm:.2f} x {image_height_mm:.2f} mm\n")
                        # else:
                        #     f.write("\nPixel Spacing: Not available\n")

                        # if 'PixelData' in ds:
                        #     print(len(ds.PixelData))
                            # pixel_array = ds.pixel_array
                            # f.write("\nPixel Data:\n")
                            # f.write(f"Shape: {pixel_array.shape}\n")
                            # f.write(f"Data Type: {pixel_array.dtype}\n")
                            # f.write(f"Min Value: {np.min(pixel_array)}\n")
                            # f.write(f"Max Value: {np.max(pixel_array)}\n")
                            # f.write(f"Pixel Data (first 10 values): {pixel_array.flat[:10]}\n")

                        for elem in ds.iterall():
                            f.write(f"{elem.tag}: {elem.description()} = {elem.value}\n")
                        
                        f.write("\n" + "="*50 + "\n\n")
                        print(f"Extracted metadata from {dicom_file_path}")
                    except Exception as e:
                        print(f"Error processing {dicom_file_path}: {e}")

print('Metadata extraction complete. Check the output file for details.')

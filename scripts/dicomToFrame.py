import SimpleITK as sitk

# folder_array = ['MH8399', 'MH84015', '
# MH84510', 'MH84512', 'MH8519', 'MH85241']
file_array = ['MH8399/O6P8JI80.dcm','MH84015/O6P8K3O2.dcm', 'MH84510/O6P8MIG4.dcm', 'MH84512/O6P8MJ06.dcm', 'MH8519/O6P8PI88.dcm', 'MH85241/O6P8QA8A.dcm']
# file_array = ['O6P8JI80.dcm','O6P8K3O2.dcm', 'O6P8MIG4.dcm', 'O6P8MJ06.dcm', 'O6P8PI88.dcm', 'O6P8QA8A.dcm']

# for file in file_array:
img = sitk.ReadImage("../GEMS_IMG_06252024/2024_JUN/25/MH8399/O6P8JI80" )
sitk.WriteImage(img, f"../dicomImages/target_image_O6P8JI80.png")
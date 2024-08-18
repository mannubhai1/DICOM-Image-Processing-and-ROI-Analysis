import os

# Specify the directory
directory = './GEMS_IMG_06252024/2024_JUN/25/'
folder_array = ['MH8399', 'MH84015', 'MH84510', 'MH84512', 'MH8519', 'MH85241']

file_names = []

# Get all file names in the directory
for folder in folder_array:
    directory = './GEMS_IMG_06252024/2024_JUN/25/' + folder
    file_names.append(os.listdir(directory))

print(file_names)
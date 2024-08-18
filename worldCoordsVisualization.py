import json
import matplotlib.pyplot as plt
from shapely.geometry import Polygon
from shapely import affinity

with open('./worldCoordinates.json', 'r') as file:
    data = json.load(file)

points = data

polygon = Polygon(points)

x, y = zip(*points) 

plt.figure(figsize=(10, 6))
plt.plot(x, y, 'o', label='Points')
plt.plot(x + (x[0],), y + (y[0],), 'r-', label='Polygon') 
plt.fill(x + (x[0],), y + (y[0],), 'lightblue', alpha=0.5)
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Points and Polygon')
plt.legend()
plt.grid(True)
plt.show()

area = polygon.area
centroid = polygon.centroid

print(f"Area of the polygon: {area}")
print(f"Centroid of the polygon: ({centroid.x}, {centroid.y})")

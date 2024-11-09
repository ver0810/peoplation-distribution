import json
import random

def generate_random_data(center_lng, center_lat, num_points):
  data = []
  for i in range(num_points):
    lng = random.gauss(center_lng, 0.05)
    lat = random.gauss(center_lat, 0.05)
    count = random.randint(1000, 7500)
    data.append({
      'lng': lng,
      'lat': lat,
      'count': count
    })
  return data

center_lng = 120.1551
center_lat = 30.2741
random_data = generate_random_data(center_lng, center_lat, 5000)

with open('./public/data.json', 'w', encoding='utf-8') as file:
  json.dump(random_data, file, ensure_ascii=False, indent=4)

print('done')
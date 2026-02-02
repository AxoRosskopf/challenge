import requests
import json
import io
import time
import os

def upload_file_chuncks(file_path, url, batch_size=1000):
    try: 
        with open(file_path, 'rb') as f:
            all_data = json.load(f)
        total_entries = len(all_data)
        print(f"Total entries to upload: {total_entries}, over {total_entries // batch_size + 1} batches.")
        for start in range(0, total_entries, batch_size):
            chunck = all_data[start:start + batch_size]
            json_bytes = json.dumps(chunck).encode('utf-8')
            file_obj = io.BytesIO(json_bytes)
            file = {
                'file': ('properties_chunk.json', file_obj, 'application/json')
            }
            try:
                response = requests.post(url, files=file)
                if response.status_code in [200,201]:
                    print(f"Batch {start // batch_size + 1} uploaded successfully.")

                else:
                    print(f"Failed to upload batch {start // batch_size + 1}. Status code: {response.status_code}")
            except Exception as e:
                print(f"An error occurred while uploading batch {start // batch_size + 1}: {e}")
                time.sleep(2)
            time.sleep(1)
        print("All batches processed.")
    except Exception as e:
        print(f"An error occurred: {e}")



    
if __name__ == "__main__":
    FILE_PATH = os.path.join(os.path.dirname(__file__), "data", "generated_properties.json")
    UPLOAD_URL = "http://localhost:3001/api/v1/properties/upload" 
    upload_file_chuncks(FILE_PATH, UPLOAD_URL)

    response = requests.get("http://localhost:3001/api/v1/properties")
    if response.status_code == 200:
        data = response.json()
        print(f"Total properties in database: {len(data)}")
    else:
        print(f"Failed to retrieve data. Status code: {response.status_code}")

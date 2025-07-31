import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import AutomobileVO


def get_automobiles():
    url = 'http://project-beta-inventory-api-1:8000/api/automobiles/'
    response = requests.get(url)
    if response.status_code == 200:
        content = json.loads(response.content)
        print(content)
        
        for automobile in content.get("autos", []):
            vin = automobile.get("vin")
            sold = automobile.get("sold")

            if vin is not None:
                AutomobileVO.objects.create(vin=vin, sold=sold)
    else:
        print(f"HTTP request failed with status code {response.status_code}")


def poll(repeat=True):
    while True:
        try:
            get_automobiles()
        except Exception as e:
            print(e, file=sys.stderr)
        if (not repeat):
            break
        time.sleep(int(os.environ.get("POLL_INTERVAL", 60)))


if __name__ == "__main__":
    poll()

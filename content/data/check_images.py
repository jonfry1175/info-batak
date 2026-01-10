
import urllib.request
import concurrent.futures

urls = [
    "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80",
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=800&q=80",
    "https://images.unsplash.com/photo-1565528822067-15104a37f0b5?w=800&q=80",
    "https://images.unsplash.com/photo-1616628286950-c8340d213987?w=800&q=80",
    "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=80",
    "https://images.unsplash.com/photo-1543169315-71ba0959f6d6?w=800&q=80",
    "https://images.unsplash.com/photo-1520625399-52e42353a39b?w=800&q=80",
    "https://images.unsplash.com/photo-1533359050853-333e387c6b9f?w=800&q=80",
    "https://images.unsplash.com/photo-1549419163-952402927282?w=800&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    "https://images.unsplash.com/photo-1501612780327-450456b953a6?w=800&q=80",
    "https://images.unsplash.com/photo-1518098268026-4e1877a1c7d2?w=800&q=80"
]

def check_url(url):
    try:
        req = urllib.request.Request(url, method='HEAD')
        with urllib.request.urlopen(req, timeout=5) as response:
            return url, response.status
    except Exception as e:
        return url, str(e)

with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
    results = list(executor.map(check_url, urls))

for url, status in results:
    print(f"{url}: {status}")

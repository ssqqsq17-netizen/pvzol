#!/usr/bin/env python3
"""Web server for ruffle SWF caching"""
import os
import json
import hashlib

SWF_CACHE_DIR = os.path.join(os.path.dirname(__file__), "swf_cache")
CACHE_INDEX_FILE = os.path.join(SWF_CACHE_DIR, "cache_index.json")

def get_cache_index():
    if os.path.exists(CACHE_INDEX_FILE):
        try:
            with open(CACHE_INDEX_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            pass
    return {}

def save_cache_index(index):
    os.makedirs(SWF_CACHE_DIR, exist_ok=True)
    with open(CACHE_INDEX_FILE, 'w', encoding='utf-8') as f:
        json.dump(index, f)

def get_swf_path(url):
    index = get_cache_index()
    if url in index:
        return os.path.join(SWF_CACHE_DIR, index[url])
    return None

def cache_swf(url, data):
    os.makedirs(SWF_CACHE_DIR, exist_ok=True)
    file_hash = hashlib.md5(url.encode('utf-8')).hexdigest()
    filename = f"{file_hash}.swf"
    filepath = os.path.join(SWF_CACHE_DIR, filename)
    
    with open(filepath, 'wb') as f:
        f.write(data)
    
    index = get_cache_index()
    index[url] = filename
    save_cache_index(index)
    
    return filepath

if __name__ == "__main__":
    print("SWF Cache Module")

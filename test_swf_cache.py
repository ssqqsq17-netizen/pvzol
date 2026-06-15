#!/usr/bin/env python3
"""测试SWF缓存机制"""
import os
import hashlib
import urllib.parse

def get_swf_cache_path(url):
    """获取SWF文件的本地缓存路径（与web.py中的实现相同）"""
    cache_dir = os.path.join(os.path.dirname(__file__), "Broswer", "swf_cache")
    os.makedirs(cache_dir, exist_ok=True)
    
    # 移除URL中的查询参数，只使用基础URL进行哈希
    parsed_url = urllib.parse.urlsplit(url)
    base_url = f"{parsed_url.scheme}://{parsed_url.hostname}{parsed_url.path}"
    
    url_hash = hashlib.md5(base_url.encode("utf-8")).hexdigest()
    return os.path.join(cache_dir, f"{url_hash}.swf"), base_url

def test_cache_path():
    """测试缓存路径生成"""
    # 测试URL（带查询参数）
    test_urls = [
        "http://www.youkia.com/swf/tou.swf?path=http://example.com/face.jpg&timestamp=1234567890",
        "http://www.youkia.com/swf/tou.swf?path=http://example.com/face.jpg&timestamp=9876543210",
        "http://www.youkia.com/swf/tou.swf",
        "http://s43.youkia.pvz.youkia.com/youkia/main.swf?857538531",
        "http://s43.youkia.pvz.youkia.com/youkia/main.swf?123456789",
        "http://s43.youkia.pvz.youkia.com/youkia/main.swf",
    ]
    
    print("=== 测试缓存路径生成 ===")
    for url in test_urls:
        cache_path, base_url = get_swf_cache_path(url)
        url_hash = hashlib.md5(base_url.encode("utf-8")).hexdigest()
        
        print(f"\n原始URL: {url}")
        print(f"基础URL: {base_url}")
        print(f"哈希值: {url_hash}")
        print(f"缓存路径: {cache_path}")
        print(f"文件存在: {os.path.exists(cache_path)}")
        
        if os.path.exists(cache_path):
            print(f"文件大小: {os.path.getsize(cache_path)} bytes")

def test_cache_directory():
    """测试缓存目录权限"""
    cache_dir = os.path.join(os.path.dirname(__file__), "Broswer", "swf_cache")
    print(f"\n=== 缓存目录信息 ===")
    print(f"缓存目录: {cache_dir}")
    print(f"目录存在: {os.path.exists(cache_dir)}")
    print(f"目录权限: {oct(os.stat(cache_dir).st_mode)[-4:]}")
    
    # 检查是否可读写
    try:
        test_file = os.path.join(cache_dir, ".test_write")
        with open(test_file, "w") as f:
            f.write("test")
        os.remove(test_file)
        print("写入测试: 成功")
    except Exception as e:
        print(f"写入测试: 失败 - {e}")

if __name__ == "__main__":
    test_cache_path()
    test_cache_directory()
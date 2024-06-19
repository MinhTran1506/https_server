import os
from datetime import datetime

def setup_logging():
    pass

def get_content_type(file_path):
    mime_types = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.txt': 'text/plain'
    }
    ext = os.path.splitext(file_path)[1]
    return mime_types.get(ext, 'application/octet-stream')

def log_request(client_address, method, path, status_code):
    print(f'{datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")} - {client_address} - {method} {path} - {status_code}')
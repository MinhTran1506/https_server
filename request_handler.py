import urllib.parse

def parse_request(request):
    try:
        headers, body = request.split('\r\n\r\n', 1)
        request_line, *header_lines = headers.split('\r\n')
        method, path, _ = request_line.split()
        headers = {k: v for k, v in (line.split(': ') for line in header_lines)}
        return method, path, headers, body
    except Exception as e:
        print(f'Error parsing request: {e}')
        return None, None, None, None
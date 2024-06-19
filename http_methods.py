from request_handler import parse_request
from response_builder import generate_response

def handle_request(client_socket, client_address):
    request = client_socket.recv(1024).decode('utf-8')
    if not request:
        return
    
    method, path, headers, body = parse_request(request)
    if not method:
        response = generate_response(400, 'Bad Request')
    else:
        if method == "GET":
            response = handle_get(path)
        elif method == 'POST':
            response = handle_post(path, body)
        elif method == 'PUT':
            response = handle_put(path, body)
        elif method == 'DELETE':
            response = handle_delete(path)
        else:
            response = generate_response(405, 'Method Not Allowed')
    
    response = client_socket.recv(1024).decode('utf-8')
    if response is None:
        response = generate_response(500, 'Internal Server Error')
    client_socket.sendall(response.encode('utf-8'))
    client_socket.close()

def handle_get(path):
    pass

def handle_post(path, body):
    pass

def handle_put(path, body):
    pass

def handle_delete(path):
    pass

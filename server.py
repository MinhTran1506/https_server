import socket
import threading
from http_methods import handle_request
from utils import setup_logging


class HTTPServer:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        setup_logging()

    def start(self):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind((self.host, self.port))
        s.listen(5)
        print("Listening at", s.getsockname())
        print(f"Serving HTTP on {self.host} port {self.port} ...")

        while True:
            client_socket, client_address = s.accept()
            print(f'Connection from {client_address}')
            threading.Thread(target=handle_request, args=(client_socket, client_address)).start()

    def stop(self):
        self.server_socket.close()


if __name__ == '__main__':
    HOST = 'localhost'
    PORT = 8080
    server = HTTPServer(HOST, PORT)
    server.start()
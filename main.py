import socket

class TCPServer:
    def __init__(self, host='127.0.0.1', port=8888):
        self.host = '127.0.0.1' # Adress for our server
        self.port = 8888 # Port for our server

    def start(self):
        # Create a socket object
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        # Bind the socket object to the address and port
        s.bind((self.host, self.port))
        # Start listening for connections
        s.listen(5)

        print("Listening at", s.getsockname())

        while True:
            # Accept any new connection
            conn, addr = s.accept()

            print("Connected by", addr)
            # Read the data sent by the client
            # we'll only read the first 1024 bytes
            data = conn.recv(1024)

            response = self.handle_request(data)

            # Send back the data to client
            conn.sendall(response)

            # Close the connection
            conn.close()
    
    def handle_request(self, data):
        """Handles incoming data and returns a response.
        Override this in subclass."""
        return data
    
class HTTPServer(TCPServer):
    headers = {
        'Server': 'CrudeServer',
        'Content-Type': 'text/html',
    }
    status_code = {
        200: 'OK',
        404: 'Not Found',
    }
    def handle_request(self, data):
        """Handles the incoming request.
        Compiles and returns the response"""
        request = HTTPRequest(data)

        handler = getattr(self, 'handle_%s' % request.method)

        response = handler(request)
        return response
    
    def response_line(self, status_code):
        """Returns response line"""
        reason = self.status_code[status_code]
        line = "HTTP/1.1 %s %s\r\n % (status_code, reason)"

        return line.encode() # Call encode to convert str to bytes

    def response_header(self, extra_headers=None):
        """Returns headers
        The 'extra_headers' can be a dict for sending 
        extra headers for the current response"""
        headers_copy = self.headers.copy() # make a local copy of headers

        if extra_headers:
            headers_copy.update(extra_headers)
        
        headers = ""

        for h in headers_copy:
            headers += "%s: %s\r\n % (h, headers_copy[h])"
        
        return headers.encode() # Call encode to convert to bytes

    def handle_GET(self, request):
        pass

class HTTPRequest:
    def __init__(self, data):
        self.method = None
        self.uri = None
        self.http_version = "1.1" # Default to HTTP/1.1 if request doesn't provide a version

        self.parse(data)
    
    def parse(self, data):
        lines = data.split(b"\r\n")

        request_line = lines[0]

        words = request_line.split(b" ")

        self.method = words[0].decode() # call decode to convert bytes to str

        if len(words) > 1:
            self.uri = words[1].decode()

        if len(words > 2):
            self.http_version = words[2]
if __name__ == "__main__":
    server = HTTPServer()
    server.start()
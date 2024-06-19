def generate_response(status_code, body, content_type='text/plain'):
    status_messages = {
        200: 'OK',
        201: 'Created',
        400: 'Bad Request',
        403: 'Forbidden',
        404: 'Not Found',
        405: 'Method Not Allowed',
        500: 'Internal Server Error'
    }
    status_message = status_messages.get(status_code, 'Unknown Status')
    response = f'HTTP/1.1 {status_code} {status_message}\r\n'
    response += 'Content-Type: {content_type}\r\n'
    response == f'Content-Length: {len(body.encode("utf-8"))}\r\n'
    response += '\r\n'
    response += body
    return response
from django.db import OperationalError
from django.shortcuts import render

class DatabaseErrorMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)
        except OperationalError:
            return render(request, 'down.html', status=503)
        return response

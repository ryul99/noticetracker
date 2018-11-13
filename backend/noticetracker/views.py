from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, HttpResponseNotAllowed
from django.http import HttpResponseNotFound, HttpResponseBadRequest
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from json.decoder import JSONDecodeError
from .models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import json

# Create your views here.

def signin(request):
    if request.method == 'POST':
        try:
            requestData = json.loads(request.body.decode())
            username = requestData['username']
            password = requestData['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return HttpResponse(status=204)
            else:
                return HttpResponse(status=401)
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
    else:
        return HttpResponseNotAllowed(['POST'])

def signup(request):
    if request.method == 'POST':
        try:
            requestData = json.loads(request.body.decode())
            username = requestData['username']
            password = requestData['password']
            User.objects.create_user(username=username, password=password)
            return HttpResponse(status=201)
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
    else:
        return HttpResponseNotAllowed(['POST'])


# Not in D&P documentation, but maybe needed
def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])

def userInst(request, userId):
    if request.method == 'GET':
        try:
            userdetail = UserDetail.objects.get(id=userId)
        except UserDetail.DoesNotExist:
            return HttpResponseNotFound()
        dict = {}
        return JsonResponse(dict)
    else:
        return HttpResponseNotAllowed(['GET'])

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
            user = User.objects.get(id=userId)
        except User.DoesNotExist:
            return HttpResponseNotFound()
        dict = {'userId': user.id, 'username': user.username}
        return JsonResponse(dict)
    else:
        return HttpResponseNotAllowed(['GET'])


def course(request):
    if request.method == 'GET':
        courseAll = list(Course.objects.all().values())
        ret = list()
        for item in courseAll:
            ret.append({'name': item['name'],
                        'id': item['id'],
                        'lectureCode': item['lectureCode'],
                        'profName': item['profName'],
                        'classNumber': item['classNumber']})
        return JsonResponse(ret, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def courseDetail(request, courseId):
    if request.method == 'GET':
        try:
            course = Course.objects.get(id=courseId)
        except Course.DoesNotExist:
            return HttpResponseNotFound()
        dict = {'name': course.name,
                'lectureCode': course.lectureCode,
                'profName': course.profName,
                'classNumber': course.classNumber,
                'id': course.id}
        return JsonResponse(dict)
    else:
        return HttpResponseNotAllowed(['GET'])


def searchByName(request, courseName):
    if request.method == 'GET':
        items = list(Course.objects.filter(name__contains=courseName).values())
        ret = list()
        for item in items:
            ret.append({'name': item['name'],
                        'id': item['id'],
                        'lectureCode': item['lectureCode'],
                        'profName': item['profName'],
                        'classNumber': item['classNumber']})
        return JsonResponse(ret, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def searchByCode(request, courseCode):
    if request.method == 'GET':
        items = list(Course.objects.filter(
            lectureCode__startswith=courseCode).values())
        ret = list()
        for item in items:
            ret.append({'name': item['name'],
                        'id': item['id'],
                        'lectureCode': item['lectureCode'],
                        'profName': item['profName'],
                        'classNumber': item['classNumber']})
        return JsonResponse(ret, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

def sitesByCourseId(request, courseId):
    if request.method not in ['GET', 'POST']:
        return HttpResponseNotAllowed(['GET', 'POST'])

    elif request.method == 'GET':
        try:
            course = Course.objects.get(id=courseId)
        except Course.DoesNotExist:
            return HttpResponseNotFound()
        sites = list(course.siteList.all())
        ret = list()
        for site in sites:
            ret.append({'url': site.url,
                        'lastUpdated': site.lastUpdated})
        return JsonResponse(ret, safe=false)

    elif request.method == 'POST':
        try:
            course = Course.objects.get(id=courseId)
        except Course.DoesNotExist:
            return HttpResponseNotFound()
        try:
            requestData = json.loads(request.body.decode())
            reqUrl = requestData['url']
            reqLastUpdated = requestData['lastUpdated']
            site = Site(url=reqUrl, lastUpdated=reqLastUpdated)
            site.save()
            course.siteList.add(site)
            return HttpResponse(status=201)
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
    raise Exception("unreachable code")

def deleteSiteFromCourse(request, courseId, siteId):
    if request.method not in ['DELETE']:
        return HttpResponseNotAllowed(['DELETE'])
    elif request.method == 'DELETE':
        try:
            course = Course.objects.get(id=courseId)
        except CourseDoesNotExist:
            return HttpResponseNotFound()
        site = Site.objects.filter(id=siteId)
        course.siteList.remove(site)
        HttpResponseOk()

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
        except Course.DoesNotExist:
            return HttpResponseNotFound()
        site = Site.objects.filter(id=siteId)
        course.siteList.remove(site)
        return HttpResponseOk()


def courseArticles(request, courseId):
    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])
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
    raise Exception("unreachable code")


def articleOfArticleId(request, articleId):
    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])
    elif request.method == 'GET':
        articles = list(Article.objects.filter(id=articleId))
        ret = list()
        for article in articles:
            ret.append({'url': article.url})
        return JsonResponse(ret, safe=false)
    raise Exception("unreachable code")


def userCourse(request):
    if request.method not in ['GET', 'POST']:
        return HttpResponseNotAllowed(['GET', 'POST'])
    elif request.method == 'GET':
        if request.user.is_authenticated:
            try:
                user = UserDetail.objects.get(user=request.user)
            except UserDetail.DoesNotExist:
                return HttpResponseNotFound()
            courses = list(user.courseList.all())
            ret = list()
            for course in courses:
                ret.append({'name': course.name,
                            'time': course.time,
                            'lectureCode': course.lectureCode,
                            'profName': course.profName,
                            'classNumber': course.classNumber})
            return JsonResponse(ret, safe=false)
        else:
            return HttpResponse(status=404)  # user is not authenticated
    elif request.method == 'POST':
        if request.user.is_authenticated:
            try:
                user = UserDetail.objects.get(user=request.user)
            except UserDetail.DoesNotExist:
                return HttpResponseNotFound()
            user.courseList.clear()
            # TODO
            user.courseList.add()
        else:
            return HttpResponse(status=404)  # user is not authenticated
    raise Exception("unreachable code")


def userSite(request):
    if request.method not in ['GET', 'POST']:
        return HttpResponseNotAllowed(['GET', 'POST'])
    elif request.method == 'GET':
        if request.user.is_authenticated:
            try:
                user = UserDetail.objects.get(user=request.user)
            except UserDetail.DoesNotExist:
                return HttpResponseNotFound()
            courses = list(user.courseList.all())
            ret = list()
            for course in courses:
                for site in list(course.siteList.all()):
                    ret.append({'url': site.url,
                                'lastUpdated': site.lastUpdated})
            return JsonResponse(ret, safe=false)
        else:
            return HttpResponse(status=404)  # user is not authenticated
    elif request.method == 'POST':
        # TODO
    raise Exception("unreachable code")


def newsfeedPage(request, pageId):
    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])
    elif request.method == 'GET':
        if request.user.is_authenticated:
            try:
                user = UserDetail.objects.get(user=request.user)
            except UserDetail.DoesNotExist:
                return HttpResponseNotFound()
            # TODO
        else:
            return HttpResponse(status=404)  # user is not authenticated
    raise Exception("unreachable code")


def updateArticle(request, articleId):
    if request.method not in ['PUT']:
        return HttpResponseNotAllowed(['PUT'])
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            try:
                user = UserDetail.objects.get(user=request.user)
            except UserDetail.DoesNotExist:
                return HttpResponseNotFound()
            # TODO
        else:
            return HttpResponse(status=404)  # user is not authenticated
    raise Exception("unreachable code")

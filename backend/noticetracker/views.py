from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse, HttpResponseNotAllowed
from django.http import HttpResponseNotFound, HttpResponseBadRequest
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from json.decoder import JSONDecodeError
from .models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import json

# Create your views here.


@csrf_exempt
def checkAuth(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            dic = {'userId': request.user.username,
                   'userNumber': request.user.id}
            return JsonResponse(dic)
        else:
            return HttpResponse(status=404)
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
def signin(request):
    if request.method == 'POST':
        try:
            requestData = json.loads(request.body.decode())
            username = requestData['userId']
            password = requestData['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                dic = {'userId': user.username, 'userNumber': user.id}
                return JsonResponse(dic)
            else:
                return HttpResponse(status=401)
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
    else:
        return HttpResponseNotAllowed(['POST'])


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            requestData = json.loads(request.body.decode())
            username = requestData['userId']
            password = requestData['password']
            user = User.objects.create_user(
                username=username, password=password)
            login(request, user)
            userDetail = UserDetail(user=user)
            userDetail.save()
            dic = {'userId': user.username, 'userNumber': user.id}
            return JsonResponse(dic)
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
    else:
        return HttpResponseNotAllowed(['POST'])


@csrf_exempt
def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
def courseDetail(request, courseId):
    if request.method == 'GET':
        try:
            course = Course.objects.get(id=courseId)
        except Course.DoesNotExist:
            return HttpResponseNotFound()
        timeList = list(course.time.all())
        siteList = list(course.siteList.all())
        dic = {'name': course.name,
               'time': [it.toDict() for it in timeList],
               'siteList': [it.toDict() for it in siteList],
               'lectureCode': course.lectureCode,
               'profName': course.profName,
               'classNumber': course.classNumber,
               'id': course.id}
        return JsonResponse(dic)
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
def searchByName(request, courseName):
    if request.method == 'GET':
        items = list(Course.objects.filter(name__contains=courseName).all())
        ret = list()
        for item in items:
            timeList = list(item.time.all())
            siteList = list(item.siteList.all())
            ret.append({'name': item.name,
                        'time': list(map(LectureTime.toDict, timeList)),
                        'siteList': list(map(Site.toDict, siteList)),
                        'id': item.id,
                        'lectureCode': item.lectureCode,
                        'profName': item.profName,
                        'classNumber': item.classNumber})
        return JsonResponse(ret, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
def searchByCode(request, courseCode):
    if request.method == 'GET':
        items = list(Course.objects.filter(
            lectureCode__startswith=courseCode).all())
        ret = list()
        for item in items:
            timeList = list(item.time.all())
            siteList = list(item.siteList.all())
            ret.append({'name': item.name,
                        'time': list(map(LectureTime.toDict, timeList)),
                        'siteList': list(map(Site.toDict, siteList)),
                        'id': item.id,
                        'lectureCode': item.lectureCode,
                        'profName': item.profName,
                        'classNumber': item.classNumber})
        return JsonResponse(ret, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
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
            ret.append(site.toDict())
        return JsonResponse(ret, safe=False)

    elif request.method == 'POST':
        try:
            course = Course.objects.get(id=courseId)
        except Course.DoesNotExist:
            return HttpResponseNotFound()
        try:
            requestData = json.loads(request.body.decode())
            reqUrl = requestData['url']
            reqName = requestData['name']
            site = Site(url=reqUrl, name=reqName)
            site.save()
            course.siteList.add(site)
            return HttpResponse(status=201)
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
    raise Exception("unreachable code")


@csrf_exempt
def userCourse(request):
    if request.method not in ['GET', 'POST']:
        return HttpResponseNotAllowed(['GET', 'POST'])
    elif request.method == 'GET':
        if request.user.is_authenticated:
            try:
                user = UserDetail.objects.get(user=request.user)
            except UserDetail.DoesNotExist:
                return HttpResponseNotFound()
            customizedCourses = list(user.courseList.all())
            ret = list()
            for item in customizedCourses:
                timeList = list(item.course.time.all())
                siteList = list(item.siteList.all())
                ret.append({'id': item.course.id,
                            'name': item.course.name,
                            'time': list(map(LectureTime.toDict, timeList)),
                            'siteList': list(map(Site.toDict, siteList)),
                            'lectureCode': item.course.lectureCode,
                            'profName': item.course.profName,
                            'classNumber': item.course.classNumber})
            return JsonResponse(ret, safe=False)
        else:
            return HttpResponse(status=404)  # user is not authenticated
    elif request.method == 'POST':
        if request.user.is_authenticated:
            try:
                user = UserDetail.objects.get(user=request.user)
            except UserDetail.DoesNotExist:
                return HttpResponseNotFound()
            user.courseList.clear()
            requestData = json.loads(request.body.decode())
            for course in requestData:
                filteredCourse = Course.objects.get(
                    lectureCode=course['lectureCode'], classNumber=course['classNumber'])
                courseCustom = CourseCustom.objects.create(
                    course=filteredCourse)

                siteList = []
                for site in course['siteList']:
                    siteObj = Site(**site)
                    siteObj.save()
                    siteList.append(siteObj)
                courseCustom.siteList.set(siteList)
                courseCustom.save()
                user.courseList.add(courseCustom)
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=404)  # user is not authenticated
    raise Exception("unreachable code")


@csrf_exempt
def userCourseSite(request, courseId):
    if request.method not in ['POST']:
        return HttpResponseNotAllowed(['POST'])
    elif request.method == 'POST':
        if request.user.is_authenticated:
            try:
                user = UserDetail.objects.get(user=request.user)
                course = user.courseList.get(course__id=courseId)
            except UserDetail.DoesNotExist:
                return HttpResponseNotFound()
            try:
                requestData = json.loads(request.body.decode())
                reqUrl = requestData['url']
                reqName = requestData['name']
                site = Site(url=reqUrl, name=reqName)
                site.save()
                course.siteList.add(site)
                return HttpResponse(status=201)
            except (KeyError, JSONDecodeError):
                return HttpResponseBadRequest()
        else:
            return HttpResponse(status=404)  # user is not authenticated


@csrf_exempt
def userCourseArticle(request, courseId):
    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])
    elif request.method == 'GET':
        userDetail = UserDetail.objects.get(user=request.user)
        courseCustom = userDetail.courseList.get(id=courseId)
        sites = list(courseCustom.siteList.all())
        articles = list(Article.objects.filter(fromSite__in=sites).all())
        ret = []
        for art in articles:
            ret.append({
                'id': art.id,
                'course': art.fromCourse.toDict(),
                'content': art.content,
                'url': art.url,
                'updated': art.updated,
                'star': userDetail.starList.filter(id=art.id).exists(),
                'ignore': userDetail.ignoreList.filter(id=art.id).exists()
            })
        return JsonResponse(ret, safe=False)
    raise Exception("unreachable code")


@csrf_exempt
def userNewsfeed(request):
    if request.method not in ['GET']:
        return HttpResponseNotAllowed(['GET'])
    elif request.method == 'GET':
        if request.user.is_authenticated:
            try:
                userDetail = UserDetail.objects.get(user=request.user)
            except UserDetail.DoesNotExist:
                return HttpResponseNotFound()
            articles = list()
            ret = list()
            courses = list(userDetail.courseList.all())
            for courseCustom in courses:
                sites = list(courseCustom.siteList.all())
                articles += list(Article.objects.filter(
                    fromSite__in=sites).all())
            # TODO: ordering articles
            for art in articles:
                ret.append({
                    'id': art.id,
                    'course': art.fromCourse.toDict(),
                    'content': art.content,
                    'url': art.url,
                    'updated': art.updated,
                    'star': userDetail.starList.filter(id=art.id).exists(),
                    'ignore': userDetail.ignoreList.filter(id=art.id).exists()
                })
            return JsonResponse(ret, safe=False)
        else:
            return HttpResponse(status=404)  # user is not authenticated
    raise Exception("unreachable code")


@csrf_exempt
def userArticle(request, articleId):
    if request.method not in ['GET', 'PUT']:
        return HttpResponseNotAllowed(['GET', 'PUT'])
    elif request.method == 'GET':
        if request.user.is_authenticated:
            try:
                userDetail = UserDetail.objects.get(user=request.user)
            except UserDetail.DoesNotExist:
                return HttpResponseNotFound()
            article = Article.objects.get(id=articleId)
            ret = {
                'id': article.id,
                'course': article.fromCourse.toDict(),
                'content': article.content,
                'url': article.url,
                'updated': art.updated,
                'star': userDetail.starList.filter(id=article.id).exists(),
                'ignore': userDetail.ignoreList.filter(id=article.id).exists()
            }
            return JsonResponse(ret, safe=False)
        else:
            return HttpResponse(status=404)  # user is not authenticated
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            try:
                userDetail = UserDetail.objects.get(user=request.user)
            except UserDetail.DoesNotExist:
                return HttpResponseNotFound()
            requestData = json.loads(request.body.decode())
            reqId = requestData['id']
            star = requestData['star']
            ignore = requestData['ignore']
            if star:
                userDetail.starList.add(Article.objects.get(id=reqId))
            else:
                userDetail.starList.remove(Article.objects.get(id=reqId))
            if ignore:
                userDetail.ignoreList.add(Article.objects.get(id=reqId))
            else:
                userDetail.ignoreList.remove(Article.objects.get(id=reqId))
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=404)  # user is not authenticated

    raise Exception("unreachable code")

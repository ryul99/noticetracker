from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.contrib import auth
from django.core import serializers
from .crawl import crawler
from .getarticles import getArticles
from .models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import json
from datetime import datetime, timezone

# Create your tests here.


class NoticeTrackerTestCase(TestCase):
    mock_minty = {'userId': 'minty', 'password': 'pw1'}
    mock_16silver = {'userId': '16silver', 'password': 'pw2'}
    maxDiff = None

    def checkInvalidRequest(self, allowed, url):
        client = Client()
        if 'GET' not in allowed:
            response = client.get(url)
            self.assertEqual(response.status_code, 405)
        if 'POST' not in allowed:
            response = client.post(url, json.dumps(
                {'test': 'test'}), content_type='json')
            self.assertEqual(response.status_code, 405)
        if 'PUT' not in allowed:
            response = client.put(url, json.dumps(
                {'test': 'test'}), content_type='json')
            self.assertEqual(response.status_code, 405)
        if 'DELETE' not in allowed:
            response = client.delete(url)
            self.assertEqual(response.status_code, 405)

    def courseToDict(self, course):
        return {
            'id': course.id,
            'name': course.name,
            'lectureCode': course.lectureCode,
            'profName': course.profName,
            'classNumber': int(course.classNumber),
            'time': [self.lectureTimeToDict(c) for c in course.time.all()],
            'siteList': [self.siteToDict(s) for s in course.siteList.all()]
        }

    def courseCustomToDict(self, cc):
        return {
            'id': cc.course.id,
            'name': cc.course.name,
            'time': list(map(self.lectureTimeToDict, cc.course.time.all())),
            'siteList': list(map(self.siteToDict, cc.siteList.all())),
            'lectureCode': cc.course.lectureCode,
            'profName': cc.course.profName,
            'classNumber': int(cc.course.classNumber)
        }

    def lectureTimeToDict(self, lectureTime):
        return {
            'day': lectureTime.day,
            'start': lectureTime.start,
            'end': lectureTime.end
        }

    def siteToDict(self, site):
        return {
            'name': site.name,
            'url': site.url,
            'lastUpdated': site.lastUpdated.strftime('%Y-%m-%dT%H:%M:%SZ')
        }

    def articleToDict(self, article):
        return {
            'id': article.id,
            'course': self.courseToDict(article.fromCourse),
            'content': article.content,
            'url': article.url,
            'star': article in self.userDetail.starList.all(),
            'ignore': article in self.userDetail.ignoreList.all()
        }

    def setUp(self):
        self.user = User.objects.create_user(username='minty', password='pw1')
        self.userDetail = UserDetail(user=self.user)
        self.userDetail.save()

        self.time1 = LectureTime(day=1, start=155, end=185)
        self.time2 = LectureTime(day=4, start=170, end=180)
        self.time1.save()
        self.time2.save()
        self.site1 = Site(name='SNU', url='www.snu.ac.kr',
                          lastUpdated=datetime(year=2018, month=12, day=6, tzinfo=timezone.utc))
        self.site2 = Site(name='ropas', url='ropas.snu.ac.kr',
                          lastUpdated=datetime(year=2018, month=12, day=7, tzinfo=timezone.utc))
        self.site3 = Site(name='IU', url='twitter.com/_IUofficial',
                          lastUpdated=datetime(year=2018, month=12, day=8, tzinfo=timezone.utc))
        self.site4 = Site(name='automata', url='http://theory.snu.ac.kr/?page_id=1388',
                          lastUpdated=datetime(year=2018, month=12, day=9, tzinfo=timezone.utc))
        self.site1.save()
        self.site2.save()
        self.site3.save()
        self.site4.save()

        self.course1 = Course(
            id=1, name='핀란드어 1', lectureCode='L0441.000100', profName='정도상', classNumber='001')
        self.course1.save()
        self.course1.time.add(*[self.time1, self.time2])
        self.course1.siteList.add(self.site1)
        self.article1 = Article(content="article1", url="www.snu.ac.kr", updated=datetime(
            year=2018, month=12, day=7, tzinfo=timezone.utc))
        self.article1.fromSite = self.site1
        self.article1.fromCourse = self.course1
        self.article1.save()
        self.course1.siteList.add(self.site1)

        self.time3 = LectureTime(day=1, start=125, end=140)
        self.time4 = LectureTime(day=1, start=170, end=180)
        self.time5 = LectureTime(day=3, start=125, end=140)
        self.time3.save()
        self.time4.save()
        self.time5.save()
        self.course2 = Course(
            id=2, name='히브리어 1', lectureCode='L0441.000200', profName='김동혁', classNumber='001')
        self.course2.save()
        self.course2.time.add(*[self.time3, self.time4, self.time5])
        self.course2.siteList.add(self.site2)
        self.article2 = Article(content="article2", url="ropas.snu.ac.kr", updated=datetime(
            year=2018, month=12, day=6, tzinfo=timezone.utc))
        self.article2.fromSite = self.site2
        self.article2.fromCourse = self.course2
        self.article2.save()

        self.time6 = LectureTime(day=1, start=140, end=155)
        self.time7 = LectureTime(day=3, start=140, end=155)
        self.time6.save()
        self.time7.save()
        self.course3 = Course(name='독문강독', lectureCode='L0441.000300', profName='이호성',
                              classNumber='001')
        self.course3.save()
        self.course3.time.add(*[self.time6, self.time7])
        self.course3.siteList.add(self.site3)
        self.article3 = Article(content="article3", url="soar.snu.ac.kr", updated=datetime(
            year=2018, month=12, day=8, tzinfo=timezone.utc))
        self.article3.fromSite = self.site3
        self.article3.fromCourse = self.course3
        self.article3.save()

        self.time8 = LectureTime(day=1, start=160, end=180)
        self.time9 = LectureTime(day=3, start=180, end=190)
        self.time8.save()
        self.time9.save()
        self.course4 = Course(name='기초영어', lectureCode='L0441.000400', profName='백혜정',
                              classNumber='001')
        self.course4.save()
        self.course4.time.add(*[self.time8, self.time9])

        self.cc1 = CourseCustom(course=self.course1, lastUpdated=datetime(
            year=2018, month=12, day=6, tzinfo=timezone.utc))
        self.cc2 = CourseCustom(course=self.course2, lastUpdated=datetime(
            year=2018, month=12, day=6, tzinfo=timezone.utc))
        self.cc1.save()
        self.cc2.save()
        self.cc1.siteList.add(self.site2)
        self.cc2.siteList.add(self.site3)
        self.userDetail.courseList.add(self.cc1, self.cc2)
        self.userDetail.starList.add(self.article2)
        self.userDetail.ignoreList.add(self.article3)

    def test_signup(self):
        client = Client()
        response = client.post(
            '/api/sign_up/', json.dumps(self.mock_16silver), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            len(User.objects.filter(username='16silver').values()), 1)
        response = client.post(
            '/api/sign_up/', "", content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.checkInvalidRequest(['POST'], '/api/sign_up/')

    def test_signin(self):
        client = Client()
        response = client.post(
            '/api/sign_in/', "", content_type='application/json')
        self.assertEqual(response.status_code, 400)
        response = client.post(
            '/api/sign_in/', json.dumps(self.mock_minty), content_type='application/json')
        user = auth.get_user(client)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(user.is_authenticated)
        response = client.post(
            '/api/sign_in/', json.dumps(self.mock_16silver), content_type='application/json')
        self.assertEqual(response.status_code, 401)
        self.checkInvalidRequest(['POST'], '/api/sign_in/')

    def test_signout(self):
        client = Client()
        response = client.get('/api/sign_out/')
        self.assertEqual(response.status_code, 401)

        client.login(username='minty', password='pw1')
        user = auth.get_user(client)
        self.assertTrue(user.is_authenticated)

        response = client.get('/api/sign_out/')
        self.assertEqual(response.status_code, 204)
        user = auth.get_user(client)
        self.assertFalse(user.is_authenticated)
        self.checkInvalidRequest(['GET'], '/api/sign_out/')

    def test_search_name(self):
        client = Client()
        response = client.get('/api/search/name/핀란드어/')
        self.assertEqual(response.json(), [self.courseToDict(self.course1)])
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/search/name/프랑스/')
        self.assertEqual(response.json(), [])
        self.assertEqual(response.status_code, 200)

        self.checkInvalidRequest(['GET'], '/api/search/name/dummy/')

    def test_search_code(self):
        client = Client()
        response = client.get('/api/search/code/L0441.000400/')
        self.assertEqual(response.json(), [self.courseToDict(self.course4)])
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/search/code/M/')
        self.assertEqual(response.json(), [])
        self.assertEqual(response.status_code, 200)
        self.checkInvalidRequest(['GET'], '/api/search/code/dummy/')

    def test_course(self):
        client = Client()
        response = client.get('/api/course/1/')

        self.assertEqual(response.json(), self.courseToDict(self.course1))
        self.assertEqual(response.status_code, 200)
        self.checkInvalidRequest(['GET'], '/api/course/1/')

    def test_course_site(self):
        client = Client()
        response = client.get('/api/course/1/site/')
        self.assertEqual(response.json(), [self.siteToDict(self.site1)])
        self.assertEqual(response.status_code, 200)

        response = client.post(
            '/api/course/1/site/', self.siteToDict(self.site2), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(self.course1.siteList.all()[1].name, self.site2.name)
        self.checkInvalidRequest(['GET', 'POST'], '/api/course/1/site/')

    def test_user_course(self):
        client = Client()
        client.force_login(self.user)
        response = client.get('/api/user/course/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [self.courseCustomToDict(
            self.cc1), self.courseCustomToDict(self.cc2)])

        response = client.post(
            '/api/user/course/', json.dumps([self.courseToDict(self.course3), self.courseToDict(self.course4)]), content_type='application/json')
        self.assertEqual(self.userDetail.courseList.all()
                         [0].course.name, self.course3.name)
        self.assertEqual(self.userDetail.courseList.all()
                         [1].course.name, self.course4.name)
        self.assertEqual(response.status_code, 200)
        self.checkInvalidRequest(['GET', 'POST'], '/api/user/course/')

    def test_user_course_article(self):
        client = Client()
        client.force_login(self.user)
        response = client.get('/api/user/course/1/article/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [self.articleToDict(self.article2)])

        self.checkInvalidRequest(['GET'], '/api/user/course/1/article/')

    def test_user_newsfeed(self):
        client = Client()
        client.force_login(self.user)
        response = client.get('/api/user/newsfeed/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [self.articleToDict(
            self.article2), self.articleToDict(self.article3)])

        self.checkInvalidRequest(['GET'], '/api/user/newsfeed/')

    def test_user_article(self):
        client = Client()
        client.force_login(self.user)
        response = client.get('/api/user/article/2/')
        self.assertEqual(response.json(), self.articleToDict(self.article2))

        newArt = self.articleToDict(self.article2)
        newArt['star'] = True
        newArt['ignore'] = False
        response = client.put('/api/user/article/2/', json.dumps(newArt))
        self.assertIn(self.article2, self.userDetail.starList.all())
        self.assertNotIn(self.article2, self.userDetail.ignoreList.all())
        self.assertEqual(response.status_code, 200)

        self.checkInvalidRequest(['GET', 'PUT'], '/api/user/article/2/')

    def test_crawl(self):
        courseDataResult = crawler(1)
        # (name, lectureCode, profName, classNumber)
        answer = [('핀란드어 1', 'L0441.000100', '정도상', '001',
                   [(1, 155, 185), (4, 170, 180)]),
                  ('히브리어 1', 'L0441.000200', '김동혁', '001',
                   [(1, 125, 140), (1, 170, 180), (3, 125, 140)]),
                  ('독문강독', 'L0441.000300', '이호성', '001',
                   [(1, 140, 155), (3, 140, 155)]),
                  ('기초영어', 'L0441.000400', '백혜정', '001',
                   [(1, 160, 180), (3, 180, 190)]),
                  ('기초영어', 'L0441.000400', '박채윤', '002',
                   [(2, 160, 180), (5, 130, 140)]),
                  ('기초영어', 'L0441.000400', '여미영', '003',
                   [(3, 160, 180), (5, 140, 150)]),
                  ('기초영어', 'L0441.000400', '백혜정', '004',
                   [(4, 160, 180), (5, 100, 110)]),
                  ('기초영어', 'L0441.000400', '조충환', '005',
                   [(2, 170, 180), (5, 90, 110)]),
                  ('기초영어', 'L0441.000400', '박여선', '006',
                   [(2, 180, 190), (5, 110, 130)]),
                  ('기초영어', 'L0441.000400', '조충환', '007',
                   [(1, 180, 190), (5, 110, 130)])]
        self.assertEqual(courseDataResult, answer)

    def test_article_crawl(self):
        getArticles(self.site4, self.course1)
        s = list(Article.objects.filter(
            content__contains="[HW2] HW2의 성적을 공지드립니다.").all())
        self.assertIn("uid=437", s[0].url)

from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.contrib import auth
from django.core import serializers
from .crawl import crawl, crawler
from .models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import json

# Create your tests here.


class NoticeTrackerTestCase(TestCase):
    mock_minty = {'userId': 'minty', 'password': 'pw1'}
    mock_16silver = {'userId': '16silver', 'password': 'pw2'}

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

    def setUp(self):
        User.objects.create_user(username='minty', password='pw1')
        self.time1 = LectureTime(day=1, start=155, end=185)
        self.time2 = LectureTime(day=4, start=170, end=180)
        self.time1.save()
        self.time2.save()
        self.course1 = Course(
            id=1, name='핀란드어 1', lectureCode='L0441.000100', profName='정도상', classNumber='001')
        self.course1.save()
        self.course1.time.add(*[self.time1, self.time2])

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

        self.time6 = LectureTime(day=1, start=140, end=155)
        self.time7 = LectureTime(day=3, start=140, end=155)
        self.time6.save()
        self.time7.save()
        self.course3 = Course(name='독문강독', lectureCode='L0441.000300', profName='이호성',
                              classNumber='001')
        self.course3.save()
        self.course3.time.add(*[self.time6, self.time7])

        self.time8 = LectureTime(day=1, start=160, end=180)
        self.time9 = LectureTime(day=3, start=180, end=190)
        self.time8.save()
        self.time9.save()
        self.course4 = Course(name='기초영어', lectureCode='L0441.000400', profName='백혜정',
                              classNumber='001')
        self.course4.save()
        self.course4.time.add(*[self.time8, self.time9])

    def test_signup(self):
        client = Client()
        response = client.post(
            '/api/sign_up', json.dumps(self.mock_16silver), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            len(User.objects.filter(username='16silver').values()), 1)
        response = client.post(
            '/api/sign_up', "", content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.checkInvalidRequest(['POST'], '/api/sign_up')

    def test_signin(self):
        client = Client()
        response = client.post(
            '/api/sign_in', "", content_type='application/json')
        self.assertEqual(response.status_code, 400)
        response = client.post(
            '/api/sign_in', json.dumps(self.mock_minty), content_type='application/json')
        user = auth.get_user(client)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(user.is_authenticated)
        response = client.post(
            '/api/sign_in', json.dumps(self.mock_16silver), content_type='application/json')
        self.assertEqual(response.status_code, 401)
        self.checkInvalidRequest(['POST'], '/api/sign_in')

    def test_signout(self):
        client = Client()
        response = client.get('/api/sign_out')
        self.assertEqual(response.status_code, 401)

        client.login(username='minty', password='pw1')
        user = auth.get_user(client)
        self.assertTrue(user.is_authenticated)

        response = client.get('/api/sign_out')
        self.assertEqual(response.status_code, 204)
        user = auth.get_user(client)
        self.assertFalse(user.is_authenticated)
        self.checkInvalidRequest(['GET'], '/api/sign_out')

    def test_search_name(self):
        client = Client()
        response = client.get('/api/search/name/핀란드어')
        self.assertEqual(
            response.json(),
            [
                {
                    'id': 1,
                    'name': '핀란드어 1',
                    'lectureCode': 'L0441.000100',
                    'profName': '정도상',
                    'classNumber': 1,
                    'time':
                        [
                            {'id': 1, 'day': 1, 'start': 155, 'end': 185},
                            {'id': 2, 'day': 4, 'start': 170, 'end': 180}
                        ],
                    'sites': []
                }
            ]
        )

        response = client.get('/api/search/name/프랑스')
        self.assertEqual(response.json(), [])
        self.checkInvalidRequest(['GET'], '/api/search/name/dummy')

    def test_search_code(self):
        pass
        # client = Client()
        # response = client.get('/api/search/code/M')
        # # TODO
        # self.assertEqual(response.json(), ['GET'])

        # response = client.get('/api/search/code/100')
        # # TODO
        # # self.assertEqual(response.json(), [])
        # self.checkInvalidRequest(['GET'], '/api/search/code/dummy')

    def test_course(self):
        client = Client()
        response = client.get('/api/course/1')
        # TODO
        # self.assertEqual(response.json(), [])
        self.checkInvalidRequest(['GET'], '/api/course/1')

    def test_course_site(self):
        client = Client()
        response = client.get('/api/course/1/site')
        # TODO
        # self.assertEqual(response.json(), [])

        # TODO
        # response = client.post(
        #     '/api/course/1/site', json.dumps({}),  content_type='application/json')
        # self.assertEqual(response.status_code, 201)
        # self.checkInvalidRequest(['GET', 'POST'], '/api/course/1/site')

    def test_user_course(self):
        client = Client()
        response = client.post(
            '/api/signup', json.dumps(self.mock_16silver), content_type='application/json')
        response = client.get('/api/user/course')
        # TODO
        # self.assertEqual(response.json(), [])

        # TODO
        response = client.post(
            '/api/user/course', json.dumps({}), content_type='application/json')
        # self.assertEqual(response.status_code, 201)
        self.checkInvalidRequest(['GET', 'POST'], '/api/user/course')

    def test_user_course_article(self):
        client = Client()
        response = client.post(
            '/api/signup', json.dumps(self.mock_16silver), content_type='application/json')
        response = client.get('/api/user/course/1/article/1')
        # TODO
        # self.assertEqual(response.json(), [])

        # self.checkInvalidRequest(['GET'], '/api/user/course/1/article/1')

    def test_user_newsfeed(self):
        client = Client()
        response = client.post(
            '/api/signup', json.dumps(self.mock_16silver), content_type='application/json')
        response = client.get('/api/user/newsfeed/1')
        # TODO
        # self.assertEqual(response.json(), [])

        self.checkInvalidRequest(['GET'], '/api/user/newsfeed/1')

    def test_user_article(self):
        client = Client()
        response = client.post(
            '/api/signup', json.dumps(self.mock_16silver), content_type='application/json')
        response = client.get('/api/user/article/1')
        # TODO
        # self.assertEqual(str(response.content), json.dumps([]))

        # TODO
        response = client.put('/api/user/article/1', json.dumps({}))
        # self.assertEqual(response.status_code, 201)

        self.checkInvalidRequest(['GET', 'PUT'], '/api/user/article/1')

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

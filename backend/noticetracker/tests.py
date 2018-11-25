from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.contrib import auth
from .crawl import crawl, crawler
from .models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import json

# Create your tests here.


class NoticeTrackerTestCase(TestCase):
    mock_minty = {'username': 'minty', 'password': 'pw1'}
    mock_16silver = {'username': '16silver', 'password': 'pw2'}

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

    def test_signup(self):
        client = Client()
        response = client.post(
            '/api/signup', json.dumps(self.mock_16silver), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            len(User.objects.filter(username='16silver').values()), 1)
        response = client.post(
            '/api/signup', "", content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.checkInvalidRequest(['POST'], '/api/signup')

    def test_signin(self):
        client = Client()
        response = client.post(
            '/api/signin', "", content_type='application/json')
        self.assertEqual(response.status_code, 400)
        response = client.post(
            '/api/signin', json.dumps(self.mock_minty), content_type='application/json')
        user = auth.get_user(client)
        self.assertEqual(response.status_code, 204)
        self.assertTrue(user.is_authenticated)
        response = client.post(
            '/api/signin', json.dumps(self.mock_16silver), content_type='application/json')
        self.assertEqual(response.status_code, 401)
        self.checkInvalidRequest(['POST'], '/api/signin')

    def test_signout(self):
        client = Client()
        response = client.get('/api/signout')
        self.assertEqual(response.status_code, 401)

        client.login(username='minty', password='pw1')
        user = auth.get_user(client)
        self.assertTrue(user.is_authenticated)

        response = client.get('/api/signout')
        self.assertEqual(response.status_code, 204)
        user = auth.get_user(client)
        self.assertFalse(user.is_authenticated)
        self.checkInvalidRequest(['GET'], '/api/signout')

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

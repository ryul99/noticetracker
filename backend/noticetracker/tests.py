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
        response = client.post('/api/signup', "", content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.checkInvalidRequest(['POST'], '/api/signup')

    def test_signin(self):
        client = Client()
        response = client.post('/api/signin', "", content_type='application/json')
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

    def test_userInst(self):
        client = Client()
        response = client.get('/api/user/5')
        self.assertEqual(response.status_code, 404)
        response = client.get('/api/user/1')
        self.assertEqual(response.status_code, 200)
        self.assertIn('\"userId\": 1', str(response.content))
        self.assertIn('\"username\": \"minty\"', str(response.content))

    def test_crawl(self):
        # Do it if you are ready...
        # crawl()
        pass

    def test_course(self):
        client = Client()
        temp_course = Course(
            name='SWPP',
            lectureCode='A02',
            profName='skystar',
            classNumber=1)
        temp_course.save()
        response = client.get('/api/course')

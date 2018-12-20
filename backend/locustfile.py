from locust import HttpLocust, TaskSet, task
import json
import random


class LoadTask(TaskSet):
    def on_start(self):
        self.client.post(
            '/api/sign_in/', data=json.dumps({'userId': 'test', 'password': 'test'}))

    def on_stop(self):
        pass

    @task(1)
    def search_by_name(self):
        self.client.get('/api/search/name/공학수학/')

    @task(2)
    def search_by_code(self):
        self.client.get('/api/search/code/4190/')

    @task(3)
    def get_course(self):
        self.client.get('/api/course/100/')

    @task(4)
    def get_user_course(self):
        self.client.get('/user/course/')

    @task(5)
    def get_newsfeed(self):
        self.client.get('/user/newsfeed/')

    @task(6)
    def get_article(self):
        self.client.get('/user/article/1')


class WebsiteUser(HttpLocust):
    task_set = LoadTask
    min_wait = 3000
    max_wait = 8000

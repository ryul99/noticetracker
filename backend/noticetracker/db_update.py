from .models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import requests
import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup
from .crawlers.theory import Theory
from .crawlers.github import Github
import time
from datetime import datetime, timezone


def update_auto():
    while True:
        print("Update start: " + str(datetime.now(timezone.utc)))
        update()
        time.sleep(15)
        

def update():
    users = list(UserDetail.objects.all())
    for user in users:
        courses = list(user.courseList.all())
        for course in courses:
            sites = list(course.siteList.all())
            for site in sites:
                getArticles(site, course)


def getArticles(site, course):
    print(site.url)
    if "theory.snu.ac.kr" in site.url:
        Theory.getArticles(site, course)
    elif "github.com" in site.url:
        Github.getArticles(site, course)

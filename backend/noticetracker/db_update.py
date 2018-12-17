from .models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import requests
import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup
import time
from datetime import datetime, timezone
from .crawl_diff import scan

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
                scan(site, course)

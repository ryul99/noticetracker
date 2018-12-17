from .models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import requests
import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup
import time
from datetime import datetime, timezone
from .crawl_diff import scan
from .crawlers.theory import Theory
from .crawlers.github import Github


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
                if checkCrawlerExist(site, course):
                    pass
                else:
                    try:
                        scan(site, course.course)
                    except Exception:
                        print("An error occured during crawl " + site.url)


def checkCrawlerExist(site, course):
    if "theory.snu.ac.kr" in site.url:
        print("scan " + site.url + " is working")
        Theory.getArticles(site, course)
        return True
    elif "github.com" in site.url:
        print("scan " + site.url + " is working")
        Github.getArticles(site, course)
        return True
    else:
        return False

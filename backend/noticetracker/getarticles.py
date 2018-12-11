from .models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import requests
import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup
from .crawlers.theory import Theory

def getArticles(site, course):
    if "theory.snu.ac.kr" in site.url:
        Theory.getArticles(site, course)

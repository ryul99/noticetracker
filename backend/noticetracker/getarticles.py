from .models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import requests
import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup
from .crawlers import *

def getArticles(site, course):
    if "theory.snu.ac.kr" in siteUrl:
        theory.getArticles(site, course)

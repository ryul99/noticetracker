from .models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import requests
import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup

def getArticles(site, course): # theory.snu.ac.kr/?page_id=<id>
    pageNum = 1
    while True:
        html = requests.get(site.url + "&pageid=" + str(pageNum))
        if html.status_code == 200:
            bsObject = BeautifulSoup(html.text, "html.parser")
            tbody = bsObject.find('tbody')
            articles = tbody.find_all('tr')
            if len(articles) == 0:
                break
            for article in articles:
                pass
        pageNum += 1

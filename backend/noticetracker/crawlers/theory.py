from ..models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import requests
import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup
from datetime import datetime, timezone


class Theory:
    def getArticles(site, course):  # theory.snu.ac.kr/?page_id=<id>
        pageNum = 1
        while True:
            if not Theory.crawlPage(site, course, pageNum):
                break
            pageNum += 1

    def crawlPage(site, course, pageNum):
        if "http" not in site.url:
            site.url = "http://" + site.url
        print(site.url)
        html = requests.get(site.url + "&pageid=" + str(pageNum))
        if html.status_code == 200:
            bsObject = BeautifulSoup(html.text, "html.parser")
            tbody = bsObject.find('tbody')
            articles = tbody.find_all('tr')
            if len(articles) == 0:
                return False
            for article in articles:
                titleObject = article.find('a')
                content = titleObject.get_text()
                url = titleObject.get('href')
                uid = url[url.find('uid'):]
                newUrl = site.url + '&' + uid
                if Article.objects.filter(url=newUrl, fromSite=site).count() == 0:
                    articleData = Article(
                        content=content,
                        url=(site.url + '&' + uid),
                        updated=datetime.now(timezone.utc),
                        fromCourse=course.course,
                        fromSite=site
                    )
                    articleData.save()
            return True
        else:
            return False

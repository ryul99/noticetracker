from ..models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import requests
import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup
from datetime import datetime, timezone


class Github:
    def getArticles(site, course):  # theory.snu.ac.kr/?page_id=<id>
        pageNum = 1
        while True:
            if not Github.crawlPage(site, course, pageNum):
                break
            pageNum += 1

    def crawlPage(site, course, pageNum):
        if "http" not in site.url:
            site.url = "https://" + site.url
        repoUrl = site.url[site.url.find('github.com') + len('github.com'):]
        apiUrl = "https://api.github.com/repos"
        # print(apiUrl + repoUrl + '/issues?page=' + str(pageNum))
        html = requests.get(apiUrl + repoUrl + '/issues?page=' + str(pageNum))

        if html.status_code == 200:
            issueList = html.json()
            # print(issueList)
            if len(issueList) == 0:
                return False
            for issue in issueList:
                # print(issue)
                content = issue["title"]
                url = issue["html_url"]
                if len(Article.objects.filter(url=url)) == 0:
                    articleData = Article(
                        content=content,
                        url=url,
                        updated=datetime.now(timezone.utc),
                        fromCourse=course.course,
                        fromSite=site
                    )
                    articleData.save()
            return True
        else:
            return False

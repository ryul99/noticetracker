from ..models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import requests
import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup
from datetime import datetime, timezone
import re
from ..crawl_init import rawHref2Url


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

        '''
        # below code uses github api: not using due to api limits

        repoUrl = site.url[site.url.find('github.com') + len('github.com'):]
        apiUrl = "https://api.github.com/repos"
        # print(apiUrl + repoUrl + '/issues?page=' + str(pageNum))
        headers = {'User-Agent': 'NoticeTracker'}
        html = requests.get(apiUrl + repoUrl +
                            '/issues?page=' + str(pageNum), headers=headers)

        if html.status_code == 200:
            issueList = html.json()
            # print(issueList)
            if len(issueList) == 0:
                return False
            for issue in issueList:
                content = issue["title"]
                url = issue["html_url"]
                if Article.objects.filter(url=url, fromSite=site).count() == 0:
                    articleData = Article(
                        content=content,
                        url=url,
                        updated=datetime.now(timezone.utc),
                        fromCourse=course.course,
                        fromSite=site
                    )
                    print("NEW article: " + url)
                    articleData.save()
            return True
        else:
            # print("Github returned " + str(html.status_code))
            # print(html.text)
            return False

        '''

        repoUrl = site.url[site.url.find('github.com') + len('github.com'):]
        headers = { 'User-Agent': 'NoticeTracker' }
        crawlUrl = site.url + '?page=' + str(pageNum)
        html = requests.get(crawlUrl, headers=headers)
        print("crawl try: " + site.url)

        if html.status_code == 200:
            bsObject = BeautifulSoup(html.text, "html.parser")
            issues = bsObject.find_all("a", id=re.compile("issue.*"))
            if len(issues) == 0:
                return False
            slicedUrl = re.findall('([^/]+[/]{2})?([^/]+)', crawlUrl)
            root = slicedUrl[0][1]  # e.g. stackoverflow.com
            for issue in issues:
                content = issue.get_text()
                url = issue.get('href')
                if url == None or url == "":
                    continue
                url = rawHref2Url(url, root, slicedUrl)
                if Article.objects.filter(url=url, fromSite=site).count() == 0:
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

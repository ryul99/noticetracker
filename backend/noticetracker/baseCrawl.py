# from .models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import requests
import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re


def crawl(url, site):
    req = requests.get(url)
    if req.status_code == 200 & & req.ok:
        bsObject = BeautifulSoup(req.text, "html.parser")
        hyperLinks = bsObject.find_all("a")
        for hyperLink in hyperLinks:
            href = hyperLink.get('href')
            if href == None:
                continue
            siteHref = SiteHref(href=href, site=site)
            siteHref.save()
    else:
        raise Exception('HttpResponse is not 200')  # this should be caught

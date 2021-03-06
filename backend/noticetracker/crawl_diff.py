from .models import LectureTime, Site, Course, CourseCustom, Article, UserDetail, SiteHref
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
import requests
import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re
from .crawl_init import crawl


def scan(site, course):
    print("scan {} is working".format(site.url))
    url = site.url
    hrefs = crawl(url)
    addedHrefs = list()
    for href in hrefs:
        searchedHref = site.hrefs.filter(href=href)
        if searchedHref.count() == 0:
            addedHrefs.append(href)
    # for href in site.hrefs.all():  # need to test
    #     if href.href not in hrefs:
    #         href.delete()
    for href in addedHrefs:
        article = Article(url=href, fromSite=site, fromCourse=course)
        article.save()
        sitehref = SiteHref(href=href, site=site)
        sitehref.save()

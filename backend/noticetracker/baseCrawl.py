# from .models import LectureTime, Site, Course, CourseCustom, Article, UserDetail, SiteHref
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
import requests
import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re


def rawHref2Url(href, root, slicedUrl):
    ret = href
    val = URLValidator()
    try:
        val(href)
    except ValidationError:
        if href[0] == "/":
            ret = root + href
        else:
            # remove last elements
            r = "/".join([i[1] for i in slicedUrl[0:len(slicedUrl) - 1]])
            ret = r + '/' + href
    return ret


def crawl(url, site):
    req = requests.get(url)
    if req.status_code == 200 and req.ok:
        slicedUrl = re.findall('([^/]+[/]{2})?([^/]+)', url)
        root = slicedUrl[0][1]  # e.g. stackoverflow.com
        bsObject = BeautifulSoup(req.text, "html.parser")
        hyperLinks = bsObject.find_all("a")
        for hyperLink in hyperLinks:
            href = hyperLink.get('href')
            if href == None:
                continue
            href = rawHref2Url(href, root, slicedUrl)
            siteHref = SiteHref(href=href, site=site)
            siteHref.save()
    else:
        raise Exception('HttpResponse is not 200')  # this should be caught

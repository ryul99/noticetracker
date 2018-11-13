from .models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import requests
import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup

def crawl():
    url_front = "http://sugang.snu.ac.kr/sugang/cc/cc100.action?workType=S&pageNo="
    url_back = "&srchCond=1&srchOpenSchyy=2018&srchOpenShtm=U000200002U000300001"
    html = requests.get(url_front + "1" + url_back)

    bsObject = BeautifulSoup(html.text, "html.parser")
    

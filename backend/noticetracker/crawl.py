from .models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import requests
import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup

def crawl():
    url_front = "http://sugang.snu.ac.kr/sugang/cc/cc100.action?workType=S&pageNo="
    url_back = "&srchCond=1&srchOpenSchyy=2018&srchOpenShtm=U000200002U000300001"
    html = requests.get(url_front + '1' + url_back)
    bsObject = BeautifulSoup(html.text, "html.parser")
    if html.status_code == 200:
        numOfCourse = bsObject.find('span', {'class':'fc_o'})
        for i in range(0, 727): # ((numOfCourse // 10)+1)) has error, need to fix
            crawler(i)
    else:
        raise Exception('HttpResponse is not 200')


def crawler(i):
    url_front = "http://sugang.snu.ac.kr/sugang/cc/cc100.action?workType=S&pageNo="
    url_back = "&srchCond=1&srchOpenSchyy=2018&srchOpenShtm=U000200002U000300001"
    html = requests.get(url_front + str(i) + url_back)
    if html.status_code == 200:
        check = 0
        bsObject = BeautifulSoup(html.text, "html.parser")
        tbodyList = bsObject.find_all('tbody')
        rawCourse = tbodyList[1]
        course = rawCourse.find_all('tr')
        courseData = Course(
            name = 'name',
            lectureCode = 'lectureCode',
            profName = 'profName',
            classNumber = 0
        )
        for c in course:
            if c['class'] == 'even':
                if check == 1:
                    check = 0
                    divCource = c.find_all('td')
                    name = divCource[8].text
                    lectureCode = divCource[6].text
                    profName = divCource[13].text
                    classNumber = divCource[7].text
                    time = divCource[10].text
                    courseData = Course(
                        name = name,
                        lectureCode = lectureCode,
                        profName = profName,
                        classNumber = classNumber
                    )
                    courseData.save()
                    day = 1
                    start = 1
                    end = 1
                    minute = 0;
                    if time[0] == '월':
                        day = 1
                    if time[0] == '화':
                        day = 2
                    if time[0] == '수':
                        day = 3
                    if time[0] == '목':
                        day = 4
                    if time[0] == '금':
                        day = 5
                    if time[0] == '토':
                        day = 6
                    if time[0] == '일':
                        day = 7
                    if int(time[5:7]) == 30:
                        minute = 5
                    else:
                        minute = 0
                    start = int(time[2:4]) * 10 + minute

                    if int(time[11:13]) == 30:
                        minute = 5
                    else:
                        minute = 0
                    end = int(time[8:10]) * 10 + minute
                    lectureTimeData = LectureTime(
                        day = day,
                        start = start,
                        end = end
                    )
                    lectureTimeData.save()
                    courseData.time.add(lectureTimeData)
                else:
                    divCource = c.find_all('td')
                    time = divCource[0].text
                    day = 1
                    start = 1
                    end = 1
                    minute = 0;
                    if time[0] == '월':
                        day = 1
                    if time[0] == '화':
                        day = 2
                    if time[0] == '수':
                        day = 3
                    if time[0] == '목':
                        day = 4
                    if time[0] == '금':
                        day = 5
                    if time[0] == '토':
                        day = 6
                    if time[0] == '일':
                        day = 7
                    if int(time[5:7]) == 30:
                        minute = 5
                    else:
                        minute = 0
                    start = int(time[2:4]) * 10 + minute

                    if int(time[11:13]) == 30:
                        minute = 5
                    else:
                        minute = 0
                    end = int(time[8:10]) * 10 + minute
                    lectureTimeData = LectureTime(
                        day = day,
                        start = start,
                        end = end
                    )
                    lectureTimeData.save()
                    courseData.time.add(lectureTimeData)
            else:
                if check == 0:
                    check = 1
                    divCource = c.find_all('td')
                    name = divCource[8].text
                    lectureCode = divCource[6].text
                    profName = divCource[13].text
                    classNumber = divCource[7].text
                    time = divCource[10].text
                    courseData = Course(
                        name = name,
                        lectureCode = lectureCode,
                        profName = profName,
                        classNumber = classNumber
                    )
                    courseData.save()
                    day = 1
                    start = 1
                    end = 1
                    minute = 0;
                    if time[0] == '월':
                        day = 1
                    if time[0] == '화':
                        day = 2
                    if time[0] == '수':
                        day = 3
                    if time[0] == '목':
                        day = 4
                    if time[0] == '금':
                        day = 5
                    if time[0] == '토':
                        day = 6
                    if time[0] == '일':
                        day = 7
                    if int(time[5:7]) == 30:
                        minute = 5
                    else:
                        minute = 0
                    start = int(time[2:4]) * 10 + minute

                    if int(time[11:13]) == 30:
                        minute = 5
                    else:
                        minute = 0
                    end = int(time[8:10]) * 10 + minute
                    lectureTimeData = LectureTime(
                        day = day,
                        start = start,
                        end = end
                    )
                    lectureTimeData.save()
                    courseData.time.add(lectureTimeData)
                else:
                    divCource = c.find_all('td')
                    time = divCource[0].text
                    day = 1
                    start = 1
                    end = 1
                    minute = 0;
                    if time[0] == '월':
                        day = 1
                    if time[0] == '화':
                        day = 2
                    if time[0] == '수':
                        day = 3
                    if time[0] == '목':
                        day = 4
                    if time[0] == '금':
                        day = 5
                    if time[0] == '토':
                        day = 6
                    if time[0] == '일':
                        day = 7
                    if int(time[5:7]) == 30:
                        minute = 5
                    else:
                        minute = 0
                    start = int(time[2:4]) * 10 + minute

                    if int(time[11:13]) == 30:
                        minute = 5
                    else:
                        minute = 0
                    end = int(time[8:10]) * 10 + minute
                    lectureTimeData = LectureTime(
                        day = day,
                        start = start,
                        end = end
                    )
                    lectureTimeData.save()
                    courseData.time.add(lectureTimeData)
    else:
        raise Exception('HttpResponse is not 200')

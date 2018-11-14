from .models import LectureTime, Site, Course, CourseCustom, Article, UserDetail
import requests
import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup

daysToNumber = {"월": 1, "화": 2, "수": 3, "목": 4, "금": 5, "토": 6, "일": 7}

def crawl():
    url_front = "http://sugang.snu.ac.kr/sugang/cc/cc100.action?workType=S&pageNo="
    url_back = "&srchCond=1&srchOpenSchyy=2018&srchOpenShtm=U000200002U000300001"
    html = requests.get(url_front + '1' + url_back)
    bsObject = BeautifulSoup(html.text, "html.parser")
    if html.status_code == 200:
        numOfCourse = bsObject.find('span', {'class':'fc_o'})
        print("numOfCourse = %s" % numOfCourse.text)
        for i in range(1, ((int(numOfCourse.text)+9) // 10)): # ((numOfCourse // 10)+1)) has error, need to fix
            crawler(i)
    else:
        raise Exception('HttpResponse is not 200')


def lectureTimeDataProcess(courseData, time):
    if len(time) > 0:
        day = daysToNumber[time[0]]
        startMinute = int(time[5:7])
        if startMinute == 30:
            minute = 5
        else:
            minute = 0
        start = int(time[2:4]) * 10 + minute

        endMinute = int(time[11:13])
        if endMinute == 0:
            minute = 0
        elif endMinute <= 30:
            minute = 5
        else:
            minute = 10
        end = int(time[8:10]) * 10 + minute
        lectureTimeData = LectureTime(
            day = day,
            start = start,
            end = end
        )
        print(day, start, end)
        lectureTimeData.save()
        courseData.time.add(lectureTimeData)

def crawler(i):
    url_front = "http://sugang.snu.ac.kr/sugang/cc/cc100.action?workType=S&pageNo="
    url_back = "&srchCond=1&srchOpenSchyy=2018&srchOpenShtm=U000200002U000300001"
    html = requests.get(url_front + str(i) + url_back)
    if html.status_code == 200:
        idx = 0
        check = 0
        timeCount = 0
        bsObject = BeautifulSoup(html.text, "html.parser")
        tbodyList = bsObject.find('html').extract()
        rawCourse = bsObject
        course = rawCourse.find_all('td')
        divCource = bsObject.find_all('td')
        name = divCource[7].text
        lectureCode = divCource[5].text
        profName = divCource[12].text
        classNumber = divCource[6].text
        time = divCource[9].text
        print(name, lectureCode, profName, classNumber, time)
        courseData = Course(
            name = name,
            lectureCode = lectureCode,
            profName = profName,
            classNumber = classNumber
        )
        courseData.save()
        lectureTimeDataProcess(courseData, time)

        for c in course:
            if 'class' in c and c['class'] == 'blue_st':
                if check == 14 or check == 10:
                    name = course[idx - 2].text
                    lectureCode = course[idx - 4].text
                    profName = course[idx + 3].text
                    classNumber = course[idx - 3].text
                    courseData = Course(
                        name = name,
                        lectureCode = lectureCode,
                        profName = profName,
                        classNumber = classNumber
                    )
                    courseData.save()
                if check != 0:
                    lectureTimeDataProcess(courseData, c.text)
                    timeCount = 0
                else:
                    if (timeCount % 3) == 0:
                        lectureTimeDataProcess(courseData, c.text)
                check = 0
                timeCount = timeCount + 1
            else:
                check = check + 1
            idx = idx + 1
    else:
        raise Exception('HttpResponse is not 200')

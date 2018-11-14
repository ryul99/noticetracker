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
        numOfCourse = bsObject.find('span', {'class': 'fc_o'})
        # print("numOfCourse = %s" % numOfCourse.text)
        for i in range(1, ((int(numOfCourse.text) + 9) // 10)):
            crawler(i)
    else:
        raise Exception('HttpResponse is not 200')


def lectureTimeDataProcess(courseData, time):
    if len(time) > 0:
        if time[0] in daysToNumber:
            day = daysToNumber[time[0]]
        else:
            return
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
            day=day,
            start=start,
            end=end
        )
        # print(day, start, end)
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

        courseData = None
        while idx < len(course):
            c = course[idx]
            if 'input name="check"' in str(c) or idx == 0:
                if idx == 0:
                    idx = -1
                name = course[idx + 8].text
                lectureCode = course[idx + 6].text
                profName = course[idx + 13].text
                classNumber = course[idx + 7].text
                courseData = Course(
                    name=name,
                    lectureCode=lectureCode,
                    profName=profName,
                    classNumber=classNumber
                )
                # print(name, lectureCode, profName, classNumber)
                courseData.save()

                # Process LectureTime.
                timeIndex = idx + 10
                lectureTimeDataProcess(courseData, course[timeIndex].text)

                timeIndex += 8
                while timeIndex < len(course) and course[timeIndex].has_attr('class') and course[timeIndex]['class'][0] == 'blue_st':
                    lectureTimeDataProcess(courseData, course[timeIndex].text)
                    timeIndex += 3
            if idx == -1:
                idx = 0
            idx += 1
    else:
        raise Exception('HttpResponse is not 200')

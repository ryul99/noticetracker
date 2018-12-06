from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

# Create your models here.


class LectureTime(models.Model):
    day = models.IntegerField()
    start = models.IntegerField()
    end = models.IntegerField()

    def toDict(self):
        return {'day': self.day, 'start': self.start, 'end': self.end}


class Site(models.Model):
    name = models.TextField(default="")
    url = models.TextField(default="")
    lastUpdated = models.DateTimeField(default=now)

    def toDict(self):
        return {'name': self.name, 'url': self.url, 'lastUpdated': self.lastUpdated}


class Course(models.Model):
    name = models.CharField(max_length=120)  # ex) Principles and Practices ...
    time = models.ManyToManyField(LectureTime)
    siteList = models.ManyToManyField(Site)
    lectureCode = models.CharField(max_length=120)  # ex) M1522.000100
    profName = models.CharField(max_length=120)
    classNumber = models.IntegerField()

    def toDict(self):
        return {
            'id': self.id,
            'name': self.name,
            'time': list(map(LectureTime.toDict, self.time.all())),
            'siteList': list(map(Site.toDict, self.siteList.all())),
            'lectureCode': self.lectureCode,
            'profName': self.profName,
            'classNumber': self.classNumber
        }


class Article(models.Model):
    content = models.TextField(default="")
    url = models.TextField(default="")
    updated = models.DateTimeField(default=now)
    fromCourse = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='articles')
    fromSite = models.ForeignKey(
        Site, on_delete=models.CASCADE, related_name='articles')


class CourseCustom(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    siteList = models.ManyToManyField(Site)
    lastUpdated = models.DateTimeField(default=now)


class UserDetail(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    courseList = models.ManyToManyField(CourseCustom)
    starList = models.ManyToManyField(Article, related_name="star")
    ignoreList = models.ManyToManyField(Article, related_name="ignore")

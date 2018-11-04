from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class LectureTime(models.Model):
    day = models.IntegerField()
    start = models.IntegerField()
    end = models.IntegerField()

class Site(models.Model):
    url = models.TextField() # ex) https://github.com/swsnu/swppfall2018
    lastUpdated = models.DateTimeField()
    articleList = models.ManyToManyField(Article)

class Course(models.Model):
    name = models.CharField(max_length=120) # ex) Principles and Practices ...
    time = models.ManyToManyField(LectureTime)
    siteList = models.ManyToManyField(Site)
    classCode = models.CharField(max_length=120) # ex) M1522.000100

class CourseCustom(models.Model):
    course = models.ForeignKey(Course)
    siteList = models.ManyToManyField(Site)
    lastUpdated = models.DateTimeField()

class Article(models.Model):
    url = models.TextField()
    fromSite = models.ForeignKey(Site, on_delete=models.CASCADE)

class UserDetail(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    courseList = models.ManyToManyField(CourseCustom)
    starList = models.ManyToManyField(Article)
    ignoreList = models.ManyToManyField(Article)

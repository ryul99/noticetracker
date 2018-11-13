from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class LectureTime(models.Model):
    day = models.IntegerField()
    start = models.IntegerField()
    end = models.IntegerField()

class Article(models.Model):
    url = models.TextField()

class Site(models.Model):
    url = models.TextField() # ex) https://github.com/swsnu/swppfall2018
    lastUpdated = models.DateTimeField()

Article.fromSite = models.ForeignKey(Site, on_delete=models.CASCADE)
Site.articleList = models.ManyToManyField(Article)

class Course(models.Model):
    name = models.CharField(max_length=120) # ex) Principles and Practices ...
    time = models.ManyToManyField(LectureTime)
    siteList = models.ManyToManyField(Site)
    classCode = models.CharField(max_length=120) # ex) M1522.000100

class CourseCustom(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    siteList = models.ManyToManyField(Site)
    lastUpdated = models.DateTimeField()

class UserDetail(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    courseList = models.ManyToManyField(CourseCustom)
    starList = models.ManyToManyField(Article, related_name="star")
    ignoreList = models.ManyToManyField(Article, related_name="ignore")

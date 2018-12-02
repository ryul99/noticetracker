from django.urls import path
from noticetracker import views

urlpatterns = [
    path('signin', views.signin, name='signin'),
    path('signup', views.signup, name='signup'),
    path('signout', views.signout, name='signout'),
    path('search/name/<str:courseName>',
         views.searchByName, name='searchByName'),
    path('search/code/<str:courseCode>',
         views.searchByCode, name='searchByCode'),
    path('course/<int:courseId>', views.courseDetail, name='courseDetail'),
    path('course/<int:courseId>/site',
         views.sitesByCourseId, name='sitesByCourseId'),
    path('user/course', views.userCourse, name='userCourse'),
    path('user/course/<int: courseId>/article/<int:pageId>',
         views.courseArticles, name='courseArticles')
    path('user/newsfeed/<int:pageId>', views.newsfeedPage, name='newsfeedPage'),
    path('user/article/<int:articleId>',
         views.userArticle, name='userArticle')
]

from django.urls import path
from noticetracker import views

urlpatterns = [
    path('sign_in/', views.signin, name='signin'),
    path('sign_up/', views.signup, name='signup'),
    path('sign_out/', views.signout, name='signout'),
    path('search/name/<str:courseName>/',
         views.searchByName, name='searchByName'),
    path('search/code/<str:courseCode>/',
         views.searchByCode, name='searchByCode'),
    path('course/<int:courseId>/', views.courseDetail, name='courseDetail'),
    path('course/<int:courseId>/site/',
         views.sitesByCourseId, name='sitesByCourseId'),
    path('user/course/', views.userCourse, name='userCourse'),
    path('user/course/<int: courseId>/article/',
         views.courseArticles, name='courseArticles'),
    path('user/newsfeed/', views.newsfeedPage, name='newsfeedPage'),
    path('user/article/<int:articleId>/',
         views.userArticle, name='userArticle')
]

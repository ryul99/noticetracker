from django.urls import path
from noticetracker import views

urlpatterns = [
    path('auth/', views.checkAuth, name='checkAuth'),
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
    path('user/course/<int:courseId>/article/',
         views.userCourseArticle, name='userCourseArticle'),
    path('user/course/<int:courseId>/site/',
         views.userCourseSite, name='userCourseSite'),
    path('user/newsfeed/', views.userNewsfeed, name='userNewsfeed'),
    path('user/article/<int:articleId>/',
         views.userArticle, name='userArticle')
]

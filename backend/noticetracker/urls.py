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
    path('course/<int:courseId>/site/<int:siteId>',
         views.deleteSiteFromCourse, name='deleteSiteFromCourse'),
    path('course/<int:courseId>/article',
         views.courseArticles, name='courseArticles'),
    path('article/<int:articleId>', views.articleOfArticleId,
         name='articleOfArticleId'),
    path('user/course', views.userCourse, name='userCourse'),
    path('user/site', views.userSite, name='userSite'),
    path('user/newsfeed/<int:pageId>', views.newsfeedPage, name='newsfeedPage'),
    path('user/article/<int:articleId>',
         views.updateArticle, name='updateArticle')
]

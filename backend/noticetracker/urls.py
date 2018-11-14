from django.urls import path
from noticetracker import views

urlpatterns = [
    path('signin', views.signin, name='signin'),
    path('signup', views.signup, name='signup'),
    path('signout', views.signout, name='signout'),
    path('user/<int:userId>', views.userInst, name='userInst'),
    path('course', views.course, name='course'),
    path('course/<int:courseId>', views.courseDetail, name='courseDetail'),
]

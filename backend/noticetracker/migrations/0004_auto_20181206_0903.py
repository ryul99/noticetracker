# Generated by Django 2.1.4 on 2018-12-06 09:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('noticetracker', '0003_auto_20181206_0223'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='fromCourse',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='articles', to='noticetracker.Course'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='article',
            name='fromSite',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='articles', to='noticetracker.Site'),
            preserve_default=False,
        ),
    ]
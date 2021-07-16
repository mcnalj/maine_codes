# Generated by Django 3.2.5 on 2021-07-16 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mc_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='javascriptpunctuation',
            name='timesShown',
        ),
        migrations.AddField(
            model_name='javascriptpunctuation',
            name='distractoreIsCodeSnippet',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='javascriptpunctuation',
            name='isCodeSnippet',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='javascriptpunctuation',
            name='isRandomized',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='javascriptpunctuation',
            name='topic',
            field=models.CharField(default='', max_length=100),
        ),
    ]

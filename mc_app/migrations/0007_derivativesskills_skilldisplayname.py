# Generated by Django 3.2.5 on 2021-08-12 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mc_app', '0006_auto_20210728_2008'),
    ]

    operations = [
        migrations.AddField(
            model_name='derivativesskills',
            name='skillDisplayName',
            field=models.CharField(default='SIMPLE DERIVATIVES', max_length=200),
            preserve_default=False,
        ),
    ]
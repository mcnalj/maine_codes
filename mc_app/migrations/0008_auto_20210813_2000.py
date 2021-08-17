# Generated by Django 3.2.5 on 2021-08-13 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mc_app', '0007_derivativesskills_skilldisplayname'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprogress',
            name='fractionalExponentsAdvancedMixMaxCorrect',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='fractionalExponentsAdvancedMixPercentCorrect',
            field=models.IntegerField(default=100),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='fractionalExponentsAndFractionalCoefficientsMaxCorrect',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='fractionalExponentsAndFractionalCoefficientsPercentCorrect',
            field=models.IntegerField(default=100),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='fractionalExponentsAndNegativeCoefficientsMaxCorrect',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='fractionalExponentsAndNegativeCoefficientsPercentCorrect',
            field=models.IntegerField(default=100),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='fractionalExponentsBasicMixMaxCorrect',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='fractionalExponentsBasicMixPercentCorrect',
            field=models.IntegerField(default=100),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='masteredFractionalExponentsAdvancedMix',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='masteredFractionalExponentsAndFractionalCoefficients',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='masteredFractionalExponentsAndNegativeCoefficients',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='masteredFractionalExponentsBasicMix',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='masteredNegativeExponentsAdvancedMix',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='masteredNegativeExponentsAndCoefficients',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='masteredNegativeExponentsAndFractionalCoefficients',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='masteredNegativeExponentsBasicMix',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='masteredNegativeFractionalExponents',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='masteredNegativeFractionalExponentsAdvancedMix',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='masteredNegativeFractionalExponentsAndFractionalCoefficients',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='masteredNegativeFractionalExponentsAndNegativeCoefficients',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='masteredNegativeFractionalExponentsBasicMix',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeExponentsAdvancedMixMaxCorrect',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeExponentsAdvancedMixPercentCorrect',
            field=models.IntegerField(default=100),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeExponentsAndCoefficientsMaxCorrect',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeExponentsAndCoefficientsPercentCorrect',
            field=models.IntegerField(default=100),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeExponentsAndFractionalCoefficientsMaxCorrect',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeExponentsAndFractionalCoefficientsPercentCorrect',
            field=models.IntegerField(default=100),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeExponentsBasicMixMaxCorrect',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeExponentsBasicMixPercentCorrect',
            field=models.IntegerField(default=100),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeFractionalExponentsAdvancedMixMaxCorrect',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeFractionalExponentsAdvancedMixPercentCorrect',
            field=models.IntegerField(default=100),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeFractionalExponentsAndFractionalCoefficientsMaxCorrect',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeFractionalExponentsAndFractionalCoefficientsPercentCorrect',
            field=models.IntegerField(default=100),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeFractionalExponentsAndNegativeCoefficientsMaxCorrect',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeFractionalExponentsAndNegativeCoefficientsPercentCorrect',
            field=models.IntegerField(default=100),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeFractionalExponentsBasicMixMaxCorrect',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeFractionalExponentsBasicMixPercentCorrect',
            field=models.IntegerField(default=100),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeFractionalExponentsMaxCorrect',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprogress',
            name='negativeFractionalExponentsPercentCorrect',
            field=models.IntegerField(default=100),
        ),
    ]

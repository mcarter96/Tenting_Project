# Generated by Django 2.0.9 on 2018-11-03 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0007_auto_20181103_1556'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='phone_number',
            field=models.IntegerField(default=-1),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='student_id',
            field=models.IntegerField(default=-1),
        ),
    ]

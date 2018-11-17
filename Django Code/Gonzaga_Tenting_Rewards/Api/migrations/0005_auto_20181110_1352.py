# Generated by Django 2.0.8 on 2018-11-10 21:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0004_tentgroup'),
    ]

    operations = [
        migrations.AddField(
            model_name='tentgroup',
            name='qr_code_str',
            field=models.CharField(default=32, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tentgroup',
            name='tent_pin',
            field=models.IntegerField(default=21),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tentgroup',
            name='tenter_2',
            field=models.ForeignKey(default=3, on_delete=django.db.models.deletion.CASCADE, related_name='tenter_2', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tentgroup',
            name='tenter_3',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='tenter_3', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tentgroup',
            name='tenter_4',
            field=models.ForeignKey(default=7, on_delete=django.db.models.deletion.CASCADE, related_name='tenter_4', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tentgroup',
            name='tenter_5',
            field=models.ForeignKey(default=6, on_delete=django.db.models.deletion.CASCADE, related_name='tenter_5', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tentgroup',
            name='tenter_6',
            field=models.ForeignKey(default=5, on_delete=django.db.models.deletion.CASCADE, related_name='tenter_6', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='tentgroup',
            name='tenter_1',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tenter_1', to=settings.AUTH_USER_MODEL),
        ),
    ]

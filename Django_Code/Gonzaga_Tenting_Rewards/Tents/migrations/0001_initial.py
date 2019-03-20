# Generated by Django 2.0.9 on 2019-03-20 19:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Game', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TentGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tent_pin', models.IntegerField()),
                ('qr_code_str', models.CharField(max_length=100)),
                ('tent_number', models.IntegerField(null=True)),
                ('game_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='game_id', to='Game.Game')),
            ],
        ),
    ]

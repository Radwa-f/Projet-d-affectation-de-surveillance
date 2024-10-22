# Generated by Django 5.0.3 on 2024-05-12 10:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0003_exam_delete_timeslot_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='filiere',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.CreateModel(
            name='Assignments',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('surveillant', models.CharField(max_length=100)),
                ('exam', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Api.exam')),
            ],
        ),
    ]

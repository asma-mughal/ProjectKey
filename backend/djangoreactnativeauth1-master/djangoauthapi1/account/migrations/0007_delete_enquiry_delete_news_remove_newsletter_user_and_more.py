# Generated by Django 4.0.3 on 2022-07-05 09:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0006_enquiry_news_usercompetitions'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Enquiry',
        ),
        migrations.DeleteModel(
            name='News',
        ),
        migrations.RemoveField(
            model_name='newsletter',
            name='user',
        ),
        migrations.DeleteModel(
            name='UserCompetitions',
        ),
        migrations.DeleteModel(
            name='NewsLetter',
        ),
    ]

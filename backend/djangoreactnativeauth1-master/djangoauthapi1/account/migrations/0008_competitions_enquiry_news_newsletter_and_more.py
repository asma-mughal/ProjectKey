# Generated by Django 4.0.3 on 2022-07-05 09:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0007_delete_enquiry_delete_news_remove_newsletter_user_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Competitions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cmp_title', models.CharField(max_length=120)),
                ('cmp_deadline', models.CharField(max_length=120)),
            ],
        ),
        migrations.CreateModel(
            name='Enquiry',
            fields=[
                ('User_Name', models.CharField(max_length=120)),
                ('User_LastName', models.CharField(blank=True, max_length=120, null=True)),
                ('User_email', models.EmailField(max_length=120)),
                ('User_phone', models.CharField(max_length=120)),
                ('User_enquiry', models.CharField(max_length=150)),
                ('User_Consent', models.BooleanField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('News_title', models.CharField(max_length=120)),
                ('News_type', models.CharField(max_length=120)),
                ('News_time', models.CharField(max_length=120)),
                ('News_date', models.CharField(max_length=120)),
                ('News_image', models.ImageField(blank=True, null=True, upload_to='uploads/')),
                ('News_detail', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='NewsLetter',
            fields=[
                ('User_Name', models.CharField(max_length=120)),
                ('User_LastName', models.CharField(max_length=120)),
                ('User_email', models.EmailField(max_length=120)),
                ('User_agreement', models.BooleanField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserCompetitions',
            fields=[
                ('User_FirstName', models.CharField(max_length=120)),
                ('User_LastName', models.CharField(max_length=120)),
                ('User_Street_Address', models.CharField(max_length=120)),
                ('User_Address_Line', models.CharField(max_length=120)),
                ('User_City', models.CharField(max_length=120)),
                ('User_State', models.CharField(max_length=120)),
                ('User_Zip', models.CharField(max_length=120)),
                ('User_Country', models.CharField(max_length=120)),
                ('User_email', models.EmailField(max_length=120)),
                ('User_phone', models.CharField(max_length=120)),
                ('User_Location', models.CharField(max_length=120)),
                ('User_consent', models.BooleanField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

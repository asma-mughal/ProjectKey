# Generated by Django 4.0.3 on 2022-07-05 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_newsletter_order_cart'),
    ]

    operations = [
        migrations.CreateModel(
            name='Enquiry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('User_Name', models.CharField(max_length=120)),
                ('User_LastName', models.CharField(blank=True, max_length=120, null=True)),
                ('User_email', models.EmailField(max_length=120)),
                ('User_phone', models.CharField(max_length=120)),
                ('User_enquiry', models.CharField(max_length=150)),
                ('User_Consent', models.BooleanField()),
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
            name='UserCompetitions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
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
            ],
        ),
    ]

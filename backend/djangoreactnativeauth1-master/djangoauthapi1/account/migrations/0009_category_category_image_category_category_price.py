# Generated by Django 4.0.3 on 2022-07-05 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0008_competitions_enquiry_news_newsletter_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='Category_Image',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/'),
        ),
        migrations.AddField(
            model_name='category',
            name='Category_Price',
            field=models.DecimalField(decimal_places=2, default=99.99, max_digits=15),
        ),
    ]
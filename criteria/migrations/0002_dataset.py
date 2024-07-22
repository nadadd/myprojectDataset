# Generated by Django 5.0.6 on 2024-06-25 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('criteria', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Dataset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('data_collection', models.CharField(max_length=255)),
                ('publication_date', models.DateField()),
                ('objective', models.TextField()),
                ('nb_instances', models.IntegerField()),
                ('nb_features', models.IntegerField()),
                ('data_link', models.URLField()),
                ('availability', models.CharField(max_length=255)),
                ('subject_area', models.CharField(max_length=255)),
                ('data_source', models.CharField(max_length=255)),
                ('data_representativeness', models.CharField(max_length=255)),
                ('sample_balance', models.CharField(max_length=255)),
                ('divided', models.BooleanField()),
                ('missing_values', models.BooleanField()),
                ('temporal_factors', models.CharField(max_length=255)),
                ('nb_citations', models.IntegerField()),
                ('citation_link', models.URLField()),
                ('task', models.CharField(max_length=255)),
                ('metadata', models.TextField()),
                ('documentation', models.TextField()),
                ('features', models.TextField()),
                ('learning_indicators', models.CharField(max_length=255)),
                ('informed_consent', models.BooleanField()),
                ('transparency', models.BooleanField()),
                ('user_control', models.BooleanField()),
                ('equity_non_discrimination', models.BooleanField()),
                ('security', models.BooleanField()),
                ('dealing_faulty_data', models.BooleanField()),
                ('anonymization', models.BooleanField()),
                ('keeping_record', models.BooleanField()),
                ('minimal_data_collection', models.BooleanField()),
                ('data_lifecycle_management', models.CharField(max_length=255)),
            ],
        ),
    ]

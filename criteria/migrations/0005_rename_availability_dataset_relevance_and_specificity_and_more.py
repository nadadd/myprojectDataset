# Generated by Django 5.0.6 on 2024-07-25 12:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('criteria', '0004_remove_ethicalcriteria_priority_weight_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dataset',
            old_name='availability',
            new_name='relevance_and_specificity',
        ),
        migrations.RemoveField(
            model_name='dataset',
            name='citation_link',
        ),
        migrations.RemoveField(
            model_name='dataset',
            name='data_collection',
        ),
        migrations.RemoveField(
            model_name='dataset',
            name='data_link',
        ),
        migrations.RemoveField(
            model_name='dataset',
            name='data_representativeness',
        ),
        migrations.RemoveField(
            model_name='dataset',
            name='data_source',
        ),
        migrations.RemoveField(
            model_name='dataset',
            name='nb_citations',
        ),
        migrations.RemoveField(
            model_name='dataset',
            name='nb_features',
        ),
        migrations.RemoveField(
            model_name='dataset',
            name='nb_instances',
        ),
        migrations.RemoveField(
            model_name='dataset',
            name='objective',
        ),
        migrations.RemoveField(
            model_name='dataset',
            name='publication_date',
        ),
        migrations.RemoveField(
            model_name='dataset',
            name='sample_balance',
        ),
        migrations.RemoveField(
            model_name='dataset',
            name='subject_area',
        ),
        migrations.RemoveField(
            model_name='ethicalcriteria',
            name='priority',
        ),
        migrations.RemoveField(
            model_name='technicalcriteria',
            name='priority',
        ),
        migrations.AlterField(
            model_name='dataset',
            name='data_lifecycle_management',
            field=models.BooleanField(),
        ),
        migrations.AlterField(
            model_name='dataset',
            name='documentation',
            field=models.BooleanField(),
        ),
        migrations.AlterField(
            model_name='dataset',
            name='learning_indicators',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='dataset',
            name='metadata',
            field=models.BooleanField(),
        ),
        migrations.AlterField(
            model_name='dataset',
            name='task',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='dataset',
            name='temporal_factors',
            field=models.BooleanField(),
        ),
    ]
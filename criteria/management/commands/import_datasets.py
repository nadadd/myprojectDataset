import pandas as pd
import os
from django.core.management.base import BaseCommand
from criteria.models import Dataset
from datetime import datetime
from django.db import transaction

class Command(BaseCommand):
    help = 'Load datasets from CSV files into PostgreSQL'

    def handle(self, *args, **options):
        # Define the paths for the CSV files
        csv_files = [
            os.path.join('myproject', 'datasets', 'dataset22.csv'),
            os.path.join('myproject', 'datasets', 'dataset23.csv')
        ]

        # Prepare to batch insert
        datasets_to_create = []

        def parse_value(value):
            if pd.isna(value) or value in [None, '']:
                return 0.7
            if value == 'True' or int(value) or str(value):
                return 0.9
            if value == 'False':
                return 0.5

        for csv_file in csv_files:
            reader = pd.read_csv(csv_file, encoding='ISO-8859-1')
            for _, row in reader.iterrows():
                datasets_to_create.append(Dataset(
                    name=row.get('name', ''),
                    data_collection=parse_value(row.get('data_collection', '')),
                    publication_date=datetime.strptime(str(row.get('publication_date', '1970')), '%Y').date() if pd.notnull(row.get('publication_date')) else None,
                    objective=row.get('objective', ''),
                    nb_instances=parse_value(row.get('nb_instances', '')),
                    nb_features=parse_value(row.get('nb_features', 0)),
                    data_link=row.get('data_link', ''),
                    availability=row.get('availability', ''),
                    subject_area=row.get('subject_area', ''),
                    data_source=row.get('data_source', ''),
                    data_representativeness=row.get('data_representativeness', ''),
                    sample_balance=parse_value(row.get('sample_balance', 'False')),
                    divided=parse_value(row.get('divided', 'False')),
                    missing_values=parse_value(row.get('missing_values', 'False')),
                    temporal_factors=parse_value(row.get('temporal_factors', 'False')),
                    nb_citations=parse_value(row.get('nb_citations', 0)),
                    citation_link=row.get('citation_link', ''),
                    task=parse_value(row.get('task', '')),
                    metadata=parse_value(row.get('metadata', '')),
                    documentation=parse_value(row.get('documentation', '')),
                    features=parse_value(row.get('features', '')),
                    learning_indicators=parse_value(row.get('learning_indicators', '')),
                    informed_consent=parse_value(row.get('informed_consent', 'False')),
                    transparency=parse_value(row.get('transparency', 'False')),
                    user_control=parse_value(row.get('user_control', 'False')),
                    equity_non_discrimination=parse_value(row.get('equity_non_discrimination', 'False')),
                    security=parse_value(row.get('security', 'False')),
                    dealing_faulty_data=parse_value(row.get('dealing_faulty_data', 'False')),
                    anonymization=parse_value(row.get('anonymization', 'False')),
                    keeping_record=parse_value(row.get('keeping_record', 'False')),
                    minimal_data_collection=parse_value(row.get('minimal_data_collection', 'False')),
                    data_lifecycle_management=parse_value(row.get('data_lifecycle_management', 'False')),
                ))

        # Batch insert into the database
        with transaction.atomic():
            Dataset.objects.bulk_create(datasets_to_create)

        self.stdout.write(self.style.SUCCESS('Successfully loaded datasets'))





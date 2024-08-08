import pandas as pd
import os
from django.core.management.base import BaseCommand
from criteria.models import Dataset
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

        for csv_file in csv_files:
            try:
                reader = pd.read_csv(csv_file, encoding='ISO-8859-1')
                for _, row in reader.iterrows():
                    # Debugging print statements
                    print(f"Processing row: {row}")
                    
                    dealing_faulty_data_value = row.get('dealing_faulty_data')
                    print(f"Original value for dealing_faulty_data: {dealing_faulty_data_value}")

                    datasets_to_create.append(Dataset(
                        name=row.get('name', ''),
                        objective=row.get('objective', ''),
                        features=row.get('features', ''),
                        data_representativeness=row.get('data_representativeness', ''),
                        sample_balance=self.parse_boolean(row.get('sample_balance')),
                        divided=self.parse_boolean(row.get('divided')),
                        missing_values=self.parse_boolean(row.get('missing_values')),
                        temporal_factors=self.parse_boolean(row.get('temporal_factors')),
                        nb_citations=self.parse_integer(row.get('nb_citations')),
                        task=row.get('task', ''),
                        metadata=self.parse_boolean(row.get('metadata')),
                        documentation=self.parse_boolean(row.get('documentation')),
                        learning_indicators=row.get('learning_indicators', ''),
                        informed_consent=self.parse_boolean(row.get('informed_consent')),
                        transparency=self.parse_boolean(row.get('transparency')),
                        user_control=self.parse_boolean(row.get('user_control')),
                        equity_non_discrimination=self.parse_boolean(row.get('equity_non_discrimination')),
                        security=self.parse_boolean(row.get('security')),
                        dealing_faulty_data=self.parse_boolean(dealing_faulty_data_value),
                        anonymization=self.parse_boolean(row.get('anonymization')),
                        keeping_record=self.parse_boolean(row.get('keeping_record')),
                        minimal_data_collection=self.parse_boolean(row.get('minimal_data_collection')),
                        data_lifecycle_management=self.parse_boolean(row.get('data_lifecycle_management')),
                    ))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error processing file {csv_file}: {e}'))

        # Batch insert into the database
        try:
            with transaction.atomic():
                Dataset.objects.bulk_create(datasets_to_create)
            self.stdout.write(self.style.SUCCESS('Successfully loaded datasets'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error inserting data into database: {e}'))

    def parse_boolean(self, value):
        if pd.isna(value):
            return None
        value_str = str(value).strip().lower()
        if value_str in ['true', '1']:
            return True
        elif value_str in ['false', '0']:
            return False
        return None

    def parse_integer(self, value):
        try:
            return int(value) if pd.notnull(value) and int(value) >= 0 else None
        except (ValueError, TypeError):
            return None

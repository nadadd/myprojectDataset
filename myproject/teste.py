import os

import pandas as pd


def get_boolean(row,field):
    return row.get(field, False)


def open_csv():
    csv_files = [
            os.path.join('./datasets', 'dataset22.csv'),
            os.path.join('./datasets', 'dataset23.csv')
        ]

        # Prepare to batch insert
    datasets_to_create = []

    for csv_file in csv_files:
        try:
            reader = pd.read_csv(csv_file, encoding='ISO-8859-1')
            for _, row in reader.iterrows():
                # print(row.get('name'))
               
                
                # print(bool(metadata))
                # Append data directly without conversion
                # datasets_to_create.append(Dataset(
                #     name=row.get('name', ''),
                #     data_collection=row.get('data_collection', ''),
                #     publication_date=datetime.strptime(str(row.get('publication_date', '1970-01-01')), '%Y-%m-%d').date() 
                #                         if pd.notnull(row.get('publication_date')) else None,
                #     objective=row.get('objective', ''),
                #     nb_instances=row.get('nb_instances', ''),
                #     nb_features=row.get('nb_features', ''),
                #     data_link=row.get('data_link', ''),
                #     availability=row.get('availability', ''),
                #     subject_area=row.get('subject_area', ''),
                #     data_source=row.get('data_source', ''),
                #     data_representativeness=row.get('data_representativeness', ''),
                #     sample_balance=row.get('sample_balance', ''),
                #     divided=row.get('divided', ''),
                #     missing_values=row.get('missing_values', ''),
                #     temporal_factors=row.get('temporal_factors', ''),
                #     nb_citations=row.get('nb_citations', ''),
                #     citation_link=row.get('citation_link', ''),
                #     task=row.get('task', ''),
                #     metadata=row.get('metadata', ''),
                #     documentation=row.get('documentation', ''),
                #     features=row.get('features', ''),
                #     learning_indicators=row.get('learning_indicators', ''),
                #     informed_consent=row.get('informed_consent', ''),
                #     transparency=row.get('transparency', ''),
                #     user_control=row.get('user_control', ''),
                #     equity_non_discrimination=row.get('equity_non_discrimination', ''),
                #     security=row.get('security', ''),
                #     dealing_faulty_data=row.get('dealing_faulty_data', ''),
                #     anonymization=row.get('anonymization', ''),
                #     keeping_record=row.get('keeping_record', ''),
                #     minimal_data_collection=row.get('minimal_data_collection', ''),
                #     data_lifecycle_management=row.get('data_lifecycle_management', ''),
                # ))
        except Exception as e:
            print(e)
            # self.stdout.write(self.style.ERROR(f'Error processing file {csv_file}: {e}'))
            print('erorro processing file')
    # Batch insert into the database
    # try:
    #     with transaction.atomic():
    #         Dataset.objects.bulk_create(datasets_to_create)
    #     self.stdout.write(self.style.SUCCESS('Successfully loaded datasets'))
    # except Exception as e:
    #     self.stdout.write(self.style.ERROR(f'Error inserting data into database: {e}'))

open_csv()
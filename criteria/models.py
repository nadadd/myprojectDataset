from django.db import models

PRIORITY_CHOICES = [
    (0.5, 'Low Priority'),
    (0.7, 'Medium Priority'),
    (0.9, 'High Priority'),
]

class TechnicalCriteria(models.Model):
    name = models.CharField(max_length=255)
    priority = models.FloatField(choices=PRIORITY_CHOICES, default=0.5)

    def __str__(self):
        return self.name

class EthicalCriteria(models.Model):
    name = models.CharField(max_length=255)
    priority = models.FloatField(choices=PRIORITY_CHOICES, default=0.5)

    def __str__(self):
        return self.name

class Dataset(models.Model):
    name = models.CharField(max_length=255)
    data_collection = models.CharField(max_length=255)
    publication_date = models.DateField()
    objective = models.TextField()
    nb_instances = models.CharField()
    nb_features = models.IntegerField()
    data_link = models.URLField()
    availability = models.CharField(max_length=255)
    subject_area = models.CharField(max_length=255)
    data_source = models.CharField(max_length=255)
    data_representativeness = models.CharField(max_length=255)
    sample_balance = models.CharField(max_length=255)
    divided = models.BooleanField()
    missing_values = models.BooleanField()
    temporal_factors = models.CharField(max_length=255)
    nb_citations = models.IntegerField()
    citation_link = models.URLField()
    task = models.CharField(max_length=255)
    metadata = models.TextField()
    documentation = models.TextField()
    features = models.TextField()
    learning_indicators = models.CharField(max_length=255)
    informed_consent = models.BooleanField()
    transparency = models.BooleanField()
    user_control = models.BooleanField()
    equity_non_discrimination = models.BooleanField()
    security = models.BooleanField()
    dealing_faulty_data = models.BooleanField()
    anonymization = models.BooleanField()
    keeping_record = models.BooleanField()
    minimal_data_collection = models.BooleanField()
    data_lifecycle_management = models.CharField(max_length=255)

    technical_criteria = models.ManyToManyField(TechnicalCriteria, blank=True)
    ethical_criteria = models.ManyToManyField(EthicalCriteria, blank=True)

    def __str__(self):
        return self.name


from django.db import models


class TechnicalCriteria(models.Model):
    objective = models.TextField()
    features = models.TextField()
    data_representativeness = models.TextField()
    sample_balance = models.BooleanField(null=True, blank=True)
    divided = models.BooleanField(null=True, blank=True)
    missing_values = models.BooleanField(null=True, blank=True)
    temporal_factors = models.BooleanField(null=True, blank=True)
    nb_citations = models.PositiveIntegerField(null=True, blank=True)
    task = models.TextField()
    metadata = models.BooleanField(null=True, blank=True)
    documentation = models.BooleanField(null=True, blank=True)
    learning_indicators = models.TextField()

    def __str__(self):
        return self.name
    

class EthicalCriteria(models.Model):
    informed_consent = models.BooleanField(null=True, blank=True)
    transparency = models.BooleanField(null=True, blank=True)
    user_control = models.BooleanField(null=True, blank=True)
    equity_non_discrimination = models.BooleanField(null=True, blank=True)
    security = models.BooleanField(null=True, blank=True)
    dealing_faulty_data = models.BooleanField(null=True, blank=True)
    anonymization = models.BooleanField(null=True, blank=True)
    keeping_record = models.BooleanField(null=True, blank=True)
    minimal_data_collection = models.BooleanField(null=True, blank=True)
    data_lifecycle_management = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return self.name


class Dataset(models.Model):
    name = models.TextField()
    objective = models.TextField()
    features = models.TextField()
    data_representativeness = models.TextField()
    sample_balance = models.BooleanField(null=True, blank=True)
    divided = models.BooleanField(null=True, blank=True)
    missing_values = models.BooleanField(null=True, blank=True)
    temporal_factors = models.BooleanField(null=True, blank=True)
    nb_citations = models.PositiveIntegerField(null=True, blank=True)
    task = models.TextField()
    metadata = models.BooleanField(null=True, blank=True)
    documentation = models.BooleanField(null=True, blank=True)
    learning_indicators = models.TextField()
    informed_consent = models.BooleanField(null=True, blank=True)
    transparency = models.BooleanField(null=True, blank=True)
    user_control = models.BooleanField(null=True, blank=True)
    equity_non_discrimination = models.BooleanField(null=True, blank=True)
    security = models.BooleanField(null=True, blank=True)
    dealing_faulty_data = models.BooleanField(null=True, blank=True)
    anonymization = models.BooleanField(null=True, blank=True)
    keeping_record = models.BooleanField(null=True, blank=True)
    minimal_data_collection = models.BooleanField(null=True, blank=True)
    data_lifecycle_management = models.BooleanField(null=True, blank=True)
    
    
    def __lt__(self,other):
        return self.id < other.id

   

from django.db import models

class TechnicalCriteria(models.Model):
    category = models.CharField(max_length=255)
    criteria_id = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    priority = models.FloatField()
    citation_min = models.IntegerField(null=True, blank=True)
    citation_max = models.IntegerField(null=True, blank=True)
    dropdown_value = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class EthicalCriteria(models.Model):
    category = models.CharField(max_length=255)
    criteria_id = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    priority = models.FloatField()

    def __str__(self):
        return self.name


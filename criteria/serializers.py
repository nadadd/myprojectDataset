from rest_framework import serializers
from .models import TechnicalCriteria, EthicalCriteria, Dataset


class TechnicalCriteriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnicalCriteria
        fields = '__all__'

class EthicalCriteriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EthicalCriteria
        fields = '__all__'

class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = '__all__'

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
    name = serializers.CharField(required=False)
    objective = serializers.CharField(required=False)
    features = serializers.CharField(required=False)
    data_representativeness = serializers.CharField(required=False)
    sample_balance = serializers.BooleanField(required=False)
    divided = serializers.BooleanField(required=False)
    missing_values = serializers.BooleanField(required=False)
    temporal_factors = serializers.BooleanField(required=False)
    nb_citations = serializers.IntegerField(required=False)
    task = serializers.CharField(required=False)
    metadata = serializers.BooleanField(required=False)
    documentation = serializers.BooleanField(required=False)
    learning_indicators = serializers.CharField(required=False)
    informed_consent = serializers.BooleanField(required=False)
    transparency = serializers.BooleanField(required=False)
    user_control = serializers.BooleanField(required=False)
    equity_non_discrimination = serializers.BooleanField(required=False)
    security = serializers.BooleanField(required=False)
    dealing_faulty_data = serializers.BooleanField(required=False)
    anonymization = serializers.BooleanField(required=False)
    keeping_record = serializers.BooleanField(required=False)
    minimal_data_collection = serializers.BooleanField(required=False)
    data_lifecycle_management = serializers.BooleanField(required=False)
    class Meta:
        model = Dataset
        fields =  '__all__'


class ResultSerializer(serializers.Serializer):
    
    score = serializers.DecimalField(max_digits=10, decimal_places=2)
    dataset = DatasetSerializer()
    class Meta:
        fields = ["score","dataset"]      
        
from rest_framework import viewsets
from .models import TechnicalCriteria, EthicalCriteria, Dataset
from .serializers import TechnicalCriteriaSerializer, EthicalCriteriaSerializer, DatasetSerializer
import math
import json
import logging
from criteria.management.commands.import_datasets import Command

# Configurer le logger
logger = logging.getLogger(__name__)

class TechnicalCriteriaViewSet(viewsets.ModelViewSet):
    queryset = TechnicalCriteria.objects.all()
    serializer_class = TechnicalCriteriaSerializer

class EthicalCriteriaViewSet(viewsets.ModelViewSet):
    queryset = EthicalCriteria.objects.all()
    serializer_class = EthicalCriteriaSerializer

class DatasetViewSet(viewsets.ModelViewSet):
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        
        technical_criteria = self.request.query_params.get('technicalCriteria', '{}')
        ethical_criteria = self.request.query_params.get('ethicalCriteria', '{}')
        
        try:
            technical_criteria = json.loads(technical_criteria)
            ethical_criteria = json.loads(ethical_criteria)
        except json.JSONDecodeError:
            logger.error("Invalid JSON in criteria")
            return queryset 
        
        # Calcul de la distance pour chaque dataset
        datasets_with_distance = []
        for dataset in queryset:
            distance = self.calculate_euclidean_distance(dataset, technical_criteria, ethical_criteria)
            logger.info(f"Dataset ID {dataset.id}: Distance {distance}")
            datasets_with_distance.append((dataset, distance))
        
        # Tri des datasets par distance décroissante
        datasets_with_distance.sort(key=lambda x: x[1], reverse=True)
        
        # Retourner les datasets triés par distance
        sorted_datasets = [dataset for dataset, _ in datasets_with_distance]
        logger.info(f"Sorted dataset IDs: {[dataset.id for dataset in sorted_datasets]}")
        return sorted_datasets

    def calculate_euclidean_distance(self, dataset, technical_criteria, ethical_criteria):
        distance = 0
        
        def get_criterion_value(criterion):
            value = getattr(dataset, criterion, None)
            logger.info(f"Criterion {criterion}: Value {value}")
            return Command.parse_value(value)

        for criterion, priority in technical_criteria.items():
            if hasattr(dataset, criterion):
                dataset_value = get_criterion_value(criterion)
                priority = Command.parse_value(priority)
                logger.info(f"Technical Criterion {criterion}: Dataset Value {dataset_value}, Priority {priority}")
                distance += math.pow(dataset_value - priority, 2)
            else:
                logger.warning(f"Technical Criterion {criterion} not found in dataset model.")

        for criterion, priority in ethical_criteria.items():
            if hasattr(dataset, criterion):
                dataset_value = get_criterion_value(criterion)
                priority = Command.parse_value(priority)
                logger.info(f"Ethical Criterion {criterion}: Dataset Value {dataset_value}, Priority {priority}")
                distance += math.pow(dataset_value - priority, 2)
            else:
                logger.warning(f"Ethical Criterion {criterion} not found in dataset model.")

        return math.sqrt(distance)
    
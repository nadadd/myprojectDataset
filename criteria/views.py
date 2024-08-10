from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework.views import APIView
from rest_framework.response import Response

import json

from criteria.serializers import DatasetSerializer, ResultSerializer
from .models import Dataset, TechnicalCriteria, EthicalCriteria

@csrf_exempt
@require_POST
def submit_technical_criteria(request):
    """
    Endpoint to receive and store technical criteria data from local storage.
    """
    try:
        data = json.loads(request.body)
        TechnicalCriteria.objects.all().delete()  # Clear previous data

        technical_criteria = data.get('technicalCriteriaSelected', [])
        criteria_objects = [
            TechnicalCriteria(
                objective=criterion.get('objective'),
                features=criterion.get('features'),
                data_representativeness=criterion.get('data_representativeness'),
                sample_balance=criterion.get('sample_balance', None),
                divided=criterion.get('divided', None),
                missing_values=criterion.get('missing_values', None),
                temporal_factors=criterion.get('temporal_factors', None),
                nb_citations=criterion.get('nb_citations', None),
                task=criterion.get('task'),
                metadata=criterion.get('metadata', None),
                documentation=criterion.get('documentation', None),
                learning_indicators=criterion.get('learning_indicators')
            )
            for criterion in technical_criteria
        ]
        TechnicalCriteria.objects.bulk_create(criteria_objects)
        return JsonResponse({'status': 'success'})
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

@csrf_exempt
@require_POST
def submit_ethical_criteria(request):
    """
    Endpoint to receive and store ethical criteria data from local storage.
    """
    try:
        data = json.loads(request.body)
        EthicalCriteria.objects.all().delete()  # Clear previous data

        ethical_criteria = data.get('ethicalCriteriaSelected', [])
        criteria_objects = [
            EthicalCriteria(
                informed_consent=criterion.get('informed_consent', None),
                transparency=criterion.get('transparency', None),
                user_control=criterion.get('user_control', None),
                equity_non_discrimination=criterion.get('equity_non_discrimination', None),
                security=criterion.get('security', None),
                dealing_faulty_data=criterion.get('dealing_faulty_data', None),
                anonymization=criterion.get('anonymization', None),
                keeping_record=criterion.get('keeping_record', None),
                minimal_data_collection=criterion.get('minimal_data_collection', None),
                data_lifecycle_management=criterion.get('data_lifecycle_management', None)
            )
            for criterion in ethical_criteria
        ]
        EthicalCriteria.objects.bulk_create(criteria_objects)
        return JsonResponse({'status': 'success'})
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

def get_visualizations_data(request):
    """
    Endpoint to get technical and ethical criteria data for visualization.
    """
    technical_criteria = list(TechnicalCriteria.objects.values())
    ethical_criteria = list(EthicalCriteria.objects.values())
    return JsonResponse({
        'technicalCriteria': technical_criteria,
        'ethicalCriteria': ethical_criteria
    })

def get_score(fields,data,priorities):
    
    priority_map = {
        'low': 0.5,
        'medium' :0.7,
        'high' : 0.9,
    }
    queryset = Dataset.objects.all()
    
    result = []
    
    for row in queryset:
        score = 0
        for field in fields:
            if getattr(row,field) == data[field]:
                score += 1 * float(priority_map.get(priorities.get(field,'low'),0.5))
        result.append({
            "score":score,
            "dataset":row,
            
        })
    return sorted(result,key=lambda x:(x['score'],-x['dataset'].id),reverse=True)
    

class TestView(APIView):

    permission_classes = []

    def post(self,request,*args,**kwargs):
       
        ser = DatasetSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        priorities = request.data.get('priorities',{})
        #print(ser.validated_data)
        results = get_score(ser.validated_data.keys(),ser.validated_data,priorities=priorities)
        #print(results)
        
        ser_data = ResultSerializer(data=results,many=True)
        ser_data.is_valid()
        #print(ser_data.data)
        
        
        return Response(ser_data.data,200)


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json
from .models import TechnicalCriteria, EthicalCriteria

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
                category=criterion.get('category'),
                criteria_id=criterion.get('id'),
                name=criterion.get('name'),
                priority=criterion.get('priority'),
                citation_min=criterion.get('citation_min', None),
                citation_max=criterion.get('citation_max', None),
                dropdown_value=criterion.get('dropdown_value', None)
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
                category=criterion.get('category'),
                criteria_id=criterion.get('id'),
                name=criterion.get('name'),
                priority=criterion.get('priority')
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

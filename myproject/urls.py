from django.urls import path
from criteria import views

urlpatterns = [
    path('submit-technical-criteria/', views.submit_technical_criteria, name='submit_technical_criteria'),
    path('submit-ethical-criteria/', views.submit_ethical_criteria, name='submit_ethical_criteria'),
    path('visualizations-data/', views.get_visualizations_data, name='get_visualizations_data'),
]

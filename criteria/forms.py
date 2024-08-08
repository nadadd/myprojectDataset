# criteria/forms.py
from django import forms
#from .models import Dataset

class DatasetSearchForm(forms.Form):
    MACHINE_LEARNING_TASKS = [
        ('classification', 'Classification'),
        ('clustering', 'Clustering'),
        ('regression', 'Regression'),
    ]

    LEARNING_INDICATORS = [
        ('performance', 'Performance'),
        ('behavioral_engagement', 'Behavioral Engagement'),
        ('social_engagement', 'Social Engagement'),
        ('perseverance', 'Perseverance'),
        ('cognitive_engagement', 'Cognitive Engagement'),
    ]

    FEATURES = [
        ('number_of_attempts', 'Number of attempts in quiz or exam'),
        ('number_of_views', 'Number of views'),
        ('number_of_clicks', 'Number of clicks'),
        ('time_spent', 'Time spent'),
        ('number_of_messages', 'Number of messages'),
        ('grades', 'Grades'),
        ('logins', 'Logins'),
    ]

    DATA_REPRESENTATIVENESS = [
        ('structured', 'Structured'),
        ('semi_structured', 'Semi-structured'),
        ('non_structured', 'Non-structured'),
    ]

    OBJECTIVES = [
        ('students_satisfaction', 'Students’ satisfaction'),
        ('impact_of_distance_learning', 'Impact of distance learning'),
        ('improvement_of_distance_learning_quality', 'Improvement of distance learning quality'),
        ('recommendations_in_moocs', 'Recommendations in MOOCs'),
        ('students_preferences', 'Students’ preferences'),
        ('academic_performance', 'Academic performance'),
        ('students_mental_health', 'Students’ mental health'),
        ('impact_of_covid19_on_students', 'Impact of COVID-19 on students'),
    ]

    machine_learning_task = forms.ChoiceField(choices=MACHINE_LEARNING_TASKS, required=False)
    learning_indicator = forms.ChoiceField(choices=LEARNING_INDICATORS, required=False)
    feature = forms.ChoiceField(choices=FEATURES, required=False)
    data_representativeness = forms.ChoiceField(choices=DATA_REPRESENTATIVENESS, required=False)
    objective = forms.ChoiceField(choices=OBJECTIVES, required=False)

    metadata = forms.BooleanField(required=False)
    documentation = forms.BooleanField(required=False)
    data_source = forms.BooleanField(required=False)
    temporal_information = forms.BooleanField(required=False)
    sample_balance = forms.BooleanField(required=False)
    management_of_missing_values = forms.BooleanField(required=False)
    dividing_the_dataset = forms.BooleanField(required=False)
    ethical_criteria_1 = forms.BooleanField(required=False)
    ethical_criteria_2 = forms.BooleanField(required=False)
    informed_consent = forms.BooleanField(required=False)
    anonymization = forms.BooleanField(required=False)
    dealing_with_faulty_data = forms.BooleanField(required=False)
    minimal_data_collection = forms.BooleanField(required=False)
    data_lifecycle_management = forms.BooleanField(required=False)
    transparency = forms.BooleanField(required=False)
    security = forms.BooleanField(required=False)
    keeping_a_record = forms.BooleanField(required=False)
    user_control = forms.BooleanField(required=False)
    equity_and_non_discrimination = forms.BooleanField(required=False)

    min_citations = forms.IntegerField(required=False, min_value=0)
    max_citations = forms.IntegerField(required=False, min_value=0)

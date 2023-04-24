from django.http import JsonResponse


def home(request):
    return JsonResponse({'Info':'Reactc & Django project',
                         'name':'Sanjeev'})
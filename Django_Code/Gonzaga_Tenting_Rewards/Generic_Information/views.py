from django.shortcuts import render

# Create your views here.
def privacy_policy(request):
    return render(request, 'privacy_policy.html')

def basic_info(request):
    return render(request, 'basic_info.html')
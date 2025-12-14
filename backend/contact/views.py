import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.mail import EmailMessage
from django.conf import settings


@csrf_exempt
@require_http_methods(["POST"])
def contact_view(request):
    """
    Handle contact form submissions.
    Accepts JSON with name, email, and message fields.
    """
    try:
        data = json.loads(request.body)
        
        # Validate required fields
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        message = data.get('message', '').strip()
        
        errors = []
        
        if not name:
            errors.append('Le nom est requis.')
        if not email:
            errors.append('L\'email est requis.')
        elif '@' not in email:
            errors.append('L\'email n\'est pas valide.')
        if not message:
            errors.append('Le message est requis.')
        
        if errors:
            return JsonResponse({'success': False, 'errors': errors}, status=400)
        
        # Send email
        try:
            subject = f'Contact depuis ChessFormation: {name}'
            body = f"""
Nom: {name}
Email: {email}

Message:
{message}
"""
            
            email_message = EmailMessage(
                subject=subject,
                body=body,
                from_email=settings.DEFAULT_FROM_EMAIL or settings.EMAIL_HOST_USER,
                to=[settings.DEFAULT_FROM_EMAIL or settings.EMAIL_HOST_USER],
                reply_to=[email],
            )
            email_message.send()
            
            return JsonResponse({'success': True})
            
        except Exception as e:
            return JsonResponse({
                'success': False,
                'errors': ['Erreur lors de l\'envoi de l\'email. Veuillez réessayer plus tard.']
            }, status=500)
            
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'errors': ['Format de données invalide.']
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'errors': ['Une erreur inattendue s\'est produite.']
        }, status=500)


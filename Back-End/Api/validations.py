
from django.forms import ValidationError


def validate_user_code(data):
    user_code = data['user_code'].strip()
    if not user_code:
        raise ValidationError('un code d\'utilisateur est necessaire')
    return True

def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('un mot de passe est necessaire')
    return True
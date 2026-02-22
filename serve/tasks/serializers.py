from rest_framework import serializers
from .models import Task
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User


class TaskSerializer(serializers.ModelSerializer):
    title = serializers.CharField(
        max_length=100,
        validators=[
            UniqueValidator(
                queryset=Task.objects.all(),
                message="La tarea que desea ingresar ya existe"
            )
        ],
        error_messages={
            'required': 'El título de la tarea es obligatorio'
        }
    )

    responsible_name = serializers.StringRelatedField(source='responsible', read_only=True)

    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'responsible', 'responsible_name', 'status', 'expiration_date', 'completed_at', 'updated_at',
                  'created_at')
        read_only_fields = ('created_at', 'updated_at',)
        extra_kwargs = {
            'description': {
                'error_messages': {
                    'required': 'La descripción de la tarea es obligatoria'
                }
            },
            'responsible': {
                'error_messages': {
                    'required': 'Es obligatorio asignar el responsable de la tarea'
                }
            },
            'expiration_date': {
                'error_messages': {
                    'required': 'Es obligatorio asignar una fecha de vencimiento para la de la tarea'
                }
            }
        }


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]
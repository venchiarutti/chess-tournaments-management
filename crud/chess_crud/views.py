from django.shortcuts import render
from chess_crud.models import Participante

# Create your views here.
from django.http import JsonResponse

def participantes(request):
    participantes = Participante.objects.all()
    data = [{
            'id': participante.idParticipante,
            'nome': participante.nome,
            'endereco': participante.endereco,
            'telefone': participante.telefone,
            'idPais': participante.pais.idPais,
            'tipoParticipante': participante.tipoParticipante,
        } for participante in participantes]
    return JsonResponse(data, safe=False)
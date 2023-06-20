from chess_crud.models import Participante, Jogo, Pais
from django.http import JsonResponse
from django.db.models import Count

# Create your views here.

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

def programacoes(request) -> JsonResponse:
    jogos = Jogo.objects.prefetch_related(
        'joga_set__participante', 'salao__hotel'
    ).select_related(
        'arbitro'
    ).all()

    data = [
        {
            'id': jogo.idJogo,
            'dia': jogo.dia,
            'mes': jogo.mes,
            'ano': jogo.ano,
            'entradasVendidas': jogo.entradasVendidas,
            'arbitro': {
                'id': jogo.arbitro.idParticipante,
                'nome': jogo.arbitro.nome,
                'pais': jogo.arbitro.pais.nome
            },
            'salao': {
                'id': jogo.salao.idSalao,
                'nomeHotel': jogo.salao.hotel.nome,
                'capacidadeLotacao': jogo.salao.capacidade
            },
            'jogadores': [
                {
                    'id': joga.participante.idParticipante,
                    'nome': joga.participante.nome,
                    'pais': joga.participante.pais.nome,
                    'nivel': joga.nivel,
                    'cor': joga.cor
                }
                for joga in jogo.joga_set.all()
            ]
        }
        for jogo in jogos
    ]

    return JsonResponse(data, safe=False)

def jogo(request):

    nome_hotel = request.GET.get('nome_hotel')
    nome_participante = request.GET.get('nome_participante')
    nome_arbitro = request.GET.get('nome_arbitro')

    jogo = Jogo.objects.filter(
        salao__hotel__nome=nome_hotel,
        joga__participante__nome=nome_participante,
        arbitro__nome=nome_arbitro
    ).prefetch_related(
        'joga_set__participante', 'salao__hotel'
    ).select_related(
        'arbitro'
    ).first()
    
    return JsonResponse({
        'id': jogo.idJogo,
        'dia': jogo.dia,
        'mes': jogo.mes,
        'ano': jogo.ano,
        'entradasVendidas': jogo.entradasVendidas,
        'arbitro': {
            'id': jogo.arbitro.idParticipante,
            'nome': jogo.arbitro.nome,
            'pais': jogo.arbitro.pais.nome
        },
        'salao': {
            'id': jogo.salao.idSalao,
            'nomeHotel': jogo.salao.hotel.nome,
            'capacidadeLotacao': jogo.salao.capacidade
        },
        'jogadores': [
            {
                'id': joga.participante.idParticipante,
                'nome': joga.participante.nome,
                'pais': joga.participante.pais.nome,
                'nivel': joga.nivel,
                'cor': joga.cor
            }
            for joga in jogo.joga_set.all()
        ]
    }, safe=False)

def jogos_quantidade_movimentos(request):

    jogos = Jogo.objects.annotate(
        qtdMovimentos=Count('movimento')
    ).prefetch_related(
        'joga_set__participante'
    ).all()

    data = [
        {
            'id': jogo.idJogo,
            'jogadores': [
                {
                    'id': joga.participante.idParticipante,
                    'nome': joga.participante.nome,
                    'pais': joga.participante.pais.nome,
                    'nivel': joga.nivel,
                    'cor': joga.cor
                }
                for joga in jogo.joga_set.all()
            ],
            'qtdMovimentos': jogo.qtdMovimentos
        }
        for jogo in jogos
    ]

    return JsonResponse(data, safe=False)

def paises_quantidade_participantes(request):

    paises = Pais.objects.annotate(
        qtdParticipantes=Count('participante')
    ).all()

    data = [
        {
            'id': pais.idPais,
            'nome': pais.nome,
            'qtdParticipantes': pais.qtdParticipantes
        }
        for pais in paises
    ]

    return JsonResponse(data, safe=False)
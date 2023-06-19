from django.db import models

class Hotel(models.Model):
    idHotel = models.AutoField(primary_key=True, db_column='IdHotel')
    nome = models.CharField(max_length=50, unique=True, db_column='Nome')
    endereco = models.CharField(max_length=100, db_column='Endereco')
    telefone = models.CharField(max_length=20, db_column='Telefone')
    
    class Meta:
        managed = False
        db_table = 'hotel'

    def __str__(self):
        return self.nome


class Salao(models.Model):
    idSalao = models.AutoField(primary_key=True, db_column='IdSalao')
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, db_column='NomeHotel')
    capacidade = models.IntegerField(db_column='Capacidade')

    class Meta:
        managed = False
        db_table = 'salao'
    
    def __str__(self):
        return f"{self.idSalao} - {self.hotel}"


class MeioComunicacaoSalao(models.Model):
    idMeioSalao = models.AutoField(primary_key=True, db_column='IdMeioSalao')
    salao = models.ForeignKey(Salao, on_delete=models.CASCADE, db_column='IdSalao')
    meioComunicacao = models.CharField(max_length=50, db_column='MeioComunicacao')

    class Meta:
        managed = False
        db_table = 'meio_comunicacao_salao'
    
    def __str__(self):
        return f"{self.salao} - {self.meioComunicacao}"


class Pais(models.Model):
    idPais = models.AutoField(primary_key=True, db_column='IdPais')
    numClubes = models.IntegerField(db_column='NumClubes')
    nomePais = models.CharField(max_length=50, db_column='NomePais')
    
    class Meta:
        managed = False
        db_table = 'pais'

    def __str__(self):
        return self.nomePais


class Participante(models.Model):
    idParticipante = models.AutoField(primary_key=True, db_column='IdParticipante')
    nome = models.CharField(max_length=50, db_column='Nome')
    endereco = models.CharField(max_length=100, db_column='Endereco')
    telefone = models.CharField(max_length=20, db_column='Telefone')
    pais = models.ForeignKey(Pais, on_delete=models.CASCADE, db_column='IdPais')
    tipoParticipante = models.CharField(max_length=50, db_column='TipoParticipante')
    
    class Meta:
        managed = False
        db_table = 'participante'

    def __str__(self):
        return f"{self.idParticipante} - {self.nome}"


class Acomodacao(models.Model):
    idAcomodacao = models.AutoField(primary_key=True, db_column='IdAcomodacao')
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, db_column='NomeHotel')
    participante = models.ForeignKey(Participante, on_delete=models.CASCADE, db_column='IdParticipante')
    entrada = models.DateField(db_column='Entrada')
    saida = models.DateField(db_column='Saida')

    class Meta:
        managed = False
        db_table = 'acomodacao'
    
    def __str__(self):
        return f"{self.hotel} - {self.participante}"


class Jogo(models.Model):
    idJogo = models.AutoField(primary_key=True, db_column='IdJogo')
    arbitro = models.ForeignKey(Participante, null=True, blank=True, on_delete=models.SET_NULL, db_column='IdArbitro')
    salao = models.ForeignKey(Salao, null=True, blank=True, on_delete=models.SET_NULL, db_column='IdSalao')
    entradasVendidas = models.IntegerField(db_column='EntradasVendidas')
    dia = models.IntegerField(db_column='Dia')
    mes = models.IntegerField(db_column='Mes')
    ano = models.IntegerField(db_column='Ano')

    class Meta:
        managed = False
        db_table = 'jogo'
    
    def __str__(self):
        return str(self.idJogo)


class Movimento(models.Model):
    idMovimento = models.AutoField(primary_key=True, db_column='IdMovimento')
    jogo = models.ForeignKey(Jogo, on_delete=models.CASCADE, db_column='IdJogo')
    jogada = models.CharField(max_length=50, db_column='Jogada')
    comentario = models.CharField(max_length=200, db_column='Comentario')

    class Meta:
        managed = False
        db_table = 'movimento'
    
    def __str__(self):
        return f"{self.jogo} - {self.idMovimento}"


class Joga(models.Model):
    idJoga = models.AutoField(primary_key=True, db_column='IdJoga')
    jogo = models.ForeignKey(Jogo, on_delete=models.CASCADE, db_column='IdJogo')
    participante = models.ForeignKey(Participante, on_delete=models.CASCADE, db_column='IdParticipante')
    nivel = models.IntegerField(db_column='Nivel')
    cor = models.CharField(max_length=10, db_column='Cor')

    class Meta:
        managed = False
        db_table = 'joga'
    
    def __str__(self):
        return f"{self.jogo} - {self.participante}"


class ParticipaCampeonato(models.Model):
    idParticipacao = models.AutoField(primary_key=True, db_column='IdParticipacao')
    participante = models.ForeignKey(Participante, on_delete=models.CASCADE, db_column='IdParticipante')
    nomeCampeonato = models.CharField(max_length=50, db_column='NomeCampeonato')
    tipoParticipacao = models.CharField(max_length=50, db_column='TipoParticipacao')

    class Meta:
        managed = False
        db_table = 'participa_campeonato'
    
    def __str__(self):
        return f"{self.participante} - {self.nomeCampeonato}"

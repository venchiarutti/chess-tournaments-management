import { api } from "../config/api";

export const getJogo = async (nomeHotel, nomeParticipante, nomeArbitro) => {
  return api.get("/jogo", {
    params: {
      nome_hotel: nomeHotel,
      nome_arbitro: nomeArbitro,
      nome_participante: nomeParticipante,
    },
  });
};
export const getProgramacao = async () => {
  return api.get("/programacoes");
};
export const getJogosQtdMovimentos = async () => {
  return api.get("/jogosqtdmovimentos");
};

export const getJogadoresPais = async () => {
  return api.get("/paisesqtdparticipantes");
};
export const jogoMock = [
  {
    id: 1,
    dia: 5,
    mes: 5,
    ano: 2023,
    entradasVendidas: 150,
    arbitro: { id: 4, nome: "Carlos Pereira", pais: "Brasil" },
    salao: { id: 4, nomeHotel: "Hilton", capacidadeLotacao: 200 },
    jogadores: [
      { id: 1, nome: "Bob Fisher", pais: "Brasil", nivel: 10, cor: "branco" },
      {
        id: 2,
        nome: "Garry Kasparov",
        pais: "Argentina",
        nivel: 10,
        cor: "preto",
      },
    ],
  },
];

export const chartJogadoresPorPais = [
  { id: 1, nome: "Brasil", qtdParticipantes: 3 },
  { id: 2, nome: "Argentina", qtdParticipantes: 1 },
  { id: 3, nome: "Uruguai", qtdParticipantes: 1 },
  { id: 4, nome: "Paraguai", qtdParticipantes: 0 },
  { id: 5, nome: "Chile", qtdParticipantes: 1 },
];

export const chartJogoPorMovimentosMock = [
  {
    id: 1,
    jogadores: [
      { id: 1, nome: "Bob Fisher", pais: "Brasil", nivel: 10, cor: "branco" },
      {
        id: 2,
        nome: "Garry Kasparov",
        pais: "Argentina",
        nivel: 10,
        cor: "preto",
      },
    ],
    qtdMovimentos: 3,
  },
  {
    id: 2,
    jogadores: [
      { id: 1, nome: "Bob Fisher", pais: "Brasil", nivel: 8, cor: "preto" },
      {
        id: 3,
        nome: "Jos\u00e9 Santos",
        pais: "Uruguai",
        nivel: 8,
        cor: "branca",
      },
    ],
    qtdMovimentos: 2,
  },
  { id: 3, jogadores: [], qtdMovimentos: 4 },
  {
    id: 4,
    jogadores: [
      {
        id: 2,
        nome: "Garry Kasparov",
        pais: "Argentina",
        nivel: 5,
        cor: "branca",
      },
      {
        id: 3,
        nome: "Jos\u00e9 Santos",
        pais: "Uruguai",
        nivel: 5,
        cor: "preto",
      },
    ],
    qtdMovimentos: 5,
  },
];
export const programacaoMock = [
  {
    id: 1,
    dia: 5,
    mes: 5,
    ano: 2023,
    entradasVendidas: 150,
    arbitro: { id: 4, nome: "Carlos Pereira", pais: "Brasil" },
    salao: { id: 4, nomeHotel: "Hilton", capacidadeLotacao: 200 },
    jogadores: [
      { id: 1, nome: "Bob Fisher", pais: "Brasil", nivel: 10, cor: "branco" },
      {
        id: 2,
        nome: "Garry Kasparov",
        pais: "Argentina",
        nivel: 10,
        cor: "preto",
      },
    ],
  },
  {
    id: 2,
    dia: 20,
    mes: 4,
    ano: 2023,
    entradasVendidas: 20,
    arbitro: { id: 5, nome: "Boris Sparski", pais: "Chile" },
    salao: { id: 2, nomeHotel: "Matsoud Plaza", capacidadeLotacao: 60 },
    jogadores: [
      { id: 1, nome: "Bob Fisher", pais: "Brasil", nivel: 8, cor: "preto" },
      {
        id: 3,
        nome: "Jos\u00e9 Santos",
        pais: "Uruguai",
        nivel: 8,
        cor: "branca",
      },
    ],
  },
  {
    id: 3,
    dia: 23,
    mes: 4,
    ano: 2023,
    entradasVendidas: 100,
    arbitro: { id: 5, nome: "Boris Sparski", pais: "Chile" },
    salao: { id: 5, nomeHotel: "Matsoud Plaza", capacidadeLotacao: 150 },
    jogadores: [],
  },
  {
    id: 4,
    dia: 1,
    mes: 6,
    ano: 2023,
    entradasVendidas: 80,
    arbitro: { id: 5, nome: "Boris Sparski", pais: "Chile" },
    salao: { id: 5, nomeHotel: "Matsoud Plaza", capacidadeLotacao: 150 },
    jogadores: [
      {
        id: 2,
        nome: "Garry Kasparov",
        pais: "Argentina",
        nivel: 5,
        cor: "branca",
      },
      {
        id: 3,
        nome: "Jos\u00e9 Santos",
        pais: "Uruguai",
        nivel: 5,
        cor: "preto",
      },
    ],
  },
];

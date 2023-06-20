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
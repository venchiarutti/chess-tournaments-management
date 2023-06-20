import React, { useEffect, useState } from "react";
import { Card } from "../shared/card";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { getJogosQtdMovimentos } from "../../services/chessTournamentsService";

export const ChartJogoPorMovimentos = () => {
  const [lsJogosQtdMovimentos, setLsJogosQtdMovimentos] = useState<any>(null);

  useEffect(() => {
    const assyncEffect = async () => {
      await getJogosQtdMovimentos().then((result) => setLsJogosQtdMovimentos(result.data));
    };
    assyncEffect();
  }, []);

  //const labels = lsJogosQtdMovimentos?.map((item) => `Jogo ${item?.id}`);

  const playersNames = lsJogosQtdMovimentos?.map((item) => item?.jogadores.map((jogador) => jogador.nome));
  console.log(playersNames);

  const labels = playersNames?.map((game) => `${game[0]} X ${game[1]}`);

  const data = {
    labels,
    datasets: [
      {
        label: "Qtd. movimentos",
        data: lsJogosQtdMovimentos?.map((item) => item?.qtdMovimentos),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  };
  return (
    <Card title="Jogos X Qtd. movimentos">
      <Bar options={options} data={data} />
    </Card>
  );
};

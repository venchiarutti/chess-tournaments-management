import React, { useEffect, useState } from "react";
import { Card } from "../shared/card";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { chartJogoPorMovimentosMock } from "../../services/chessTournamentsService";

export const ChartJogoPorMovimentos = () => {
  const [lsJogosQtdMovimentos, setLsJogosQtdMovimentos] = useState<any>(null);

  useEffect(() => {
    const assyncEffect = async () => {
      setLsJogosQtdMovimentos(chartJogoPorMovimentosMock);

      // await getJogosQtdMovimentos().then((result) => lsJogosQtdMovimentos(result.data));
    };
    assyncEffect();
  }, []);

  const labels = lsJogosQtdMovimentos?.map((item) => `Jogo ${item?.id}`);

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
        text: "Chart.js Line Chart",
      },
    },
  };
  return (
    <Card title="Jogos X Qtd. movimentos">
      <Line options={options} data={data} />
    </Card>
  );
};

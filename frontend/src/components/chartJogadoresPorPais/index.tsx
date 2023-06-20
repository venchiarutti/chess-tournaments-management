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
import { chartJogadoresPorPais } from "../../services/chessTournamentsService";

export const ChartJogadoresPorPais = () => {
  const [lsPaisQtdJogadores, setLsPaisQtdJogadores] = useState<any>(null);

  useEffect(() => {
    const assyncEffect = async () => {
      setLsPaisQtdJogadores(chartJogadoresPorPais);

      // await getJogadoresPais().then((result) => setLsPaisQtdJogadores(result.data));
    };
    assyncEffect();
  }, []);

  const labels = lsPaisQtdJogadores?.map((item) => `${item?.nome}`);

  const data = {
    labels,
    datasets: [
      {
        label: "Qtd. jogadores",
        data: lsPaisQtdJogadores?.map((item) => item?.qtdParticipantes),
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
    <Card title="País X Qtd. jogadores">
      <Line options={options} data={data} />
    </Card>
  );
};

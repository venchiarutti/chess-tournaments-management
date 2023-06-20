import "./App.css";
import chessLogo from "../src/assets/chess-logo.png";
import { CardJogo } from "./components/cardJogo/index";
import { CardProgramacao } from "./components/cardProgramacao/index";
import { ChartJogoPorMovimentos } from "./components/chartJogoPorMovimentos/index";
import { ChartJogadoresPorPais } from "./components/chartJogadoresPorPais/index";
function App() {
  return (
    <>
      <div className="header">
        <img src={chessLogo} width={36} height={36} />
        <h3>CHESS TOURNAMENTS MANAGEMENT</h3>
      </div>
      <div className="content">
        <CardProgramacao />
        <CardJogo />
        <div className="content__split">
          <ChartJogoPorMovimentos />
          <ChartJogadoresPorPais />
        </div>
      </div>
    </>
  );
}

export default App;

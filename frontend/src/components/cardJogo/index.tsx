import React, { useEffect, useState } from "react";
import { Card } from "../shared/card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField/TextField";
import "./style.css";
import Button from "@mui/material/Button/Button";
import FindInPageTwoToneIcon from "@mui/icons-material/FindInPageTwoTone";
import { getJogo, jogoMock } from "../../services/chessTournamentsService";

export const CardJogo = () => {
  const [jogador, setJogador] = useState("");
  const [arbitro, setArbitro] = useState("");
  const [hotel, setHotel] = useState("");
  const [lsJogos, setLsJogos] = useState<any[]>([]);
  function getData(dia, mes, ano) {
    return `${dia}/${mes}/${ano}`;
  }

  useEffect(() => {
    const assyncEffect = async () => {
      setLsJogos(jogoMock);
      // await getJogo(hotel, jogador, arbitro).then((result) =>
      //   setLsJogos(result?.data)
      // );
    };
    assyncEffect();
  }, []);

  return (
    <Card title="Jogos programados">
      <div className="card__body__inputs">
        <TextField
          label="Jogador"
          variant="standard"
          onChange={(e) => setJogador(e.target.value)}
        />
        <TextField
          label="Árbitro"
          variant="standard"
          onChange={(e) => setArbitro(e.target.value)}
        />
        <TextField
          label="Hotel"
          variant="standard"
          onChange={(e) => setHotel(e.target.value)}
        />
        <Button variant="contained" disabled={!jogador || !arbitro || !hotel}>
          Pesquisar
        </Button>
      </div>
      {(!jogador || !arbitro || !hotel) && (
        <div className="card__body__empty__state">
          <FindInPageTwoToneIcon sx={{ fontSize: 80 }} />
          <div className="card__body__empty__state__text">
            Nenhum dado disponível! Insira as informações necessárias e busque
            por um jogo.
          </div>
        </div>
      )}
      {jogador && arbitro && hotel && lsJogos.length > 0 && (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Data</TableCell>
                <TableCell align="left">Entradas vendidas</TableCell>
                <TableCell align="left">Árbitro</TableCell>
                <TableCell align="left">Hotel</TableCell>
                <TableCell align="left">Jogadores</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lsJogos.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    {getData(row.dia, row.mes, row.ano)}
                  </TableCell>
                  <TableCell align="left">{row.entradasVendidas}</TableCell>
                  <TableCell align="left">{row.arbitro.nome}</TableCell>
                  <TableCell align="left">{row.salao.nomeHotel}</TableCell>
                  <TableCell align="left">
                    {row.jogadores.map((item) => item.nome).toString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
};

import React, { useEffect, useState } from "react";
import { Card } from "../shared/card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getProgramacao } from "../../services/chessTournamentsService";

function getData(dia, mes, ano) {
  return `${dia}/${mes}/${ano}`;
}

export const CardProgramacao = () => {
  const [lsProgramacao, setLsProgramacao] = useState<any[]>([]);

  useEffect(() => {
    const assyncEffect = async () => {
     await getProgramacao().then((result) => setLsProgramacao(result.data));
    };
    assyncEffect();
  }, []);

  return (
    <Card title="Programação">
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Data</TableCell>
              <TableCell>Salão</TableCell>
              <TableCell align="left">Capacidade salão</TableCell>
              <TableCell align="left">Árbitro</TableCell>
              <TableCell align="left">País árbitro</TableCell>
              <TableCell align="left">Jogadores</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lsProgramacao.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  {getData(row.dia, row.mes, row.ano)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.salao.nomeHotel}
                </TableCell>
                <TableCell align="left">
                  {row.salao.capacidadeLotacao}
                </TableCell>
                <TableCell align="left">{row.arbitro.nome}</TableCell>
                <TableCell align="left">{row.arbitro.pais}</TableCell>
                <TableCell align="left">
                  {row.jogadores.map((item) => item.nome).toString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

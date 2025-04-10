import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { Header } from "../../components/Header";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
];

const dadosFake = [
  {
    id: 1,
    nome: "João da Silva",
    cidade: "São Paulo",
    categoria: "Pastores",
    status: "Chegou no Evento",
    apresentado: false,
    acompanhantes: 2,
  },
  {
    id: 2,
    nome: "Ana Souza",
    cidade: "Rio de Janeiro",
    categoria: "Caravanas",
    status: "Pronto para Apresentação",
    apresentado: true,
    acompanhantes: 3,
  },
  {
    id: 3,
    nome: "Marcos Lima",
    cidade: "Belo Horizonte",
    categoria: "Autoridades",
    status: "Pronto para Apresentação",
    apresentado: false,
    acompanhantes: 2,
  },
  {
    id: 4,
    nome: "Juliana Castro",
    cidade: "Recife",
    categoria: "Pastores",
    status: "Chegou no Evento",
    apresentado: true,
    acompanhantes: 1,
  },
];

const cores = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {
  const totalConvidados = dadosFake.length;
  const porCategoria = dadosFake.reduce((acc, curr) => {
    acc[curr.categoria] = (acc[curr.categoria] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const porStatus = dadosFake.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const apresentados = dadosFake.filter((d) => d.apresentado).length;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const categoriasChartOptions = {
    chart: {
      type: "pie",
      backgroundColor: "#2c2c2c", // Tema escuro
    },
    title: {
      text: "Convidados por Categoria",
      style: { color: "white" },
    },
    series: [
      {
        name: "Quantidade",
        data: Object.entries(porCategoria).map(([key, value]) => ({
          name: key,
          y: value,
          color: cores[Object.keys(porCategoria).indexOf(key) % cores.length],
        })),
        innerSize: "50%",
      },
    ],
    tooltip: {
      pointFormat: "{point.name}: <b>{point.y}</b>",
    },
    legend: {
      itemStyle: {
        color: "white",
      },
    },
  };

  const statusChartOptions = {
    chart: {
      type: "bar",
      backgroundColor: "#2c2c2c", // Tema escuro
    },
    title: {
      text: "Convidados por Status",
      style: { color: "white" },
    },
    xAxis: {
      categories: Object.keys(porStatus),
      labels: {
        style: {
          color: "white",
        },
      },
    },
    yAxis: {
      title: {
        text: "Quantidade",
        style: { color: "white" },
      },
      labels: {
        style: {
          color: "white",
        },
      },
    },
    series: [
      {
        name: "Status",
        data: Object.values(porStatus),
        color: "#82ca9d",
      },
    ],
    tooltip: {
      pointFormat: "{point.category}: <b>{point.y}</b>",
    },
    legend: {
      itemStyle: {
        color: "white",
      },
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%" }}>
      <Header title="Dashboard" links={links} />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total de Convidados</Typography>
                <Typography variant="h4">{totalConvidados}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Apresentados</Typography>
                <Typography variant="h4">{apresentados}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Não Apresentados</Typography>
                <Typography variant="h4">{totalConvidados - apresentados}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <HighchartsReact highcharts={Highcharts} options={categoriasChartOptions} />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
            </Paper>
          </Grid>

          <Grid size={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Lista de Convidados
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>Nome</TableCell>
                      <TableCell sx={{ color: "white" }}>Categoria</TableCell>
                      <TableCell sx={{ color: "white" }}>Cidade</TableCell>
                      <TableCell sx={{ color: "white" }}>Status</TableCell>
                      <TableCell sx={{ color: "white" }}>Acompanhantes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dadosFake
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((convidado) => (
                        <TableRow key={convidado.id}>
                          <TableCell sx={{ color: "white" }}>{convidado.nome}</TableCell>
                          <TableCell sx={{ color: "white" }}>{convidado.categoria}</TableCell>
                          <TableCell sx={{ color: "white" }}>{convidado.cidade}</TableCell>
                          <TableCell sx={{ color: "white" }}>{convidado.status}</TableCell>
                          <TableCell sx={{ color: "white" }}>{convidado.acompanhantes}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={dadosFake.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box >
  );
}

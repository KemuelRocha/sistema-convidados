import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Header } from '../../components/Header';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Apresentação', href: '/apresentacao' },
];

const dadosFake = [
  {
    id: 1,
    nome: 'João da Silva',
    cidade: 'São Paulo',
    categoria: 'Pastores',
    status: 'Chegou no Evento',
    observacoes: 'Primeira vez no evento',
    representante: '',
    acompanhantes: ['Maria', 'José'],
    apresentado: false,
  },
  {
    id: 2,
    nome: 'Ana Souza',
    cidade: 'Rio de Janeiro',
    categoria: 'Caravanas',
    status: 'Pronto para Apresentação',
    observacoes: '',
    representante: 'Carlos Almeida',
    acompanhantes: ['Lucas', 'Fernanda', 'Pedro'],
    apresentado: true,
  },
  {
    id: 3,
    nome: 'Marcos Lima',
    cidade: 'Belo Horizonte',
    categoria: 'Autoridades',
    status: 'Pronto para Apresentação',
    observacoes: '',
    representante: '',
    acompanhantes: [],
    apresentado: false,
  },
];

export default function Apresentacao() {
  const [abaAtiva, setAbaAtiva] = useState(0);
  const [convidados, setConvidados] = useState(dadosFake);

  const marcarComoApresentado = (id: number) => {
    setConvidados((prev) =>
      prev.map((c) => (c.id === id ? { ...c, apresentado: true } : c))
    );
  };

  const convidadosApresentar = convidados.filter((c) => !c.apresentado);
  const convidadosApresentados = convidados.filter((c) => c.apresentado);
  const convidadosFiltrados = abaAtiva === 0 ? convidadosApresentar : convidadosApresentados;

  return (
    <>
      <Header title="Apresentação" links={links} />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Paper elevation={3}>
          <Tabs value={abaAtiva} onChange={(_, newValue) => setAbaAtiva(newValue)} centered>
            <Tab label={`A apresentar (${convidadosApresentar.length})`} />
            <Tab label={`Apresentados (${convidadosApresentados.length})`} />
          </Tabs>

          <Box p={2}>
            {convidadosFiltrados.length === 0 ? (
              <Typography>Nenhum convidado nesta aba.</Typography>
            ) : (
              convidadosFiltrados.map((c, idx) => (
                <Accordion key={c.id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">{`${idx + 1}. ${c.nome}`}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography><strong>Cidade:</strong> {c.cidade}</Typography>
                    <Typography><strong>Categoria:</strong> {c.categoria}</Typography>
                    <Typography><strong>Status:</strong> {c.status}</Typography>
                    {c.representante && (
                      <Typography><strong>Representante:</strong> {c.representante}</Typography>
                    )}
                    {c.observacoes && (
                      <Typography><strong>Observações:</strong> {c.observacoes}</Typography>
                    )}

                    {c.acompanhantes.length > 0 && (
                      <>
                        <Typography mt={1}><strong>Acompanhantes:</strong></Typography>
                        <ul>
                          {c.acompanhantes.map((a, idx) => (
                            <li key={idx}>{a}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {!c.apresentado && (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={() => marcarComoApresentado(c.id)}
                      >
                        Marcar como Apresentado
                      </Button>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))
            )}
          </Box>
        </Paper>
      </Container>
    </>
  );
}

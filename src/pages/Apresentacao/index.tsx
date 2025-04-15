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
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { atualizarConvidado, obterConvidados } from '../../services/firebase';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Apresentação', href: '/apresentacao' },
];

export default function Apresentacao() {
  const [abaAtiva, setAbaAtiva] = useState(0);
  const [convidados, setConvidados] = useState<any[]>([]);

  const marcarComoApresentado = async (id: number) => {
    const novos = convidados.map((c) => {
      if (c.id === id) {
        return { ...c, apresentado: true };
      }
      return c;
    });
    setConvidados(novos);

    try {
      await atualizarConvidado(id.toString(), { apresentado: true });
    } catch (error) {
      console.error('Erro ao atualizar convidado:', error);
    }
  };

  const convidadosApresentar = convidados.filter((c) => !c.apresentado);
  const convidadosApresentados = convidados.filter((c) => c.apresentado);
  const convidadosFiltrados = abaAtiva === 0 ? convidadosApresentar : convidadosApresentados;

  useEffect(() => {
    const carregarConvidados = async () => {
      const dados = await obterConvidados();
      setConvidados(dados);
    };
    carregarConvidados();
  }, []);

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
                          {c.acompanhantes.map((a: string, idx: number) => (
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

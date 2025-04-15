import {
  Box,
  Button,
  Chip,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Header } from '../../components/Header';
import { ExpandLess, ExpandMore, Edit } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { obterConvidados, atualizarConvidado } from '../../services/firebase';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Atualização', href: '/atualizacao' },
];

const statusConvite = [
  'Enviado',
  'Confirmado',
  'Presente',
  'Pronto',
];


const categorias = ['Pastor', 'Autoridade', 'Caravana', 'Membro', 'Visitante'];

export default function Atualizacao() {
  const [convidados, setConvidados] = useState<any[]>([]);
  const [abertos, setAbertos] = useState<string[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [convidadoEditando, setConvidadoEditando] = useState<any | null>(null);

  const alternarStatus = async (index: number) => {
    const atual = convidados[index].status;
    const atualIndex = statusConvite.indexOf(atual);
    const proximoIndex = (atualIndex + 1) % statusConvite.length;
    const novoStatus = statusConvite[proximoIndex];

    const novos = [...convidados];
    novos[index].status = novoStatus;
    setConvidados(novos);

    try {
      await atualizarConvidado(convidados[index].id, { status: novoStatus });
    } catch (err) {
      console.error("Erro ao atualizar status:", err);

      novos[index].status = atual;
      setConvidados(novos);
    }
  };


  const toggleExpand = (id: string) => {
    setAbertos((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const abrirModal = (convidado: any) => {
    setConvidadoEditando({ ...convidado });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setConvidadoEditando(null);
  };

  const salvarEdicao = async () => {
    await atualizarConvidado(convidadoEditando.id, {
      nome: convidadoEditando.nome,
      cidade: convidadoEditando.cidade,
      categoria: convidadoEditando.categoria,
      status: convidadoEditando.status,
      representante: convidadoEditando.representante,
      acompanhantes: convidadoEditando.acompanhantes,
    });

    const dados = await obterConvidados();
    setConvidados(dados);
    fecharModal();
  };


  useEffect(() => {
    const carregarConvidados = async () => {
      const dados = await obterConvidados();
      setConvidados(dados);
    };
    carregarConvidados();
  }, []);

  return (
    <>
      <Header title="Atualização" links={links} />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Nome</TableCell>
                <TableCell>Cidade</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {convidados.map((convidado, index) => (
                <>
                  <TableRow key={convidado.id}>
                    <TableCell>
                      <IconButton onClick={() => toggleExpand(convidado.id)}>
                        {abertos.includes(convidado.id) ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{convidado.nome}</TableCell>
                    <TableCell>{convidado.cidade}</TableCell>
                    <TableCell>{convidado.categoria}</TableCell>
                    <TableCell>
                      <Chip
                        label={convidado.status}
                        color="primary"
                        onClick={() => alternarStatus(index)}
                        clickable
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => abrirModal(convidado)}>
                        <Edit />
                      </IconButton>

                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6} sx={{ p: 0, border: 0 }}>
                      <Collapse in={abertos.includes(convidado.id)} timeout="auto" unmountOnExit>
                        <Box sx={{ p: 2 }}>
                          <Typography variant="subtitle2">Acompanhantes:</Typography>
                          {convidado.acompanhantes.length > 0 ? (
                            convidado.acompanhantes.map((acomp: string, i: number) => (
                              <Typography key={i} variant="body2" sx={{ ml: 2 }}>
                                - {acomp}
                              </Typography>
                            ))
                          ) : (
                            <Typography variant="body2" sx={{ ml: 2 }}>
                              Nenhum acompanhante
                            </Typography>
                          )}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Dialog open={modalAberto} onClose={fecharModal} fullWidth>
        <DialogTitle>Editar Convidado</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Nome"
            value={convidadoEditando?.nome || ''}
            onChange={(e) =>
              setConvidadoEditando({ ...convidadoEditando, nome: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Cidade"
            value={convidadoEditando?.cidade || ''}
            onChange={(e) =>
              setConvidadoEditando({ ...convidadoEditando, cidade: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Categoria"
            select
            value={convidadoEditando?.categoria || ''}
            onChange={(e) =>
              setConvidadoEditando({ ...convidadoEditando, categoria: e.target.value })
            }
            fullWidth
          >
            {categorias.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Status"
            select
            value={convidadoEditando?.status || ''}
            onChange={(e) =>
              setConvidadoEditando({ ...convidadoEditando, status: e.target.value })
            }
            fullWidth
          >
            {statusConvite.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>

          {convidadoEditando?.categoria === 'Caravanas' && (
            <TextField
              label="Representante"
              value={convidadoEditando?.representante || ''}
              onChange={(e) =>
                setConvidadoEditando({
                  ...convidadoEditando,
                  representante: e.target.value,
                })
              }
              fullWidth
            />
          )}

          {convidadoEditando?.acompanhantes?.map((acomp: string, index: number) => (
            <Box key={index} display="flex" alignItems="center" gap={2}>
              <TextField
                label={`Acompanhante ${index + 1}`}
                value={acomp}
                onChange={(e) => {
                  const novosAcompanhantes = [...convidadoEditando.acompanhantes];
                  novosAcompanhantes[index] = e.target.value;
                  setConvidadoEditando({
                    ...convidadoEditando,
                    acompanhantes: novosAcompanhantes,
                  });
                }}
                fullWidth
              />
              <Button
                color="error"
                onClick={() => {
                  const novosAcompanhantes = [...convidadoEditando.acompanhantes];
                  novosAcompanhantes.splice(index, 1);
                  setConvidadoEditando({
                    ...convidadoEditando,
                    acompanhantes: novosAcompanhantes,
                  });
                }}
                disabled={convidadoEditando.acompanhantes.length === 1}
              >
                Remover
              </Button>
            </Box>
          ))}

          <Button
            variant="outlined"
            onClick={() =>
              setConvidadoEditando({
                ...convidadoEditando,
                acompanhantes: [...convidadoEditando.acompanhantes, ''],
              })
            }
          >
            Adicionar Acompanhante
          </Button>

        </DialogContent>
        <DialogActions>
          <Button onClick={fecharModal}>Cancelar</Button>
          <Button onClick={salvarEdicao} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

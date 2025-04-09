import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { useState } from 'react';
import { Header } from '../../components/Header';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Cadastro', href: '/cadastro' },
];

const categorias = ['Pastor', 'Autoridade', 'Caravana', 'Membro', 'Visitante'];

const statusConvite = [
  'Convite Enviado',
  'Presença Confirmada',
  'Chegou no Evento',
  'Pronto para Apresentação',
];

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    cidade: '',
    categoria: '',
    observacoes: '',
    status: '',
    representante: '',
    acompanhantes: [''],
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleAcompanhanteChange = (index: number, value: string) => {
    const novos = [...form.acompanhantes];
    novos[index] = value;
    setForm({ ...form, acompanhantes: novos });
  };

  const adicionarAcompanhante = () => {
    setForm({ ...form, acompanhantes: [...form.acompanhantes, ''] });
  };

  const removerAcompanhante = (index: number) => {
    const novos = [...form.acompanhantes];
    novos.splice(index, 1);
    setForm({ ...form, acompanhantes: novos });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enviando dados:', form);
  };

  return (
    <>
      <Header title="Cadastro" links={links} />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={4} sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  label="Nome Completo"
                  fullWidth
                  value={form.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Cidade"
                  fullWidth
                  value={form.cidade}
                  onChange={(e) => handleChange('cidade', e.target.value)}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Categoria"
                  fullWidth
                  select
                  value={form.categoria}
                  onChange={(e) => handleChange('categoria', e.target.value)}
                  required
                >
                  {categorias.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid size={12}>
                <TextField
                  label="Observações"
                  fullWidth
                  value={form.observacoes}
                  onChange={(e) => handleChange('observacoes', e.target.value)}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Status do Convite"
                  fullWidth
                  select
                  value={form.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  required
                >
                  {statusConvite.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {form.categoria === 'Caravana' && (
                <Grid size={12}>
                  <TextField
                    label="Nome do Representante"
                    fullWidth
                    value={form.representante}
                    onChange={(e) => handleChange('representante', e.target.value)}
                    required
                  />
                </Grid>
              )}

              <Grid size={12}>
                <Typography variant="subtitle1">Acompanhantes</Typography>
                {form.acompanhantes.map((acomp, index) => (
                  <Box key={index} display="flex" gap={2} mb={1}>
                    <TextField
                      fullWidth
                      label={`Acompanhante ${index + 1}`}
                      value={acomp}
                      onChange={(e) => handleAcompanhanteChange(index, e.target.value)}
                    />
                    <Button
                      color="error"
                      onClick={() => removerAcompanhante(index)}
                      disabled={form.acompanhantes.length === 1}
                    >
                      Remover
                    </Button>
                  </Box>
                ))}
                <Button variant="outlined" onClick={adicionarAcompanhante}>
                  Adicionar Acompanhante
                </Button>
              </Grid>

              <Grid size={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Cadastrar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

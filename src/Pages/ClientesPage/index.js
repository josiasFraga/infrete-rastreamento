import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Header from '../../components/Header';
import DialogConfirm from '../../components/Dialogs/DialogConfirm';
import DialogForm from '../../components/Dialogs/DialogForm';
import FormCadastro from '../../components/Forms/FormCadastro';

import { format } from 'date-fns';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { DeleteForever, Edit } from '@mui/icons-material';
import * as yup from "yup";


function formatarDataISO8601(dataISO8601) {
  const data = new Date(dataISO8601.split('+')[0]);
  const dataFormatada = format(data, 'dd/MM/yyyy');
  const hora = format(data, 'HH:mm');
  return dataFormatada + ' às ' + hora;
}

const initialState = {
  nome: "",
  cnpj: "",
  frotas: [{
    serial: "",
    placa: "",
  }],
  email: "",
  senha: "",
  repeatSenha: "",
}

const ClientesPage = () => {
    
    const dispatch = useDispatch();
    const clientes = useSelector(state => state.appReducer.clientes);
    const [idClienteExcluir, setIdClienteExcluir] = React.useState(null);
    const [dialogConfirmOpen, setDialogConfirmOpen] = React.useState(false);
    const [dialogFormOpen, setDialogFormOpen] = React.useState(false);
    const [initialValues, setInitialValues] = React.useState(initialState);

    const fleetValidationSchema = yup.object().shape({
      serial: yup.string().required("Número serial é obrigatório"),
      placa: yup.string().matches(/^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/, 'Formato antigo da placa inválido.')
      .required('Placa é obrigatório'),
    });
  
    const validationRules = {
      nome: yup.string().required("Nome é obrigatório"),
      cnpj: yup.string().required("CNPJ é obrigatório"),
      frotas: yup.array()
      .of(fleetValidationSchema),
      email: yup.string().email('Endereço de e-mail inválido').required('E-mail é obrigatório'),
      senha: yup.string().required("Senha é obrigatória"),
      repeatSenha: yup
        .string()
        .oneOf([yup.ref("senha"), null], "As senhas não coincidem")
        .required("Confirmação de senha é obrigatória"),
    };
    
    const handleEdit = () => {};
  
    const handleDelete = (cliente_id) => {
		  dispatch({type: 'DELETE_USUARIO', payload: {id: cliente_id}});
    };

    const columns = [
      {
        field: 'nome',
        headerName: 'Nome',
        editable: false,
        width: 600,
      },
      {
        field: 'cnpj',
        headerName: 'CNPJ',
        editable: false,
        width: 300,
      },
      {
        field: 'email',
        headerName: 'Email',
        //type: 'number',
        width: 300,
        editable: false,
      },
      {
        field: 'edit',
        headerName: 'Alterar',
        width: 100,
        sortable: false,
        renderCell: (params) => (
          <IconButton color="primary" aria-label="edit" onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>
        ),
      },
      {
        field: 'delete',
        headerName: 'Excluir',
        width: 100,
        sortable: false,
        renderCell: (params) => {
          return (
          <IconButton color="secondary" aria-label="delete" onClick={() => {
            setIdClienteExcluir(params.row.id);
            setDialogConfirmOpen(true);
          }}>
            <DeleteForever />
          </IconButton>
          )
        },
      },
    ];

    const buscaClientes = () => {
      dispatch({type: 'BUSCA_CLIENTES', payload: {}});
    }
  
    useEffect(() => {
        buscaClientes();
    }, []);

    const handleBeforeSubmit = (campos) => {
      return {
        ...campos,
        //usuario_id: usuario_id
      };
    }

    const handleClickNew = () => {
		  setInitialValues(initialState);
      setDialogFormOpen(true);

    }

  return (
    <Grid container component="main" sx={{ minHeight: '100vh', backgroundColor: '#184a61' }}>
      <CssBaseline />
      <Header />

      <DialogConfirm
        open={dialogConfirmOpen}
        setOpen={setDialogConfirmOpen}
        title={'Confirmação'}
        message={'Deseja realmente excluir este cliente?'}
        handleClickConfirm={() => {
          handleDelete(idClienteExcluir)
          setDialogConfirmOpen(false);
        }}
      />
    
      <DialogForm
        open={dialogFormOpen}
        setOpen={setDialogFormOpen}
        title={"Novo Cliente/Usuário"}
        initialValues={initialValues}
        validationRules={validationRules}
        reduxFunctionName={'CADASTRO_TRIGGER'}
        callback={buscaClientes}
        handleBeforeSubmit={handleBeforeSubmit}
      >
        <FormCadastro />
      </DialogForm>
    
      <Grid container spacing={2} style={{marginBottom: 15}}>
          <Grid item xs={7}>
              <h3 style={{color: 'white', textAlign: 'center'}}>Clientes</h3>
          </Grid>
          <Grid item xs={5}>
          </Grid>
      </Grid>
    
      <Grid container spacing={2} style={{marginBottom: 15}}>
        <Grid item xs={12}>
            <Box sx={{ height: 400, backgroundColor: '#FFF', marginRight: 5, marginLeft: 5 }}>
                <DataGrid
                    rows={clientes}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
                        },
                    },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection={false}
                    disableRowSelectionOnClick
                    disableSelectionOnClick
                />
            </Box>
        </Grid>
      </Grid>

      

      <Grid container spacing={0} style={{marginBottom: 15}}>
        <Grid item xs={12} style={{textAlign: 'center'}}>
          <div style={{paddingLeft: 35, paddingRight: 35}}>
          <div style={{borderRadius: 15}}>
            
            <Grid container spacing={0}>
              <Grid item xs={4}>
              </Grid>
              <Grid item xs={4}>
              </Grid>
              <Grid item xs={4} style={{
                color: '#fff',
                textAlign: 'center'
              }}>
                <div style={{
                  backgroundColor: '#95cacf',
                  borderRadius: 15,
                  paddingTop: 35,
                  paddingBottom: 35,
                  cursor: 'pointer'
                }}
                onClick={()=>{
                  handleClickNew();
                }}
                >
                  Novo usuário/cliente
                </div>
              </Grid>
            </Grid>

          </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ClientesPage;
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import DialogConfirm from '../../../components/Dialogs/DialogConfirm';

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { DeleteForever, Edit } from '@mui/icons-material';


const ListaFrotas = (props) => {
    
    const dispatch = useDispatch();
    const frotas = useSelector(state => state.appReducer.cliente_frotas);
    const [idFrotaExcluir, setIdFrotaExcluir] = React.useState(null);
    const [dialogConfirmOpen, setDialogConfirmOpen] = React.useState(false);   
    const idCliente = props.idCliente;
    const setInitialValues = props.setInitialValues;
    const handleClickNew = props.handleClickNew;

    const handleClickEdit = (frota) => {
        setInitialValues(frota);
        handleClickNew();
    }

    const handleClickDelete = (frota_id) => {
        setIdFrotaExcluir(frota_id);
        setDialogConfirmOpen(true);
    }
  
    const handleDelete = (frota_id) => {
		dispatch({type: 'DELETE_FROTA', payload: {id: frota_id, callback: buscaFrotas}});
    };
  
    const columns = [
      {
        field: 'placa',
        headerName: 'Placa',
        editable: false,
      },
      {
        field: 'serial',
        headerName: 'Serial',
        editable: false,
      },
      {
        field: 'edit',
        headerName: 'Alterar',
        sortable: false,
        renderCell: (params) => (
          <IconButton color="primary" aria-label="edit" onClick={() => handleClickEdit(params.row)}>
            <Edit />
          </IconButton>
        ),
      },
      {
        field: 'delete',
        headerName: 'Excluir',
        sortable: false,
        renderCell: (params) => {
          return (
          <IconButton color="secondary" aria-label="delete" onClick={() => handleClickDelete(params.row.id)}>
            <DeleteForever />
          </IconButton>
          )
        },
      },
    ];

    const buscaFrotas = () => {
      dispatch({type: 'BUSCA_CLIENTE_FROTAS', payload: {
        client_id: idCliente
      }});
    }
  
    useEffect(() => {
        if ( idCliente !== '' && idCliente !== null ) {
            buscaFrotas();
        }
    }, [idCliente]);
  

  return (
    <>
  

      <DialogConfirm
        open={dialogConfirmOpen}
        setOpen={setDialogConfirmOpen}
        title={'Confirmação'}
        message={'Deseja realmente excluir esta frota?'}
        handleClickConfirm={() => {
          handleDelete(idFrotaExcluir)
          setDialogConfirmOpen(false);
        }}
      />
        
      <Grid container spacing={2} style={{marginBottom: 15}}>
        <Grid item xs={12}>
            <Box sx={{ height: 400, backgroundColor: '#FFF', marginRight: 5, marginLeft: 5 }}>
                <DataGrid
                    rows={frotas}
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
    </>
  );
};

export default ListaFrotas;
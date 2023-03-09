import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Header from '../../components/Header';
import { format, differenceInHours, differenceInMinutes } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const timeZone = 'America/Sao_Paulo';

function formatarDataISO8601(dataISO8601) {
  const data = new Date(dataISO8601.split('+')[0]);
  const dataFormatada = format(data, 'dd/MM/yyyy');
  const hora = format(data, 'HH:mm');
  return dataFormatada + ' às ' + hora;
}

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
      align: "center",
      headerClassName: 'text-center',
    },
    {
      field: 'email',
      headerName: 'Email',
      //type: 'number',
      width: 300,
      editable: false,
    },
  ];

const ClientesPage = () => {
    
    const dispatch = useDispatch();
    const clientes = useSelector(state => state.appReducer.clientes);

    useEffect(() => {
        dispatch({type: 'BUSCA_CLIENTES', payload: {}});
    }, []);

  return (
    <Grid container component="main" sx={{ minHeight: '100vh', backgroundColor: '#184a61' }}>
      <CssBaseline />
      <Header />
    
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
    </Grid>
  );
};

export default ClientesPage;
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { format } from 'date-fns';

const columns = [
    {
      field: 'created',
      headerName: 'Data/Hora',
      width: 150,
      editable: false,
      valueGetter: (params) => {
        const item_created = params.row.created.split('+')[0];//isso é para n bugar o timezone
        const formattedDate = format(new Date(item_created), 'dd/MM');
        const time = format(new Date(item_created), 'HH:mm');
        return `${formattedDate} às ${time}`;
      }
    },
    {
      field: 'localization',
      headerName: 'Localização',
      editable: false,
      width: 130,
      valueGetter: (params) => {
        const reponse = JSON.parse(params.row.response);
        return `${reponse.lat} ${reponse.lon}`;
      }
    },
    {
      field: 'sensores_ativos',
      headerName: 'Sensores Ativos',
      type: 'number',
      width: 130,
      align: "center",
      editable: false,
      valueGetter: (params) => {

        const response_json = JSON.parse(params.row.response);
        const sensores = response_json.sen;
        const sensores_splitted = sensores.split('');
    
        const sensores_ativos = sensores_splitted.filter((_sensor) => {
            return _sensor === "1";
        });

        return `${sensores_ativos.length}`;
      }
    },
  ];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Historico(props) {

    const open = props.open;
    const setOpen = props.setOpen;
    const traces_frota = useSelector(state => state.appReducer.traces_frota);


  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Histórico"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={traces_frota}
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
  );
}
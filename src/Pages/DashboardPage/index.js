import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Header from '../../components/Header';
import ButtonFrotas from '../../components/ButtonFrotas';
import Historico from './components/Historico';
import RepresentacaoCaminhaoGrande from './components/RepresentacaoCaminhaoGrande';
import RepresentacaoCaminhaoPequena from './components/RepresentacaoCaminhaoPequena';
import Timer from './components/Timer';
import BotaoSuporte from './components/BotaoSuporte';
import DialogForm from '../../components/Dialogs/DialogForm';
import FormFiltroDataHora from '../../components/Forms/FormFiltroDataHora';
import * as yup from "yup";

import { format, differenceInHours, differenceInMinutes } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const timeZone = 'America/Sao_Paulo';

function formatarDataISO8601(dataISO8601) {
  const data = new Date(dataISO8601.split('+')[0]);
  const dataFormatada = format(data, 'dd/MM/yyyy');
  const hora = format(data, 'HH:mm');
  return dataFormatada + ' às ' + hora;
}

const initialStateFiltroDataHora = {
  date: ''
}

const DashboardPage = () => {

	const dispatch = useDispatch();

  const frota_selecionada = useSelector(state => state.appReducer.frota_selecionada);
  const traces_frota = useSelector(state => state.appReducer.traces_frota);
  const minhas_frotas = useSelector(state => state.appReducer.minhas_frotas);
  const date_and_time_to_filter_traces = useSelector(state => state.appReducer.date_and_time_to_filter_traces);
  const [dialogFormFiltroDataHoraOpen, setDialogFormFiltroDataHoraOpen] = React.useState(false);
  const [itemActiveIndex, setItemActiveIndex] = React.useState(-1);
  const [open, setOpen] = React.useState(false);
  const [initialValuesFiltroDataHora, setInitialValuesFiltroDataHora] = React.useState(initialStateFiltroDataHora);
  const refreshInterval = 60; // em segundos
  const car_length = 11;

  const buscaTracesFrota = () => {
    if ( Object.keys(frota_selecionada).length > 0 ) {
      dispatch({type: 'BUSCA_TRACES_FROTA', payload: {frota_id : frota_selecionada.id}});
      setItemActiveIndex(-1);
    }
  }

  useEffect(() => {
      buscaTracesFrota();
	}, [frota_selecionada]);

  useEffect(() => {
    if ( minhas_frotas.length > 0 ) {
  
      dispatch({type: 'SET_FROTA_SELECIONADA_TRIGGER', payload: {
        frota: minhas_frotas[0]
      }});
      
    }
	}, [minhas_frotas]);

  let last_response = {};
  let last_row = {};
  let last_update_time = "";
  let sensores_ativos = [];
  let sensores_splitted = [];

  if ( traces_frota.length > 0 ) {
  
    last_row = traces_frota.at(itemActiveIndex);
    last_response = JSON.parse(last_row.response);
    const sensores = last_response.sen;
    sensores_splitted = sensores.split('');
  
    sensores_ativos = sensores_splitted.filter((_sensor) => {
      return _sensor !== "F";
    });
  
    const item_created = last_row.created.split('+')[0];//isso é para n bugar o timezone
    const now = utcToZonedTime(new Date(), timeZone);
    let created = new Date(item_created);
  
    const difference_in_hours = Math.abs(differenceInHours(created, now ));
    const difference_in_minutes = Math.abs(differenceInMinutes(created, now ));

    if ( difference_in_hours == 0) {
  
      if ( difference_in_minutes == 0) {
        last_update_time = 'Há alguns instantes'
      }
      else if ( difference_in_minutes == 1) {
        last_update_time = 'Há 1 minuto'
      }
      else {
        last_update_time = `Há ${difference_in_minutes} minutos`;
      }

    } else {
  
      if ( difference_in_hours == 1) {
        last_update_time = 'Há 1 hora'
      }
      else {
        last_update_time = `Há ${difference_in_hours} horas`;
      }
  
    }
  }

  let car_images = [''];
  for (let i = 0; i <= car_length; i++) {
    if ( sensores_splitted[i] == 0 ) {
      car_images.push('car_enabled.png');
    }

    if ( sensores_splitted[i]  == 1 ) {
      car_images.push('car.png');
    }

    if ( sensores_splitted[i] == 'F' ) {
      car_images.push('car_disabled.png');
    }
  }

  const handleBeforeSubmit = (campos) => {
    return {
      ...campos,
      //usuario_id: usuario_id
    };
  }
  const validationRules = {
    //data: yup.string().required("Data é obrigatório"),
  };

  useEffect(() => {
    if ( date_and_time_to_filter_traces != '' && date_and_time_to_filter_traces != null) {
      const selectedDate = new Date(date_and_time_to_filter_traces);
     
      const closestIndex = traces_frota.findIndex((trace) => {

        const traceDate = new Date(trace.created.slice(0, -6));
        const diff = Math.abs(traceDate - selectedDate);
        return diff === Math.min(...traces_frota.map((trace) => Math.abs(new Date(trace.created.slice(0, -6)) - selectedDate)));
      });
      const closestTrace = traces_frota[closestIndex];
      //const closestTraceId = closestTrace.id;
      setItemActiveIndex(closestIndex);
      console.log(closestTrace);

    }
	}, [date_and_time_to_filter_traces]);

  return (
    <Grid container component="main" sx={{ minHeight: '100vh', backgroundColor: '#184a61' }}>
      
      <Historico open={open} setOpen={setOpen} />
    
      <DialogForm
        open={dialogFormFiltroDataHoraOpen}
        setOpen={setDialogFormFiltroDataHoraOpen}
        title={"Filtrar por data/hora"}
        initialValues={initialValuesFiltroDataHora}
        validationRules={validationRules}
        reduxFunctionName={'FILTER_TRACES_DATE_AND_TIME'}
        handleBeforeSubmit={handleBeforeSubmit}
      >
        <FormFiltroDataHora />
      </DialogForm>
    
      <CssBaseline />
      <Header />
      <Grid container spacing={2} style={{marginBottom: 15}}>
          <Grid item xs={7}>
              <h3 style={{color: 'white', textAlign: 'center'}}>Infrete Inload</h3>
          </Grid>
          <Grid item xs={5}>
              <ButtonFrotas />
          </Grid>
      </Grid>
      {
        Object.keys(frota_selecionada).length > 0 && traces_frota.length > 0 &&
        <>
          <Grid container spacing={2} style={{marginBottom: 15}}>
            <Grid item xs={12} style={{textAlign: 'center'}}>
              <div style={{paddingLeft: 35, paddingRight: 35}}>
                <div className='bg-white' style={{borderRadius: 15}} >
                  <Grid container spacing={0}>
                    <Grid 
                      item 
                      sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', paddingLeft: 3}}
                      onClick={()=>{
                        if ( itemActiveIndex != -traces_frota.length ) {
                          setItemActiveIndex(itemActiveIndex-1);                          
                        }
                      }}
                      style={{cursor: (itemActiveIndex != -traces_frota.length) ? 'pointer' : 'default'}}
                    >
                      <FiChevronLeft 
                        color={itemActiveIndex != -traces_frota.length ? "#184a61" : '#CCC'} 
                        size={26} 
                      />
                    </Grid>
                    <Grid item sx={{flexGrow: 1, textAlign: `center`, mt: 0, pt: 0, color: '#184a61', cursor: 'pointer'}} onClick={()=>{setDialogFormFiltroDataHoraOpen(true)}}>
                      <h4 style={{marginBottom: 0, paddingBottom: 0}}>{last_row.localidade}</h4>
                      <h5 style={{marginTop: 0, paddingTop: 3, color: '#999', fontSize: 15}}>{formatarDataISO8601(last_row.created)}</h5>
                    </Grid>
                    <Grid 
                      item
                      sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', paddingRight: 3}}
                      onClick={()=>{
                        if ( itemActiveIndex != -1 ) {
                          setItemActiveIndex(itemActiveIndex+1);
                        }
                      }}
                      style={{cursor: (itemActiveIndex != -1) ? 'pointer' : 'default'}}
                    >
                      <FiChevronRight 
                        color={itemActiveIndex != -1 ? "#184a61" : '#CCC'} 
                        size={26} 
                      />
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{marginBottom: 15}}>
            <Grid item xs={12} style={{textAlign: 'center'}}>
              <div style={{paddingLeft: 35, paddingRight: 35}}>
              <div className='bg-white' style={{
                borderRadius: 15, 
                textAlign: 'center',  
                height: 200,
                overflow: `auto`
              }}>
                {window.innerWidth >= 700 &&
                <RepresentacaoCaminhaoGrande car_images={car_images} />}
                {window.innerWidth < 700 &&
                <RepresentacaoCaminhaoPequena car_images={car_images} />}
              </div>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={0} style={{marginBottom: 15}}>
            <Grid item xs={12} style={{textAlign: 'center'}}>
              <div style={{paddingLeft: 85, paddingRight: 85}}>
              <div className='bg-white' style={{borderRadius: 15, textAlign: 'center'}}>
                
                <Grid container spacing={0}>
                  <Grid item xs={6} style={{
                    color: '#989ca7', 
                    textAlign: 'left', 
                    fontSize: 13, 
                    borderRightWidth: 1, 
                    borderRightColor: '#184a61', 
                    borderRightStyle: 'solid', 
                    borderBottomWidth: 1, 
                    borderBottomColor: '#184a61', 
                    borderBottomStyle: 'solid',
                    paddingTop: 10,
                    paddingLeft: 10
                  }}>
                    Sensores
                    <h4 style={{fontSize: 18, fontWeight: 'normal', margin: 0, padding: 0}}>Ativos</h4>
                  </Grid>
                  <Grid item xs={6} style={{
                    color: '#989ca7', 
                    textAlign: 'left', 
                    fontSize: 13, 
                    borderBottomWidth: 1, 
                    borderBottomColor: '#184a61', 
                    borderBottomStyle: 'solid',
                    paddingTop: 10,
                    paddingLeft: 10
                  }}>
                    Última Atualização
                    <h4 style={{fontSize: 18, fontWeight: 'normal', margin: 0, padding: 0}}>{last_update_time}</h4>
                  </Grid>
                </Grid>
                
                <Grid container spacing={0}>
                  <Grid item xs={6} style={{
                    color: '#989ca7', 
                    textAlign: 'left', 
                    fontSize: 13,
                    borderRightWidth: 1, 
                    borderRightColor: '#184a61', 
                    borderRightStyle: 'solid',
                    paddingLeft: 10,
                    paddingBottom: 10
                  }}>
                    Quantidade:
                    <h4 style={{fontSize: 18, fontWeight: 'normal', margin: 0, padding: 0}}>{sensores_ativos.length}</h4>
                  </Grid>
                  <Grid item xs={6} style={{
                    color: '#989ca7', 
                    textAlign: 'left', 
                    fontSize: 13,
                    paddingLeft: 10,
                    paddingBottom: 10
                  }}>
                    Série
                    <h4 style={{fontSize: 18, fontWeight: 'normal', margin: 0, padding: 0}}>{frota_selecionada.serial}</h4>
                  </Grid>
                </Grid>
              </div>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={0} style={{marginBottom: 15}}>
            <Grid item xs={12} style={{textAlign: 'center'}}>
              <div style={{paddingLeft: 35, paddingRight: 35}}>
              <div style={{borderRadius: 15}}>
                
                <Grid container spacing={0}>
                  <Grid item xs={4}style={{
                    color: '#fff', 
                    textAlign: 'center',
                    paddingRight: 10,
                    cursor: 'pointer'
                  }}
                  onClick={()=>{
                    buscaTracesFrota();
                  }}>
                    <div style={{
                      backgroundColor: '#95cacf',
                      borderRadius: 15,
                      paddingTop: 23,
                      paddingBottom: 23
                    }}>
                      Atualizar<br/>
                      Atualizando automaticamente em <Timer refreshInterval={refreshInterval} buscaTracesFrota={buscaTracesFrota} /> segundos
                    </div>                                      
                  </Grid>
                  <Grid item xs={4} style={{
                    color: '#fff', 
                    textAlign: 'center',
                    paddingRight: 10,
                    cursor: 'pointer'
                  }}
                  onClick={()=>{
                    setOpen(true);
                  }}
                  >
                    <div style={{
                      backgroundColor: '#95cacf',
                      borderRadius: 15,
                      paddingTop: 35,
                      paddingBottom: 35
                    }}>
                      Histórico
                    </div>
                  </Grid>
                  <BotaoSuporte />
                </Grid>
    
              </div>
              </div>
            </Grid>
          </Grid>
        </>
      }
    </Grid>
  );
};

export default DashboardPage;
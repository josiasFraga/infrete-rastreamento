import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Header from '../../components/Header';
import ButtonFrotas from '../../components/ButtonFrotas';
import Historico from './components/Historico';
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

const DashboardPage = () => {

	const dispatch = useDispatch();

  const frota_selecionada = useSelector(state => state.appReducer.frota_selecionada);
  const traces_frota = useSelector(state => state.appReducer.traces_frota);
  const minhas_frotas = useSelector(state => state.appReducer.minhas_frotas);
  const [itemActiveIndex, setItemActiveIndex] = React.useState(-1);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if ( Object.keys(frota_selecionada).length > 0 ) {
      dispatch({type: 'BUSCA_TRACES_FROTA', payload: {frota_id : frota_selecionada.id}});
      setItemActiveIndex(-1);
    }
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
      return _sensor === "1";
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

  //console.log(sensores_splitted);
  //console.log(sensores_splitted[(sensores_splitted.length-1)]);
  //console.log(sensores_splitted[(sensores_splitted.length-2)]);

  return (
    <Grid container component="main" sx={{ minHeight: '100vh', backgroundColor: '#184a61' }}>
      <Historico open={open} setOpen={setOpen} />
      <CssBaseline />
      <Header />
      <Grid container spacing={2} style={{marginBottom: 15}}>
          <Grid item xs={7}>
              <h3 style={{color: 'white', textAlign: 'center'}}>Infrete Trackload</h3>
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
                <div className='bg-white' style={{borderRadius: 15}}>
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
                    <Grid item sx={{flexGrow: 1, textAlign: `center`, mt: 0, pt: 0, color: '#184a61'}}>
                      <h4 style={{marginBottom: 0, paddingBottom: 0}}>Lat: {last_response.lat} Long: {last_response.lon}</h4>
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
                <div style={{position: 'relative', margin: '0 auto', width: 515}}>
                  <img src='/truck_wireframe.jpeg' width={500} style={{ marginTop: 35, marginLeft: 10 }} />
                  <img src='/tires.jpeg' width={70} style={{ position: 'absolute', top: 113, left: 378 }} />
                  <img src='/truck.png' width={115} style={{position: 'absolute', top: 75, left: 10}} />
                  <img src={sensores_splitted[(sensores_splitted.length-1)] == 1 ? '/car_enabled.png' : '/car.png'} width={100} style={{
                    position: 'absolute', 
                    top: 20, 
                    left: 15,
                    transform: 'rotate(5deg)'
                  }} />
                  <img src={sensores_splitted[(sensores_splitted.length-2)] == 1 ? '/car_enabled.png' : '/car.png'} width={100} style={{
                    position: 'absolute', 
                    top: 19, 
                    left: 103, 
                    transform: 'scaleX(-1)'
                  }} />
                  <img src={sensores_splitted[(sensores_splitted.length-3)] == 1 ? '/car_enabled.png' : '/car.png'} width={100} style={{
                    position: 'absolute', 
                    top: 12, 
                    left: 206,
                    transform: 'rotate(10deg)'
                  }} />
                  <img src={sensores_splitted[(sensores_splitted.length-4)] == 1 ? '/car_enabled.png' : '/car.png'} width={120} style={{
                    position: 'absolute', 
                    top: 4, 
                    left: 294, 
                    transform: 'scaleX(-1) rotate(4deg)',
                  }} />
                  <img src={sensores_splitted[(sensores_splitted.length-5)] == 1 ? '/car_enabled.png' : '/car.png'} width={110} style={{
                    position: 'absolute', 
                    top: 12, 
                    left: 410,
                    transform: 'rotate(10deg)'
                  }} />
                  <img src={sensores_splitted[(sensores_splitted.length-6)] == 1 ? '/car_enabled.png' : '/car.png'} width={110} style={{
                    position: 'absolute', 
                    top: 60, 
                    left: 62,
                    transform: 'rotate(5deg)'
                  }} />
                  <img src={sensores_splitted[(sensores_splitted.length-7)] == 1 ? '/car_enabled.png' : '/car.png'} width={110} style={{
                    position: 'absolute', 
                    top: 50, 
                    left: 162,
                    transform: 'rotate(9deg)'
                  }} />
                  <img src={sensores_splitted[(sensores_splitted.length-8)] == 1 ? '/car_enabled.png' : '/car.png'} width={110} style={{
                    position: 'absolute', 
                    top: 48, 
                    left: 289,
                    transform: 'rotate(9deg)'
                  }} />
                  <img src={sensores_splitted[(sensores_splitted.length-9)] == 1 ? '/car_enabled.png' : '/car.png'} width={120} style={{
                    position: 'absolute', 
                    top: 50, 
                    left: 399,
                    transform: 'rotate(5deg)'
                  }} />
                  <img src={sensores_splitted[(sensores_splitted.length-10)] == 1 ? '/car_enabled.png' : '/car.png'} width={100} style={{
                    position: 'absolute', 
                    top: 84, 
                    left: 155, 
                    transform: 'scaleX(-1)'
                  }} />
                  <img src={sensores_splitted[(sensores_splitted.length-11)] == 1 ? '/car_enabled.png' : '/car.png'} width={110} style={{
                    position: 'absolute', 
                    top: 80, 
                    left: 270, 
                    transform: 'scaleX(-1)'
                  }} />
                </div>
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
                  <Grid item xs={4}>                    
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
                  <Grid item xs={4} style={{
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      backgroundColor: '#95cacf',
                      borderRadius: 15,
                      paddingTop: 35,
                      paddingBottom: 35
                    }}>
                      Suporte
                    </div>
                  </Grid>
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
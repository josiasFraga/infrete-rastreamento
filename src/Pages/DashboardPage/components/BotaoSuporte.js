import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';

const BotaoSuporte = () => {

  const support_phone = useSelector(state => state.appReducer.support_phone);

  const openZapLink = () => {
    const url = `https://api.whatsapp.com/send?phone=55${support_phone.replace(/\D/g, '')}`;
    window.open(url, '_blank');
    
  }

  return (
    <Grid item xs={4} style={{
        color: '#fff',
        textAlign: 'center',
        cursor: 'pointer'
    }}

    onClick={openZapLink}
    >
    <div style={{
        backgroundColor: '#95cacf',
        borderRadius: 15,
        paddingTop: 35,
        paddingBottom: 35
    }}>
        Suporte
    </div>
    </Grid>                
  );
};

export default BotaoSuporte;
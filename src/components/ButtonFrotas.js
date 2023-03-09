import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

export default function ButtonFrotas() {
	const dispatch = useDispatch();

  const minhas_frotas = useSelector(state => state.appReducer.minhas_frotas);
  const frota_selecionada = useSelector(state => state.appReducer.frota_selecionada);

  useEffect(() => {
		dispatch({type: 'BUSCA_MINHAS_FROTAS', payload: {}});
	}, []);

  const handleChange = (event) => {
  
    let _frota_selecionada = minhas_frotas.filter((frota)=>{
      return frota.id == event.target.value;
    });
  
		dispatch({type: 'SET_FROTA_SELECIONADA_TRIGGER', payload: {
      frota: _frota_selecionada[0]
    }});

  };

  return (
    <Box sx={{ maxWidth: 250, paddingRight: 5 }}>
      <FormControl fullWidth>
        <Select
          id="frota"
          value={frota_selecionada.id ? frota_selecionada.id : null}
          label="Frota"
          onChange={handleChange}
          sx={{
            border: "1px solid white",
            borderRadius: 15,
            color: "#fff",
            "& .MuiSvgIcon-root": {
                color: "white",
            },
            }}
        > 
        {minhas_frotas.map((frota, index)=>{
          return (<MenuItem value={frota.id} key={'option_frota_' + index}>{frota.placa}</MenuItem>);
        })}
        </Select>
      </FormControl>
    </Box>
  );
}
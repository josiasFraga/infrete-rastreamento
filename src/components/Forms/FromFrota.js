import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const maskPlaca = (text) => {
  let retorno = '';
  let x =  text.match(/([A-Z]{0,3})([0-9]{0,1})([0-9A-Z]{0,1})([0-9]{0,2})/);

  if ( x[1].length < 3 ) {
    return x[1];
  } else if ( x[2] === '' ) {
    return x[1]+x[2];
  } else if ( x[3] === '' ) {
    return x[1]+x[2]+x[3];
  }

  retorno = x[1]+x[2]+x[3]+x[4];
  return retorno;

}

const FormFrota = (props) => {

  const formik = props.formik;

  return (
    <>
 
      <Box component="div" sx={{ mt: 2, width: '100%' }}>
        <TextField
          label="Número serial"
          name={`serial`}
          value={formik.values.serial}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.frotas && formik.errors.serial && formik.touched.frotas && formik.touched.serial}
          helperText={
            formik.errors.frotas && formik.errors.serial && formik.touched.frotas && formik.touched.serial
              ? formik.errors.serial
              : ""
          }
          fullWidth
        />
      </Box>
      <Box component="div" sx={{ mt: 2, width: '100%' }}>
        <TextField
          label="Placa"
          name={`placa`}
          value={formik.values.placa}
          onChange={(event) => {
            formik.setFieldValue(`placa`, maskPlaca(event.target.value.toUpperCase()));
          }}
          onBlur={formik.handleBlur}
          error={formik.errors.frotas && formik.errors.placa && formik.touched.frotas && formik.touched.placa}
          helperText={
            formik.errors.frotas && formik.errors.placa && formik.touched.frotas && formik.touched.placa ? formik.errors.placa : ""
          }
          fullWidth
        />
      </Box>
    </>
  );
};

export default FormFrota;

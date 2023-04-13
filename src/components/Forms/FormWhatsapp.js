import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const maskPhone = (text) => {
  let x = text.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
  let retorno = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');

  return retorno;
}

const FormFrota = (props) => {

  const formik = props.formik;

  return (
    <>
      <Box component="div" sx={{ mt: 2, width: '100%' }}>
        <TextField
          label="WhatsApp para suporte"
          name={`whatsapp`}
          value={formik.values.whatsapp}
          onChange={(event) => {
            formik.setFieldValue(`whatsapp`, maskPhone(event.target.value.toUpperCase()));
          }}
          onBlur={formik.handleBlur}
          error={formik.errors.whatsapp && formik.touched.whatsapp}
          helperText={
            formik.errors.whatsapp && formik.touched.whatsapp ? formik.errors.whatsapp : ""
          }
          fullWidth
        />
      </Box>
    </>
  );
};

export default FormFrota;

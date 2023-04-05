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

function maskCnpj(value) {
    const cnpjRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;
    const match = value.replace(/\D/g, '').match(cnpjRegex);
  
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}`;
    }
  
    return value;
  
}

const FormCadastro = (props) => {

  const formik = props.formik;

  return (
    <>
      <Box component="div" sx={{ mt: 2, width: '100%' }}>
        <TextField
          label="Nome"
          name="nome"
          value={formik.values.nome}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.nome && formik.touched.nome}
          helperText={
            formik.errors.nome && formik.touched.nome ? formik.errors.nome : ""
          }
          fullWidth
        />
      </Box>
      <Box component="div" sx={{ mt: 2, width: '100%' }}>
        <TextField
          label="CNPJ"
          name="cnpj"
          value={formik.values.cnpj}
          onChange={(event) => {
            formik.setFieldValue(`cnpj`, maskCnpj(event.target.value));
          }}
          onBlur={formik.handleBlur}
          error={formik.errors.cnpj && formik.touched.cnpj}
          inputProps={{ maxLength: 18 }} 
          placeholder="__.___.___/____-__"
          helperText={
            formik.errors.cnpj && formik.touched.cnpj ? formik.errors.cnpj : ""
          }
          fullWidth
        />
      </Box>
      <Box component="div" sx={{ mt: 2, width: '100%' }}>
        <TextField
          label="Número serial"
          name={`frotas[0]serial`}
          value={formik.values.frotas[0].serial}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.frotas && formik.errors.frotas[0].serial && formik.touched.frotas && formik.touched.frotas[0].serial}
          helperText={
            formik.errors.frotas && formik.errors.frotas[0].serial && formik.touched.frotas && formik.touched.frotas[0].serial
              ? formik.errors.frotas[0].serial
              : ""
          }
          fullWidth
        />
      </Box>
      <Box component="div" sx={{ mt: 2, width: '100%' }}>
        <TextField
          label="Placa"
          name={`frotas[0]placa`}
          value={formik.values.frotas[0].placa}
          onChange={(event) => {
            formik.setFieldValue(`frotas[0]placa`, maskPlaca(event.target.value.toUpperCase()));
          }}
          onBlur={formik.handleBlur}
          error={formik.errors.frotas && formik.errors.frotas[0].placa && formik.touched.frotas && formik.touched.frotas[0].placa}
          helperText={
            formik.errors.frotas && formik.errors.frotas[0].placa && formik.touched.frotas && formik.touched.frotas[0].placa ? formik.errors.frotas[0].placa : ""
          }
          fullWidth
        />
      </Box>
      <Box component="div" sx={{ mt: 2, width: '100%' }}>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email && formik.touched.email}
          helperText={
            formik.errors.email && formik.touched.email
              ? formik.errors.email
              : ""
          }
          fullWidth
        />
      </Box>
      <Box component="div" sx={{ mt: 2, width: '100%' }}>
        <TextField
          label="Senha"
          type="password"
          name="senha"
          value={formik.values.senha}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.senha && formik.touched.senha}
          helperText={
            formik.errors.senha && formik.touched.senha
              ? formik.errors.senha
              : ""
          }
          fullWidth
        />
      </Box>
      <Box component="div" sx={{ mt: 2, width: '100%' }}>
        <TextField
          label="Confirmar senha"
          type="password"
          name="repeatSenha"
          value={formik.values.repeatSenha}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.repeatSenha && formik.touched.repeatSenha}
          helperText={
            formik.errors.repeatSenha && formik.touched.repeatSenha
              ? formik.errors.repeatSenha
              : ""
          }
          fullWidth
        />
      </Box>
    </>
  );
};

export default FormCadastro;

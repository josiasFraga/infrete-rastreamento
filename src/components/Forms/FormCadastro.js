import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

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

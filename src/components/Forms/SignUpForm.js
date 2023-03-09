import React from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from "yup";
import { useDispatch } from 'react-redux';

import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";

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

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fleetValidationSchema = yup.object().shape({
    serial: yup.string().required("Número serial é obrigatório"),
    placa: yup.string().matches(/^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/, 'Formato antigo da placa inválido.')
    .required('Placa é obrigatório'),
  });

  const signupValidationSchema = yup.object().shape({
    nome: yup.string().required("Nome é obrigatório"),
    cnpj: yup.string().required("CNPJ é obrigatório"),
    frotas: yup.array()
    .of(fleetValidationSchema),
    email: yup.string().email('Endereço de e-mail inválido').required('E-mail é obrigatório'),
    senha: yup.string().required("Senha é obrigatória"),
    repeatSenha: yup
      .string()
      .oneOf([yup.ref("senha"), null], "As senhas não coincidem")
      .required("Confirmação de senha é obrigatória"),
  });

  const formik = useFormik({
    initialValues: {
      nome: "",
      cnpj: "",
      frotas: [{
        serial: "",
        placa: "",
      }],
      email: "",
      senha: "",
      repeatSenha: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values, {setSubmitting}) => {
      const submitValues = prepareFormRequestData();

      dispatch({type: 'CADASTRO_TRIGGER', payload: {
          submitValues: submitValues,
          setSubmitting,
          callback: () => {
            return navigate("/login");
          }
      }});
    },
  });

  const prepareFormRequestData = () => {
      const values = formik.values;
      return values;
  }

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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.cnpj && formik.touched.cnpj}
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
      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={formik.isSubmitting}
        sx={{ mt: 3, mb: 2 }}
        onClick={formik.handleSubmit}
      >
        Cadastrar
      </Button>
      <Grid container>
        {1==2&&
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        }
        <Grid item>
          <Link href="/login" variant="body2">
            {"Já possui uma conta? Entrar"}
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default SignupPage;

import React from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from "yup";
import { useDispatch } from 'react-redux';

import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signinValidationSchema = yup.object().shape({
    email: yup.string().email('Endereço de e-mail inválido').required('E-mail é obrigatório'),
    password: yup.string().required("Senha é obrigatória"),

  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinValidationSchema,
    onSubmit: (values, {setSubmitting}) => {
      const submitValues = prepareFormRequestData();

      dispatch({type: 'LOGIN_TRIGGER', payload: {
          submitValues: submitValues,
          setSubmitting,
          callback: () => {
            return navigate("/dashboard");
          }
      }});
    },
  });

  const prepareFormRequestData = () => {
      const values = formik.values;
      return values;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box component="div" sx={{ mt: 1, width: '100%' }}>
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
      <Box component="div" sx={{ mt: 1, width: '100%' }}>
        <TextField
          label="Senha"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password && formik.touched.password}
          helperText={
            formik.errors.password && formik.touched.password
              ? formik.errors.password
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
        Entrar
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
          <Link href="/cadastro" variant="body2">
            {1 == 2 ? "Não possui uma conta? Cadastre-se" : ""}
          </Link>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginForm;

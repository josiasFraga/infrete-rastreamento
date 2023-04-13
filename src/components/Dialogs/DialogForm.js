import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';


const SaveButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#36A9E1",
  padding: "10px 24px 10px 24px",
  width: "88px",
  height: "48px",
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const CancelButton = styled(Button)(({ theme }) => ({
    color: "#2C3B48",
    textAlign: "center",
    letterSpacing: "0.28px",
    width: "95px",
    height: "48px",
    fontFamily: 'Lato',
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "17px",
    textTransform: "none",
    padding: "15px 19px 15px 19px"
}));

export default function DialogForm(props) {

  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [scroll] = React.useState('paper');

  const open = props.open;
  const setOpen = props.setOpen;
  const title = props.title;
    
  const initialValues = props.initialValues;
  const validationRules = props.validationRules
  const reduxFunctionName = props.reduxFunctionName;

  const formik = useFormik({
      initialValues: initialValues,
      enableReinitialize: true,
      onSubmit: (values, {setSubmitting, resetForm}) => {            
          let campos = Object.assign({}, values);
          var submitValues = campos;
          if ( typeof props.handleBeforeSubmit !== "undefined" ) {
            submitValues = props.handleBeforeSubmit(campos);
          }

          console.log(submitValues);

          dispatch({
              type: reduxFunctionName,
              payload: {
                  submitValues: submitValues,
                  setSubmitting, 
                  resetForm,
                  callback: () => {
                    if ( props.callback ) {
                      props.callback();
                    }
                    setSubmitting(false);
                    resetForm();
                    handleClose();
                  }
              }
          });

      },
      validationSchema: yup.object().shape(validationRules)
  });;



  const handleSubmit = formik.handleSubmit;

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: 700, fontSize: '18px', letterSpacing: "0.36px", color: "#2C3B48", lineHeight: "22px" }}>
          {title}
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'} sx={{ width: 800, maxWidth: "100%" }}>
          {React.cloneElement(props.children, { formik: formik })}
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={handleClose}>
            Cancelar
          </CancelButton>
          <SaveButton onClick={handleSubmit} variant="contained">
            Salvar
          </SaveButton>
        </DialogActions>
      </Dialog>
  );
}
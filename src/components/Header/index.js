import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
//import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
//import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
//import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Person from '@mui/icons-material/Person';
import Dashboard from '@mui/icons-material/Dashboard';
import DialogForm from '../../components/Dialogs/DialogForm';
import FormWhatsapp from '../../components/Forms/FormWhatsapp';
import * as yup from "yup";

import { useNavigate } from "react-router-dom";

const initialState = {
  key: 'support_phone',
  whatsapp: "",
}

export default function AccountMenu() {
  const navigate = useNavigate();
	const dispatch = useDispatch();
  const support_phone = useSelector(state => state.appReducer.support_phone);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorMenuEl, setAnchorMenuEl] = React.useState(null);
  const [dialogFormOpen, setDialogFormOpen] = React.useState(false);
  const [initialValues, setInitialValues] = React.useState(initialState);
  const open = Boolean(anchorEl);
  const openMenu = Boolean(anchorMenuEl);

  let userInfo = localStorage.getItem("userInfo");

  if ( userInfo != null ) {
    userInfo = JSON.parse(userInfo);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorMenuEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorMenuEl(null);
  };

  const logout = () => {
    navigate("/logout");
  };

  const clientes = () => {
    navigate("/clientes");
  }

  const dashboard = () => {
    navigate("/dashboard");
  }
  
  const validationRules = {
    whatsapp: yup.string().required("WhatsApp é obrigatório"),
  };

  const loadWhatasappSuport = () => {
    dispatch({type: 'BUSCA_CONFIGS', payload: {key : 'support_phone'}});
  }

  const handleBeforeSubmit = (campos) => {
    return {
      ...campos,
      //usuario_id: usuario_id
    };
  }

  React.useEffect(() => {
    setInitialValues({
      key: 'support_phone',
      whatsapp: support_phone,
    });
	}, [support_phone]);
  
  React.useEffect(() => {
    loadWhatasappSuport();
	}, [support_phone]);

  return (
    <React.Fragment>
    <DialogForm
      open={dialogFormOpen}
      setOpen={setDialogFormOpen}
      title={"Configurações"}
      initialValues={initialValues}
      validationRules={validationRules}
      reduxFunctionName={'SAVE_CONFIGS'}
      callback={loadWhatasappSuport}
      handleBeforeSubmit={handleBeforeSubmit}
    >
      <FormWhatsapp />
    </DialogForm>
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'unset' }}>
      <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}

            aria-controls={openMenu ? 'main-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}

          >
            <MenuIcon />
          </IconButton>
        <Menu
          anchorEl={anchorMenuEl}
          id="main-menu"
          open={openMenu}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
        <MenuItem onClick={dashboard}>
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        {userInfo.nivel && userInfo.nivel == 'admin' && 
          <>
            <MenuItem onClick={clientes}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Clientes
            </MenuItem>
            <MenuItem onClick={()=> {
              setDialogFormOpen(true);
              handleCloseMenu();
            }}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Configurações
            </MenuItem>
          </>
        }
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>
        
          <div style={{flexGrow: 1, textAlign: `center`, marginTop: 15}}>
            <img src='/logo_branco.png' width={120}/>
          </div>
        <Tooltip title="Conta de Usuário">
          <IconButton
            onClick={handleClick}
            size="large"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            color="inherit"
          >
            <AccountCircle sx={{width: 50, height: 50 }} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
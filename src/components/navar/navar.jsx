import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import logo from "../../assets/Huellas__1_-removebg-preview.png";
import "./navar.css"
import { useNavigate } from "react-router-dom";
import { useToken } from '../tokenProvaider';
const pages = ["Librería", "Nosotros", "Reservación", "Prestamo"];
const settings = ['Mis Reservas', 'Historial', 'Logout'];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const { token, name, singOut } = useToken();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCerrarSession = ()=>{
    singOut();
    window.location.reload();
  }
  const singIn = () => {
    navigate("/login")
  }
  const singUp = () => {
    navigate("/SingUp")
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container className="MuiAppBar-root" maxWidth="xxl">
        <Toolbar disableGutters>
          <Box className="conteiner">
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
              <img className='logo-pagina' src={logo} alt='Logo de la página' />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'end' }}>
              <IconButton
                size="large"Mis Reservas
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
              <img className='logo-pagina' src={logo} alt='Logo de la página' />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {pages.map((page) => (
                <Button

                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2.3, color: 'white', display: 'block', textTransform: 'none' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {
              !token && <>
              <Box sx={{ flexGrow: 0.2, display: { lg: 'flex', xs: 'none' }, alignItems: 'center', justifyContent: 'center' }}>
                <button onClick={singUp} className='login'>Registrar</button>
                <button onClick={singIn} className='login'>Ingresar</button>
              </Box>
              <Box sx={{ flexGrow: 0.2, display: { lg: 'none', xs: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
                <button onClick={singUp} className='login'>Registrar</button>
              </Box>
              </>
            }
            {
              token && <>
                <Box sx={{ flexGrow: 0.2, display: { lg: 'flex', xs: 'none' }, alignItems: 'center', justifyContent: 'center' }}>
                  <button onClick={handleOpenUserMenu} className='login'>{name} <PersonIcon sx={{ marginLeft: '1%' }} /></button>
                </Box>
                <Box sx={{ flexGrow: 0, display: { lg: 'none', xs: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={name} src="/assets/react.svg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                      <MenuItem key='Mis Reservas' onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Mis Reservas</Typography>
                      </MenuItem>
                      <MenuItem key='Historial' onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Historial</Typography>
                      </MenuItem>
                      <MenuItem key='Cerrar sesion' onClick={handleCerrarSession}>
                        <Typography textAlign="center">Cerrar sesion</Typography>
                      </MenuItem>
                
                  </Menu>
                </Box>
              </>
            }


          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
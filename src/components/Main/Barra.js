import React from 'react';
import {
  AppBar,
  makeStyles,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  MenuList,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  Button
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Basketball from "./Icons/basketball.svg"
import Jersey from "./Icons/jersey.svg"
import clsx from 'clsx';

const drawerWidth = 240;

const useStyle = makeStyles((theme) => ({
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  title: {
   flexGrow: 1,
 },
 button:{
   margin:"1vw"
 }



}));

const Barra = (props) => {

  console.log("barra props:", props)
  const classes = useStyle();
  const anchorRef = React.useRef(null);

  const handleClose = ()=>{
    props.handleDrawer()
  }

  return (
    <AppBar  position="fixed" >
      <Toolbar >
          <div>
              <IconButton
                ref={anchorRef}
                aria-controls={props.val ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={props.handleDrawer}
                edge="start"
              >
              <AccountCircle />
              </IconButton>
              <Popper open={props.val} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={props.val} id="menu-list-grow" >

                          <MenuItem onClick={props.handleCloseSession}>Cerrar sesion</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
        <Typography variant="h6" className={classes.title}  >
          Panel de control
        </Typography>

        <div>
          <Button
            className={classes.button}
            onClick={()=>props.handleRoute("TIRO")}
            variant="contained"
            color="primary"
            startIcon={<img src={Basketball} height={40} width={45}/>}
          >
            Nuevo tiro
          </Button>

          <Button
            className={classes.button}
            
            onClick={()=>props.handleRoute("PLAYER")}
            variant="contained"
            color="primary"
            startIcon={<img src={Jersey} height={40} width={45}/>}
          >
            Nuevo jugador
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Barra;

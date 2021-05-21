import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

}));

function FormAddReceptor() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained"
        color="default"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleClickOpen}>
        agregar un receptor
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nuevo Receptor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los datos para realizar el registro de un nuevo receptor en el sistema.
          </DialogContentText>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <form action="/api/receptors/add" method="POST" className={classes.root} noValidate autoComplete="off" >
                <React.Fragment>
                  <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                      Información Receptor
                 </Typography>
                  </Toolbar>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="ID"
                        name="ID"
                        label="Numero Identificación/NIT"
                        fullWidth
                        autoComplete="given-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="email"
                        name="email"
                        label="Correo Electrónico"
                        fullWidth
                        autoComplete="given-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Primer Nombre"
                        fullWidth
                        autoComplete="given-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Apellido"
                        fullWidth
                        autoComplete="given-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="phone"
                        name="phone"
                        label="Teléfono"
                        fullWidth
                        autoComplete="given-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="company"
                        name="company"
                        label="Nombre Comercial"
                        fullWidth
                        autoComplete="given-name"
                      />
                    </Grid>
                    <Toolbar>
                      <Typography variant="h6" color="inherit" noWrap>
                        Registro de Proveedores
          </Typography>
                    </Toolbar>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="supplierID"
                        name="supplierID"
                        label="NIT Proveedor"
                        fullWidth
                        autoComplete="given-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="supplierCompany"
                        name="supplierCompany"
                        label="Nombre Comercial"
                        fullWidth
                        autoComplete="given-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="supplierEmail"
                        name="supplierEmail"
                        label="Correo Electrónico"
                        fullWidth
                        autoComplete="given-name"
                      />
                    </Grid>

                    <Toolbar>
                      <Typography variant="h6" color="inherit" noWrap>
                        Configuración XML Proveedor
                 </Typography>
                    </Toolbar>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        id="nameXML"
                        name="nameXML"
                        label="Elemento del XML a Validar"
                        fullWidth
                        autoComplete="given-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="valueXML"
                        name="valueXML"
                        label="Valor"
                        fullWidth
                        autoComplete="given-name"
                      />
                    </Grid>
                    <Toolbar>
                      <Typography variant="h6" color="inherit" noWrap>
                        Configuración Correo Recepción
                 </Typography>
                    </Toolbar>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={9}>
                      <TextField
                        required
                        id="emailRecepcion"
                        name="emailRecepcion"
                        label="Correo electrónico para la recepción de facturas"
                        fullWidth
                        autoComplete="given-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="passwordRecepcion"
                        name="passwordRecepcion"
                        label="Contraseña de acceso"
                        type="password"
                        fullWidth
                        autoComplete="given-name"
                      />
                    </Grid>

                  </Grid>
                  <DialogActions>
                   
                        <Button onClick={handleClose} color="primary">
                          Cancel
                          </Button>
                        
                          <Button variant="contained"
                            color="primary"
                            type="submit" onClick={handleClose} >
                            Registrar
                            
                          </Button>                       
                      
                  </DialogActions>
                </React.Fragment>
              </form>
            </Paper>
          </main>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default FormAddReceptor;

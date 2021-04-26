import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Agregar Proveedor
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required
            id="IDSupplier"
            name="IDSupplier"
            label="Número Identificación/NIT"
            fullWidth/>
        </Grid>
        <Grid item xs={12} md={6}>
        <TextField id="campanySupplier" name="campanySupplier" label="Nombre Comercial/Razón Social" fullWidth />
        </Grid>
        <Grid item xs={12}>
        <TextField
            required
            id="emailSupplier"
            name="emailSupplier"
            label="Correo Electrónico"
            fullWidth
          />
        </Grid>
        
        </Grid>
        <Typography variant="h6" gutterBottom>
        Configuración XML
      </Typography>
      <Grid container spacing={15}>
        <Grid item xs={12}>
          <TextField required
            id="nameElement"
            name="nameElement"
            label="Elemento a Validar del XML"
            fullWidth/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
            id="valueElement"
            name="valueElement"
            label="Valor del Elemento"
            fullWidth/>
        </Grid>
        </Grid>
        <Grid item xs={12}>
        </Grid>
      
    </React.Fragment>
  );
}

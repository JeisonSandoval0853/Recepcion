import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


import ReportItem from '../../custom/ReportItem';
import ReceptorDetails from '../../custom/ReceptorDetails';

import { Box } from '@material-ui/core';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function ReportsView() {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: false,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
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
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },

  }));
  const [reports, setReports] = useState([]);
  const [documentID, setReportsDocument] = useState('');
  const [supplierID, setReportsSupplier] = useState('');

  const getReports = async () => {
    try {
      const response = await axios.get('/api/reports', { documentID, supplierID });  // Get o post, de acuerdo a la consulta por axios /{} 
      console.log('response: ', response)
      setReports(response.data);
    } catch (error) {
      setReports([]);
      console.log(error)
    }
  }

  useEffect(() => {
    getReports();
  }, []);

  const renderReports = () => {
    if (reports.lenght === 0) {
      return (
        <div>Sin Receptores para mostrar</div>
      );
    }
    return reports.map(reports => {
      return (
        <ReportItem  {...reports}/>
      )
    })
  };

  const classes = useStyles();

  const searchByFilter = () => {
    getReports();
  };

  const updateState = (event) => {
    const value = event.currentTarget.value;
    if (event.currentTarget.name === 'documentID') {
      return setReportsDocument(value);
    }
    setReportsSupplier(value);
  };

  return (
    <Box m={1}>
    <Card className={classes.root}>
      <CardHeader
        title="Formulario Reportes"
      />
      <CardContent>
        <Grid item xs sm={3}>
        <TextField type="text" label="Numero Documento" value={documentID} name="documentID" onChange={updateState} fullWidth />
        </Grid>
        <Grid item xs sm={3} >
        <TextField type="text" label="NIT Proveedor" value={supplierID} name="supplierID" onChange={updateState} fullWidth />
        </Grid>
        <Grid item xs={12} sm={9}>

          <Button  onClick={searchByFilter}
            variant="contained"
            color="primary"
          >Buscar</Button>
        </Grid>
      </CardContent>
      <CardContent>  
      <Box mt={2}>
        <Grid container spacing={2}>
          {renderReports()}
        </Grid>
      </Box> 
        </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  </Box>
  
)
}
export default ReportsView;

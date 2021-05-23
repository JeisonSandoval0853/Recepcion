import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


import ReportItem from '../../custom/ReportItem';
import ReceptorDetails from '../../custom/ReceptorDetails';
import Paper from '@material-ui/core/Paper';
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
import GetApp from '@material-ui/icons/GetApp';
import CsvDownloader from 'react-csv-downloader';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);





function ReportsView() {

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

  const createCSV = (row) => {
    const fileName = [{
      fileName: row.nameXML
    }]

    const columns = [{
      id: 'documentID',
      displayName: 'N° Documento'
    }, {
      id: 'statusDocument',
      displayName: 'Estado'
    },
    {
      id: 'dateReception',
      displayName: 'Fecha Recepción'
    },
    {
      id: 'supplierID',
      displayName: 'Nit Proveedor'
    },
    {
      id: 'emailSupplier',
      displayName: 'Email Proveedor'
    }];


    const datas = [{
      documentID: row.documentID,
      statusDocument: row.statusDocument,
      dateReception: row.dateReception,
      supplierID: row.supplierID,
      emailSupplier: row.emailSupplier
    }]


    return (
      <Button>
        <GetApp />
        <CsvDownloader filename={row._id + '_' + row.documentID}
          separator=";"
          wrapColumnChar="'"
          columns={columns}
          datas={datas}
          text="Descargar Reporte" />
        {console.log('report._id: ', row._id)}
      </Button>
    )
  }



  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const renderReports = () => {


    if (reports.lenght === 0) {
      return (
        <div>Sin Receptores para mostrar</div>
      );
    }
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>N° Documento</StyledTableCell>
              <StyledTableCell>Estado</StyledTableCell>
              <StyledTableCell>Fecha Recepción</StyledTableCell>
              <StyledTableCell>Nit Proveedor</StyledTableCell>
              <StyledTableCell>Email Proveedor</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((row) => (

              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {createCSV(row)}

                </StyledTableCell>
                <StyledTableCell >{row.documentID}</StyledTableCell>
                <StyledTableCell>{row.statusDocument}</StyledTableCell>
                <StyledTableCell>{row.dateReception}</StyledTableCell>
                <StyledTableCell >{row.supplierID}</StyledTableCell>
                <StyledTableCell >{row.emailSupplier}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

  }


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

            <Button onClick={searchByFilter}
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

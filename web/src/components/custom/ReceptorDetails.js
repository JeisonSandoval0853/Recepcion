import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Mail from '@material-ui/icons/Mail';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});



function ReceptorDetails(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    props.suppliers.map((supplier) => (
    <React.Fragment>
  {props.accessEmail.map((access) => (
    <Typography variant="h6" gutterBottom component="div" size="small">
    <Mail/>
      {access.email}
      </Typography>
  ))}
       
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          Proveedores
        </TableCell>       
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
              {supplier.company}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>NIT</TableCell>
                    <TableCell>Correo Electrónico</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={supplier.ID}>
                      <TableCell component="th" scope="row">
                        {supplier.ID}
                      </TableCell>
                      <TableCell>{supplier.email}</TableCell>                    
                    </TableRow>                 
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      
    </React.Fragment>
    ))
  );
}


export default ReceptorDetails
  

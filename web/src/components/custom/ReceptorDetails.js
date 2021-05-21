import React from 'react';
import PropTypes from 'prop-types';
import ReceptorItem from '../custom/ReceptorItem';
import axios from 'axios';
//estilos
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
//elementos
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Grid from '@material-ui/core/Grid';
//iconos
import IconButton from '@material-ui/core/IconButton';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Mail from '@material-ui/icons/Mail';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { TextField } from '@material-ui/core';

const useRowStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },

  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  avatar: {
    backgroundColor: red[500],
  },
  

}));

function ReceptorDetails(props) {
  const [data, setData]= React.useState([]);
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [modalEdit, setModalEdit] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [ID, setReceptorsID]= React.useState('')
  const [receptorSelect, setReceptorSelect]= React.useState('')
  //Peticiones al servidor

  const deleteReceptor = async () => {
    try {
      console.log('deleteReceptor: ',{ID})
      const response = await axios.delete('/api/receptors/delete', {data:{ID}}) // Get o post, de acuerdo a la consulta por axios /{} 
      console.log('response: ', response)
        ModalDelete();     
    } catch (err) {    
      console.log(err)
    }
  }
  const updateState = (event) => {
    const value = event.currentTarget.value;
    if (event.currentTarget.name === 'ID') {
      return setReceptorsID(value);
    }
  };

  //Modal
  const handleOpen = (receptor, option) => {
    setReceptorSelect(receptor);
    (option==='Edit')?ModalEdit():ModalDelete()
    
  };

  const ModalEdit=()=>{
    setModalEdit(!modalEdit);
  }

  const ModalDelete=()=>{
    setModalDelete(!modalDelete);
  }

  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
 
  return (
    <Box m={1} key={props._id}>
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  R
          </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title= {props.company}
              subheader={props.email}
            />
            <CardContent>
              <Grid item xs >
               <ReceptorItem {...props} />
              </Grid>
            </CardContent>
            <CardActions disableSpacing>           
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                {expanded && <ExpandLessIcon />}
                {!expanded && <ExpandMoreIcon />}
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
              <Grid>
            <IconButton aria-label="delete receptor" >
                <IconDelete onClick={()=>handleOpen(props, 'Delete')}/>
              </IconButton>
              <IconButton aria-label="share">
                <IconEdit onClick={()=>handleOpen(props, 'Edit')}/>
              </IconButton>
            </Grid>           
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
          {props.company}
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell>NIT</TableCell>
                <TableCell>Correo Electrónico</TableCell>               
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow key={props.ID}>
                  <TableCell component="th" scope="row">
                    {props.ID}
                  </TableCell>
                  <TableCell>{props.email}</TableCell>                    
                </TableRow>                 
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  </TableRow>
  <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalDelete}
        onClose={ModalDelete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalDelete}>
          <div className={classes.paperModal}>
            <p id="transition-modal-description">Esta seguro de eliminar {props.ID} </p>
            <Grid container spacing={1}>
        <Grid>
          <TextField type="text" label="Confirme el Nit" value= {ID} name="ID" onChange={updateState} fullWidth />
        </Grid>
      </Grid>
            <div align="right">
              <Button  onClick={()=>deleteReceptor()}>Sí</Button>
              <Button  onClick={()=>ModalDelete()}>No</Button>
            </div>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalEdit}
        onClose={ModalEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalEdit}>
          <div className={classes.paperModal}>
            <p id="transition-modal-description">Esta seguro de editar {props.ID} </p>
            <div align="right">
              <Button >Sí</Button>
              <Button onClick={()=>ModalEdit()}>No</Button>
            </div>
          </div>
        </Fade>
      </Modal>
              </CardContent>
            </Collapse>
          </Card>
        </Box>
   
  )}
  export default ReceptorDetails

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


import ReceptorItem from '../../custom/ReceptorItem';
import ReceptorDetails from '../../custom/ReceptorDetails';

import {  Box  } from '@material-ui/core';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';




function ReceptorsView() {


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

  const [receptors, setReceptors] = useState([]);//state para acceder a las propiedades de un elemento HTML - 
  const [ID, setReceptorsID] = useState('');// busca por ID receptor - value=""
  const [company, setReceptorsCompany] = useState('');

  const getReceptors = async () => {
    try {
      const response = await axios.post('/api/receptors', { ID, company });  // Get o post, de acuerdo a la consulta por axios /{} 
      console.log('response: ', response)
      setReceptors(response.data);
    } catch (error) {
      setReceptors([]);
      console.log(error)
    }
  }
  useEffect(() => {
    getReceptors();
  }, []);

  const renderReceptors = () => {
    if (receptors.lenght === 0) {
      return (
        <div>Sin Receptores para mostrar</div>
      );
    }
    return receptors.map(receptors => {
      return (
        <Box m={1} key={receptors._id}>
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
              title= {receptors.company}
              subheader={receptors.email}
            />
            <CardContent>
              <Grid item xs >
                <ReceptorItem {...receptors} />
              </Grid>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
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
               <ReceptorDetails {...receptors}/>
              </CardContent>
            </Collapse>
          </Card>
        </Box>
      )
    })
  };

  const searchByFilter = () => {
    getReceptors();
  };

  const updateState = (event) => {
    const value = event.currentTarget.value;
    if (event.currentTarget.name === 'ID') {
      return setReceptorsID(value);
    }
    setReceptorsCompany(value);
  };

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Busquedad de Receptores
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
          <TextField type="text" label="Numero Identificación/NIT" value={ID} name="ID" onChange={updateState} fullWidth />

        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
          <TextField type="text" label="Compañia" value={company} name="company" onChange={updateState} fullWidth />
        </Grid>

        <Grid item xs={12} sm={9}>

          <Button onClick={searchByFilter}
            variant="contained"
            color="primary"
          >Buscar</Button>
        </Grid>
      </Grid>

      <Box mt={2}>
        <Grid container spacing={2}>
          {renderReceptors()}
        </Grid>
      </Box>

    </div>


  )

}

export default ReceptorsView;

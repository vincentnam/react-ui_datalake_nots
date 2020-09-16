import React from 'react';

import './App.css';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import DropZoneCard from './components/DropZoneCard'
function App() {



  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  var componentConfig = { postUrl: 'no-url' };
  var djsConfig = { autoProcessQueue: true, dictDefaultMessage: "Déposez un fichier à téléverser - Drop file to upload it", addRemoveLinks:true, multiple: true }
  var eventHandlers = { addedfile: (file) => console.log(file) }


  return (
    <div >
      <Grid container spacing={3}>
        <Grid item xs={12}>

        </Grid>
        <Grid item xs={6} sm={3}>

        <DropZoneCard config={componentConfig}
                      eventHandlers={eventHandlers}
                      djsConfig={djsConfig}></DropZoneCard>
          {/*<Paper className={classes.paper}>xs=12</Paper>*/}

        </Grid>

      </Grid>
    </div>
  );
}

export default App;

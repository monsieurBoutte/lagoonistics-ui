import React from 'react';
import { Router } from "@reach/router"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { theme } from './styles/theme';
import { DashBoard } from './pages/DashBoard'
import Home from './pages/Home'
import { Sensor } from './pages/Sensor'

const lagoonistics = createMuiTheme(theme);

export const App = () =>
  (
    <MuiThemeProvider theme={lagoonistics}>
      <DashBoard>
        <Router>
          <Home path="/" />
          <Sensor path="/sensor" />
        </Router>
      </DashBoard>
    </MuiThemeProvider>
  );

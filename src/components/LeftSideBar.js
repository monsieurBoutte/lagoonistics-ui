import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NatureIcon from '@material-ui/icons/Nature';
import { Link } from '@reach/router';
import FilterSelection from './FilterSelection';
import * as SensorContext from '../context/SensorContext';

export const LeftSideBar = props => {
  const { classes } = props;
  return (
    <SensorContext.Consumer>
      {context => (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <FilterSelection
            pluckFromStJohnSensorList={context.pluckFromStJohnSensorList}
            setFilteredStJohnSensorList={context.setFilteredStJohnSensorList}
            saintJohnSensors={context.saintJohnSensors}
          />
          <Divider />
          <List>
            {context.kilroyDataVisibility && (
              <Fragment>
                {context.kilroyAndLoboSensorInfo.length > 0 && (
                  context.kilroyAndLoboSensorInfo.filter(dataSet => dataSet.source === 'KILROY').map((kilroy, index) => (
                    <div key={`${index}-${kilroy.sensorId}`}>
                      <ListItem>
                        <ul>
                          <li>source: Kilroy</li>
                          <li>sensor: {kilroy.displayName ? kilroy.displayName : 'N/A'}</li>
                          <li>sensor id: {kilroy.sensorId}</li>
                          <li>latitude: {kilroy.lat}</li>
                          <li>longitude: {kilroy.long}</li>
                          {kilroy.data.length > 0 && (
                            kilroy.data.map((dataType, index) => (
                              <ul key={`${index}-${dataType.label}`}>
                                <li>label: {dataType.label}</li>
                                <li>delta: {dataType.delta}</li>
                                <li>value: {dataType.value}</li>
                                <li>unit: {dataType.unit}</li>
                              </ul>
                            ))
                          )}
                        </ul>
                      </ListItem>
                      <Divider />
                    </div>
                  ))
                )}
              </Fragment>
            )}
            {context.loboDataVisibility && (
              <Fragment>
                {context.kilroyAndLoboSensorInfo.length > 0 && (
                  context.kilroyAndLoboSensorInfo.filter(dataSet => dataSet.source === 'LOBO').map((lobo, index) => (
                    <div key={`${index}-${lobo.sensorId}`}>
                      <ListItem>
                        <ul>
                          <li>source: Lobo</li>
                          <li>sensor: {lobo.displayName ? lobo.displayName : 'N/A'}</li>
                          <li>sensor id: {lobo.sensorId}</li>
                          <li>latitude: {lobo.lat}</li>
                          <li>longitude: {lobo.long}</li>
                          {lobo.data.length > 0 && (
                            lobo.data.map((dataType, index) => (
                              <ul key={`${index}-${dataType.label}`}>
                                <li>label: {dataType.label}</li>
                                <li>delta: {dataType.delta}</li>
                                <li>value: {dataType.value}</li>
                                <li>unit: {dataType.unit}</li>
                              </ul>
                            ))
                          )}
                        </ul>
                      </ListItem>
                      <Divider />
                    </div>
                  ))
                )}
              </Fragment>
            )}
            {context.saintJohnDataVisibility && (
              <Fragment>
                {context.filteredStJohnSensorList.length > 0 && (
                  context.filteredStJohnSensorList.map((saintJohn, index) => (
                    <div key={`${index}-${saintJohn.metaData.attributes.LONG_NM}`}>
                      <ListItem>
                        <ul>
                          <li>source: Saint John</li>
                          <li>sensor: {saintJohn.metaData.attributes.LONG_NM}</li>
                          <li>sensor id: {saintJohn.metaData.attributes.HYDRON_NUMBER}</li>
                          <li>latitude: {saintJohn.metaData.attributes.LAT_NO}</li>
                          <li>longitude: {saintJohn.metaData.attributes.LONG_NO}</li>
                          <li>data type: {saintJohn.metaData.attributes.PARAM}</li>
                          <li><a style={{ textDecoration: 'none' }} href={saintJohn.sensorGraphUrl} target="_blank">graph</a></li>
                        </ul>
                      </ListItem>
                      <Divider />
                    </div>
                  ))
                )}
                {context.filteredStJohnSensorList.length <= 0 && context.saintJohnSensors.map((saintJohn, index) => (
                  <div key={`${index}-${saintJohn.metaData.attributes.LONG_NM}`}>
                    <ListItem>
                      <ul>
                        <li>source: Saint John</li>
                        <li>sensor: {saintJohn.metaData.attributes.LONG_NM}</li>
                        <li>sensor id: {saintJohn.metaData.attributes.HYDRON_NUMBER}</li>
                        <li>data type: {saintJohn.metaData.attributes.PARAM}</li>
                        <li>latitude: {saintJohn.metaData.attributes.LAT_NO}</li>
                        <li>longitude: {saintJohn.metaData.attributes.LONG_NO}</li>
                        <li><a style={{ textDecoration: 'none' }} href={saintJohn.sensorGraphUrl} target="_blank">graph</a></li>
                      </ul>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </Fragment>
            )}

          </List>
        </Drawer>
      )
      }

    </SensorContext.Consumer>
  );
}

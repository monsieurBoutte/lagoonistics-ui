import React, { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import { dataTypeCodeLookUp, dataTypes } from '../util/dataType-utils';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: '0 0 auto',
  },
  formControl: {
    paddingBottom: `${(theme.spacing.unit + 4)}px`,
    minWidth: `calc(100% - ${(theme.spacing.unit + 4) * 2}px)`,
    margin: `${theme.spacing.unit + 4}px ${(theme.spacing.unit + 4)}px 0`
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 270,
    },
  },
};

const FilterSelection = props => {
  const [dataTypeSelection, setDataTypeSelection] = useState([])
  const { classes, pluckFromStJohnSensorList, saintJohnSensors } = props;

  const handleChange = event => {
    console.log(event.target.value)
    setDataTypeSelection(event.target.value);
    pluckFromStJohnSensorList(
      saintJohnSensors,
      event.target.value.map(type => dataTypeCodeLookUp(type))
    );
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-chip">
          Filtered Data Type
        </InputLabel>
        <Select
          multiple
          value={dataTypeSelection}
          onChange={e => handleChange(e)}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
          style={{ width: '100%' }}
        >
          {dataTypes.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(FilterSelection);

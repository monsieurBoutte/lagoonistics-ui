export const dataTypes = [
  'Dissolved Oxygen',
  'PH',
  'Salinty',
  'Chlorophyll',
  'Turbidity (NTU)',
  'Phosphate (mg P/L)',
  'Temperature (F)',
  'Blue/Green Algae (ug/L)',
  'Depth (ft)',
  'Direction (º)',
];

export const dataTypeCodeLookUp = dataType => {
  switch (dataType) {
    case 'Dissolved Oxygen':
      return 'DISSOLVED_OXYGEN_CUR';
    case 'PH':
      return 'PHOSPHATE_CUR';
    case 'Salinty':
      return 'SALINITY_CUR';
    case 'Turbidity (NTU)':
      return 'TURBIDITY_CUR'
    case 'Blue/Green Algae (ug/L)':
    case 'Chlorophyll':
    case 'Depth (ft)':
    case 'Direction (º)':
      return '';
    default:
      return '';
  }
}
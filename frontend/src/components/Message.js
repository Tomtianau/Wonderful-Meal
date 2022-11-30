import React from 'react';
import Alert from '@mui/material/Alert';

export default function Message(props) {
  return <Alert severity={props.severity || 'info'}>{props.children}</Alert>;
}

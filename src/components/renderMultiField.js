import React from 'react';
import TextField from '@material-ui/core/TextField';

export default ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      id={label}
      label={label}
      multiline
      rows="6"
      {...input}
      {...custom}
    />
  );
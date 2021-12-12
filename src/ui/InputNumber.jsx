import React from 'react';
import { TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) =>
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }
      isAllowed={(value) => value.floatValue !== 0}
      allowNegative={false}
      thousandSeparator
      prefix='PW '
      allowEmptyFormatting
      allowLeadingZeros
    />
  );
};

export const InputNumber = ({ label, setValue, value, ...props }) => {
  const handleChange = (event) => {
    setValue({ [event.target.name]: Number(event.target.value) });
  };

  return (
    <TextField
      required
      label={label}
      value={value.number}
      onChange={handleChange}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      {...props}
    />
  );
};

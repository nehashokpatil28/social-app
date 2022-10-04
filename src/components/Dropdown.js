import React from 'react';
import { InputLabel, MenuItem, Grid, FormControl, Select } from '@mui/material';

const style ={  
    minWidth: 185,
}
const Dropdown = (props) => {
    const { label, disabled, value, name, id, options, labelId, onChange, optionLabelKey, optionValueKey, emptyOption } = props
    return <Grid>
        <FormControl  sx={style}>
            <InputLabel
                id={labelId}>{label}</InputLabel>
            <Select
                disabled={disabled}
                labelId={labelId}
                id={id}
                value={value}
                name={name}
                label={label}
                onChange={onChange}
                autoWidth={true}
            >
                {emptyOption && <MenuItem value="">
                    <em>None</em>
                </MenuItem>}
                {
                    options.map((item, key) => {
                        let value = item
                        let label = item
                        if (typeof item === 'object') {
                            value = item?.[optionValueKey]
                            label = item?.[optionLabelKey]
                        }
                        return (<MenuItem key={key} value={value}>{label}</MenuItem>)
                    })
                }
            </Select>
        </FormControl>
    </Grid>
}
export default Dropdown

Dropdown.defaultProps = {
    label: 'Relationship',
    disabled: false,
    value: '',
    onChange: () => console.log("handle change"),
    options: ["Parent", "Sibling", "Spouse"],
    name: '',
    id: '',
    optionValueKey: '',
    optionLabelKey: '',
    emptyOption: true
}
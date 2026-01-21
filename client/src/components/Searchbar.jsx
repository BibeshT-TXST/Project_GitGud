import React from 'react';
import { Autocomplete, TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Searchbar(){
    const options = [{title: 'TXST catalog'},{title: 'Tutoring services'}];
    return (
        <Box sx={{ pr: 2 }}>   
        <Autocomplete
            /*Props*/
            //Prop that allows typing beyond the listed options
            freeSolo
            disableClearable = {false}
            options = {options}
            //Will be adjusted later based on data type
            getOptionLabel = {(option) => option.title || ""}

            //The text field rendering
            renderInput = {(params) => (
                <TextFiled
                    {...params}
                    label={label}
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        />
        </Box>
    );
}

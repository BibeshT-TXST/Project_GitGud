import React from 'react';
import { Autocomplete, TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Searchbar(){

    //Sample options for the autocomplete
    const options = [
        {title: 'The Great Gatsby'},
        {title: 'Game of Thrones'},
        {title: 'To Kill a Mockingbird'},
        {title: '1984'},
        {title: 'Pride and Prejudice'},
        {title: 'The Catcher in the Rye'},
        {title: 'The Hobbit'},
    ];

    return (
        <Box sx={{ pr: 2,  width: '100%', maxWidth: 600 }}>   
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
                <TextField
                    {...params}
                    label= "Search for Books"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <>
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                            {params.InputProps.startAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
        </Box>
    );
}

import React from 'react';
import { Autocomplete, TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Searchbar({ onSearchChange, options = [] }) {

    return (
        <Box sx={{ pr: 2, width: '100%', maxWidth: 600 }}>
            <Autocomplete
                /*Props*/
                //Prop that allows typing beyond the listed options
                freeSolo
                disableClearable={false}
                //options are passsed via Inventory_page visa ptops
                options={options}
                //when text in the search bar changes the change is passed to Inventory_page where it is used to filter rows
                onInputChange={(event, newInputValue) => {
                    if (onSearchChange) {
                        onSearchChange(newInputValue);
                    }
                }}
                //Will be adjusted later based on data type
                getOptionLabel={(option) => option.title || ""}

                //The text field rendering
                renderInput={(params) => (
                    <TextField
                        {...params}
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
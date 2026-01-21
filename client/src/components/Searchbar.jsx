import react from 'react';
import { Autocomplete, TextFiled, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = ({ options, label = "Search..." }) => {
    return (
        <Autocomplete
            /*Props*/
            //Prop that allows typing beyond the listed options
            freesolo
            disableClearable = {false}
            options = {options}
            //Will be adjusted later based on data type
            getOptionLabel = {(option) => option.label || ""}

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
    );
}

export default Searchbar;
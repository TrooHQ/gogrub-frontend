import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
// import { CustomAutocomplete } from '../Overview';
import { styled } from "@mui/system";

export interface OptionItem {
  label: string;
  id: string;
}

interface ReusableDropdownProps {
  label?: string;
  required?: boolean;
  options: OptionItem[];
  value?: OptionItem | null;
  onChange: (value: OptionItem | null) => void;
  placeholder?: string;
  width?: number | string;
  buttonLabel?: string;
}

export const CustomAutocomplete = styled(Autocomplete)({
  "& .MuiOutlinedInput-root": {
    padding: "0.375rem .25rem",
    borderRadius: "5px",
    color: "white",
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
    "& .MuiInputBase-input": {
      color: "black",
    },
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: "#121212",
  },
  "& .MuiAutocomplete-clearIndicator": {
    color: "#121212",
  },
  "& .MuiAutocomplete-endAdornment": {
    right: "8px",
  },
  "& .MuiAutocomplete-listbox": {
    padding: "0",
  },
  "& .MuiAutocomplete-option": {
    padding: "10px 10px",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
});


export default function ReusableDropdown({
  // label: _label,
  // required: _required = false,
  options,
  value,
  onChange,
  placeholder = 'Search',
  width = '100%',
  // buttonLabel: _buttonLabel,
}: ReusableDropdownProps) {
  const handleSelect = (_event: any, selected: OptionItem | null) => {
    onChange(selected ?? null);
  };

  return (
    <div style={{ width }} className="w-full ">
      {/* {effectiveLabel && (
        <p className="text-xs text-gray-700 mb-1">
          {effectiveLabel} {required && <span className="text-red-500">*</span>}
        </p>
      )} */}
      <div className='w-full border border-gray-300 rounded-lg'>

        <CustomAutocomplete
          disablePortal
          options={options as any}
          getOptionLabel={(opt: any) => (typeof opt === 'string' ? opt : opt.label)}
          isOptionEqualToValue={(opt: any, val: any) => (opt?.id ?? opt) === (val?.id ?? val)}
          value={value as any}
          onChange={handleSelect as any}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              variant="outlined"
              fullWidth
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 40,
                  borderRadius: '8px',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '10px 12px',
                  fontSize: '0.875rem',
                },
              }}
              InputProps={{
                ...params.InputProps,
              }}
            />
          )}
        />
      </div>
    </div>
  );
}

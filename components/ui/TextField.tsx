import Image from "next/image";
import MuiTextField from "@mui/material/TextField";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

interface TextFieldProps {
  searchQuery: string;
  getClearProps: () => React.HTMLAttributes<HTMLButtonElement>;
  getInputProps: () => React.InputHTMLAttributes<HTMLInputElement>;
}

const TextField = ({ searchQuery, getClearProps, getInputProps }: TextFieldProps) => {
  return (
    <MuiTextField
      fullWidth
      type="search"
      value={searchQuery || ""}
      placeholder="Search user"
      InputProps={{
        endAdornment: (
          <>
            {searchQuery ? (
              <button {...getClearProps()}>
                <Image src="close.svg" alt="close icon" width={24} height={24} />
              </button>
            ) : null}
          </>
        ),
      }}
      inputProps={{
        type: "search",
        ...getInputProps(),
      }}
      sx={{
        width: { xs: "100%", md: "400px" },
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          border: "unset",
        },
        [`& .${outlinedInputClasses.root}`]: {
          borderRadius: "8px",
          borderColor: "unset",
          fontSize: "0.875rem",
          letterSpacing: "0.5px",
          backgroundColor: "#F0F1F2",
          fontFamily: `'Inter', sans-serif`,
        },
        [`& .${outlinedInputClasses.input}`]: {
          padding: "10px 13px",
          "&::-webkit-search-cancel-button": {
            display: "none",
          },
        },
      }}
    />
  );
};

export default TextField;

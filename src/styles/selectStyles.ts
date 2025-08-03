import { StylesConfig, ThemeConfig } from "react-select";
const isDarkMode = document.documentElement.classList.contains("dark");
export const selectStyle: StylesConfig = {
  placeholder: (provided) => ({
    ...provided,
    color: "#adacac",
    fontSize: "12px",
    textAlign: "start",
    
  }),
  singleValue: (provided) => ({
    ...provided,
    // color: "#747474",
  }),

  option: (provided, { isSelected, isFocused, isMulti }) => ({
    ...provided,
    fontSize: "12px",
    padding: "8px",
    textAlign: "start",
    color: isFocused || isSelected ? "white" : "#1E1850",
    // ":hover": {
    //   color: "white",
    // },
    // backgroundColor:
    //   isSelected && !isMulti
    //     ? "rgba(30, 24, 80, 0.4)"
    //     : isFocused
    //     ? "rgba(30, 24, 80, 0.4)"
    //     : "",
  }),

  control: (baseStyles) => ({
    ...baseStyles,
    fontSize: "12px",
    borderRadius: "8px",
    boxShadow: "none",
    paddingTop: "2px",
    paddingBottom: "2px",
    // color: "#747474",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "transparent",
    // color: "#747474",
    fontSize: "14px",
    margin: "0px",
    display: "inline",
    padding: 0,
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    // color: "#747474",
    padding: 0,
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#FF0000", // Set the color of the 'x' button
    opacity: 0,
    display: "none",
    padding: 0,
    ":hover": {
      color: "#FF0000",
      opacity: 1,
    },
  }),
  // menuPortal: (provided) => ({
  //   ...provided,
  //   zIndex: 9999,
  // }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
    overflowY: "auto", // Required for scrolling
    maxHeight: "200px", // Optional, sets menu height
    // zIndex: 9999,
    // top: "auto",
    // bottom: "100%",
  }),

  menuList: (provided) => ({
    ...provided,
    padding: "0",

    maxHeight: "120px",
    overflowY: "auto", // Enables scrolling

    scrollbarWidth: "inherit", // For Firefox
    "&::-webkit-scrollbar": {
      width: "7px",
      height: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#fff", // Scrollbar color
      borderRadius: "10px", // Scrollbar shape
      border: "2px",
      borderStyle: "solid",
      borderColor: "#d8d7d7",
      position: "absolute",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      //backgroundColor: "#555", // Hover color
    },
    "&::-webkit-scrollbar-track": {
      background: "#f3f3f3",
      borderRadius: "10px", // Track color
    },

    "&::-webkit-scrollbar-button": {
      display: "none",
    },
  }),
};

export const selectTheme: ThemeConfig = (theme) => ({
  ...theme,
  borderRadius: 0,
  boxShadow: "none",
  colors: {
    ...theme.colors,
    primary: "rgba(30, 24, 80, 0.4)",
    primary50: "rgba(30, 24, 80, 0.4)",
    primary25: "rgba(30, 24, 80, 0.4)",
  },
});

export const selectRowStyle: StylesConfig = {
  placeholder: (provided) => ({
    ...provided,
    color: "#adacac",
    fontSize: "12px",
  }),
  option: (provided, { isSelected }) => ({
    ...provided,
    fontSize: "12px",
    padding: "8px",
    // color: isSelected ? "white" : "black",
    color: "#1E1850",
    // backgroundColor: "white",
  }),
  control: (baseStyles) => ({
    ...baseStyles,
    fontSize: "12px",
    borderRadius: "8px",
    boxShadow: "none",
    paddingTop: "2px",
    paddingBottom: "2px",
    color: "#747474",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "transparent",
    color: "#747474",
    fontSize: "14px",
    margin: "0px",
    display: "inline",
    padding: 0,
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "#747474",
    padding: 0,
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#FF0000", // Set the color of the 'x' button
    opacity: 0,
    display: "none",
    padding: 0,
    ":hover": {
      color: "#FF0000",
      opacity: 1,
    },
  }),
  // menuPortal: (provided) => ({
  //   ...provided,
  //   zIndex: 9999,
  // }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
    overflowY: "auto", // Required for scrolling
    maxHeight: "200px", // Optional, sets menu height
    // zIndex: 9999,
    // top: "auto",
    // bottom: "100%",
  }),

  menuList: (provided) => ({
    ...provided,
    padding: "0",
    maxHeight: "200px",
    overflowY: "auto", // Enables scrolling
    scrollbarWidth: "inherit", // For Firefox
    "&::-webkit-scrollbar": {
      width: "7px",
      height: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#fff", // Scrollbar color
      borderRadius: "10px", // Scrollbar shape
      border: "2px",
      borderStyle: "solid",
      borderColor: "#d8d7d7",
      position: "absolute",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      //backgroundColor: "#555", // Hover color
    },
    "&::-webkit-scrollbar-track": {
      background: "#f3f3f3",
      borderRadius: "10px", // Track color
    },

    "&::-webkit-scrollbar-button": {
      display: "none",
    },
  }),
};

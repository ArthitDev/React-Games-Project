import React from "react";
import { Input, Box } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

function SearchBoxAdmin({ value, onChange }) {
  const windowWidth = window.innerWidth;

  const searchIconStyle = {
    position: "absolute",
    top: "28%",
    color: "#68758a",
    cursor: "pointer",
  };

  if (windowWidth <= 320) {
    searchIconStyle.right = "10%";
  } else if (windowWidth <= 700 || windowWidth <= 500) {
    searchIconStyle.right = "5%";
  } else if (windowWidth <= 820) {
    searchIconStyle.right = "20%";
  } else if (windowWidth <= 834) {
    searchIconStyle.right = "21%";
  } else if (windowWidth <= 884) {
    searchIconStyle.right = "23%";
  } else if (windowWidth <= 900 || windowWidth <= 1100 ) {
      searchIconStyle.right = "27%";
  } else {
    searchIconStyle.right = windowWidth <= 1180 ? "25%" : "35%";
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      mb={5}
      position="relative"
      paddingBottom="1"
    >
      <FaSearch style={searchIconStyle} />
      <Input
        placeholder="ค้นหาเกม. . . ."
        value={value}
        onChange={onChange}
        style={{
          color: "#68758a",
          padding: "0.5rem",
          width: "100%",
          maxWidth: "500px",
          fontSize: "1rem",
          border: "1px solid #3c414b",
          borderRadius: "5px",
          paddingLeft: "1rem",
        }}
      />
    </Box>
  );
}

export default SearchBoxAdmin;

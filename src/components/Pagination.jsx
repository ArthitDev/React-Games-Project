import React from "react";
import { Button } from "@chakra-ui/react";

function Pagination({ currentPage, totalPages, onPageChange, totalGames }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Button
        as="a"
        href="#"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        marginRight="2"
        bg="#ff3130"
        color="white"
        _hover={{ backgroundColor: "#cbd5e0" }}
        textShadow="1px 1px 2px rgba(0, 0, 0, 0.5)"
      >
        หน้าแรก
      </Button>
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index + 1}
          as="a"
          href="#"
          mr="2"
          onClick={() => onPageChange(index + 1)}
          bg={currentPage === index + 1 ? "#ff3130" : "gray.200"}
          color={currentPage === index + 1 ? "white" : "gray.600"}
          _hover={{ backgroundColor: "#cbd5e0" }}
          textShadow="1px 1px 2px rgba(0, 0, 0, 0.5)"
        >
          {index + 1}
        </Button>
      ))}
      <Button
        as="a"
        href="#"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        ml="2"
        bg="#ff3130"
        color="white"
        _hover={{ backgroundColor: "#cbd5e0" }}
        textShadow="1px 1px 2px rgba(0, 0, 0, 0.5)"
      >
        หน้าสุดท้าย
      </Button>
    </div>
  );
}

export default Pagination;

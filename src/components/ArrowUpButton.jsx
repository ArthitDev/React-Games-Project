import React from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { ArrowUpIcon } from '@chakra-ui/icons';
import './ArrowUpButton.css'

function ArrowUpButton({ onClick }) {
  const [isSmScreen] = useMediaQuery("(max-width: 767px)");
  
  return (
    <Box
      position="fixed"
      bottom={isSmScreen ? "130px" : "70px"}
      right="20px"
      borderRadius="full"
      bg="gray.700"
      p="2"
      cursor="pointer"
      onClick={onClick}
      _hover={{ bg: "gray.800" }}
    >
      <ArrowUpIcon boxSize={6} color="white" />
    </Box>
  );
}

export default ArrowUpButton;

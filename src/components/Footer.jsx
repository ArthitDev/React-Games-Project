import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
const Footer = () => {
  const textColor = useColorModeValue("black.400", "gray.600");

  return (
    <Box
      as="footer"
      bg={useColorModeValue("gray.300", "gray.900")}
      py={4}
      position="sticky" // เปลี่ยนเป็น "fixed"
      bottom={0}
      width="100%" // เพิ่มคุณสมบัติ width เพื่อให้ footer เต็มความกว้างของหน้า
    >
      <Text color={textColor} textAlign="center">
        641413017@ArthitDev+ChatGPT For CIT5603
      </Text>
    </Box>
  );
};

export default Footer;

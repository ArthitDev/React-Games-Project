import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";

const Page404 = () => {
  return (
    <Flex minHeight="83.5vh" alignItems="center" justifyContent="center">
      <Box textAlign="center">
        <Text fontSize="6xl" fontWeight="bold" mb={4}>
          404
        </Text>
        <Text fontSize="2xl" mb={8}>
          Page not found
        </Text>
        <Link>
          <Button as={NavLink} to="/" colorScheme="teal" size="lg">
            กลับไปหน้าหลัก
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Page404;

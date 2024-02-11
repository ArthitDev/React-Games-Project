import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  ChakraProvider,
  extendTheme,
  Box,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";

const AddGameForm = () => {
  const [game_names, setPtitle] = useState("");
  const [pprice, setPprice] = useState("");
  const [pfile, setPfile] = useState("");
  const [message, setMessage] = useState("");

  const theme = extendTheme({
    fonts: {
      body: "Roboto, sans-serif",
      heading: "Poppins, sans-serif",
    },
  });

  const textColor = useColorModeValue("black.400", "gray.600");

  return (
    <ChakraProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="83.5vh" // You can adjust the height as needed
      >
        <form>
          <FormControl>
            <FormLabel>Game ID</FormLabel>
            <Input type="text" name="game_id" placeholder="ป้อน ID" />
          </FormControl>
          <FormControl>
            <FormLabel>Game Name</FormLabel>
            <Input type="text" name="game_name" placeholder="ป้อนชื่อเกม" />
          </FormControl>
          <FormControl>
            <FormLabel>Game Description</FormLabel>
            <Textarea name="game_description" placeholder="ป้อนคำอธิบาย" />
          </FormControl>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input type="text" name="img" placeholder="ป้อนลิงค์รูปภาพ" />
          </FormControl>
          <FormControl>
            <FormLabel>Game Type</FormLabel>
            <Input type="text" name="game_type" placeholder="ป้อนประเภทเกม" />
          </FormControl>
          <Button mt="3" type="submit">
            Add Game
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default AddGameForm;

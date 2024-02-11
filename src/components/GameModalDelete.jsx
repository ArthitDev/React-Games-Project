// GameModalDelete.js
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
} from "@chakra-ui/react";

const GameModalDelete = ({ isOpen, closeModal, handleDelete }) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ลบข้อมูลเกม</ModalHeader>
        <ModalBody>
          <Text>คุณต้องการลบข้อมูลเกมนี้หรือไม่?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={closeModal}>
            ยกเลิก
          </Button>
          <Button colorScheme="red" onClick={handleDelete}>
            ลบ
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameModalDelete;

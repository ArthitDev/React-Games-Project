// GameModal.js
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
  Input,
  Box,
  Select,
  FormLabel
} from "@chakra-ui/react";

const GameModalInsert = ({
  isOpen,
  closeModal,
  modalData,
  handleSave,
  handleInputChange,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>เพิ่มข้อมูล</ModalHeader>
        <ModalBody>
          <Box>
            <FormLabel>ชื่อเกม</FormLabel>
            <Input
              value={modalData.game_name}
              onChange={(e) => handleInputChange("game_name", e.target.value)}
            />
            <FormLabel>คำอธิบาย</FormLabel>
            <Input
              value={modalData.game_description}
              onChange={(e) =>
                handleInputChange("game_description", e.target.value)
              }
            />
            <FormLabel>รูปภาพ</FormLabel>
            <Input
              value={modalData.img}
              onChange={(e) => handleInputChange("img", e.target.value)}
            />
            <FormLabel>ประเภทเกม ณ ตอนนี้</FormLabel>
            <Input
              value={modalData.game_type}
              // onChange={(e) => handleInputChange("game_type", e.target.value)}
            />
            <FormLabel>เลือกประเภทเกม</FormLabel>
            <Select
              value={modalData.game_type}
              onChange={(e) => handleInputChange("game_type", e.target.value)}
            >
              <option value="Action Games">Action Games</option>
              <option value="Adventure Games">Adventure Games</option>
              <option value="RPG Games">RPG Games</option>
              <option value="Strategy Games">Strategy Games</option>
              <option value="Sports Games">Sports Games</option>
              <option value="Simulation Games">Simulation Games</option>
              <option value="Casual Games">Casual Games</option>
              <option value="Horror Games">Horror Games</option>
              <option value="Puzzle Games">Puzzle Games</option>
              <option value="Music Games">Music Games</option>
              <option value="Classic Games">Classic Games</option>
              <option value="Multiplayer Games">Multiplayer Games</option>
            </Select>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={handleSave}>
            บันทึก
          </Button>
          <Button colorScheme="red" onClick={closeModal}>
            ยกเลิก
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameModalInsert;

import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";

const GameModalUpdate = ({
  isOpen,
  closeModal,
  modalData,
  handleUpdate,
  handleInputChange,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>แก้ไขข้อมูล</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>ชื่อเกม</FormLabel>
            <Input
              value={modalData.game_name}
              onChange={(e) => handleInputChange("game_name", e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>คำอธิบายเกม</FormLabel>
            <Textarea
              value={modalData.game_description}
              onChange={(e) =>
                handleInputChange("game_description", e.target.value)
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>รูปภาพ</FormLabel>
            <Input
              value={modalData.img}
              onChange={(e) => handleInputChange("img", e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>ประเภทเกม ณ ตอนนี้</FormLabel>
            <Input
              value={modalData.game_type}
              // onChange={(e) => handleInputChange("game_type", e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
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
          </FormControl>
          {/* <FormControl mb={4}>
            <FormLabel>คะแนน</FormLabel>
            <Input
              type="number"
              value={modalData.score}
              onChange={(e) => handleInputChange("score", e.target.value)}
            />
          </FormControl> */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleUpdate}>
            บันทึกการแก้ไข
          </Button>
          <Button variant="ghost" onClick={closeModal}>
            ยกเลิก
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameModalUpdate;

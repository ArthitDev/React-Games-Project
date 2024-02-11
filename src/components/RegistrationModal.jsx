import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  Input,
  Button,
  FormControl,
} from "@chakra-ui/react";

const RegistrationModal = ({
  showModal,
  setShowModal,
  newName,  
  handleNewNameChange,
  newEmail,
  handleNewEmailChange,
  newPassword,
  handleNewPasswordChange,  
  handleRegistration,
  registrationSuccess,
  showAlert_2,
  showAlertNull,
}) => {
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>สมัครสมาชิก</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {registrationSuccess ? (
            <Alert status="success" mb="4">
              <AlertIcon />
              <AlertTitle mr={2}>สมัครสมาชิกสำเร็จ!</AlertTitle>
            </Alert>
          ) : (
            <>
              <Input
                variant="filled"
                placeholder="ป้อนชื่อ"
                value={newName}
                type="text"
                onChange={handleNewNameChange}
              />
              <Input
                mt="4"
                variant="filled"
                placeholder="ป้อนอีเมล"
                value={newEmail}
                type="email"
                onChange={handleNewEmailChange}
              />
              <Input
                mt="4"
                variant="filled"
                placeholder="ป้อนรหัสผ่าน"
                required
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
              {showAlert_2 && (
                <Alert status="error" mt="5" height="50px" borderRadius="8px">
                  <AlertIcon />
                  <AlertTitle mr={2}>อีเมลหรือรหัสผ่านถูกใช้แล้ว</AlertTitle>
                </Alert>
              )}
              {showAlertNull && (
                <Alert status="error" mt="5" height="50px" borderRadius="8px">
                  <AlertIcon />
                  <AlertTitle mr={2}>กรุณาป้อนข้อมูลให้ครบถ้วน</AlertTitle>
                </Alert>
              )}
              <Button colorScheme="blue" mt="4" onClick={handleRegistration}>
                สมัครสมาชิก
              </Button>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RegistrationModal;

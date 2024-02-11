import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm ,onConfirmDelete}) => {
  const cancelRef = React.useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            ยืนยันการออกจากระบบ
          </AlertDialogHeader>

          <AlertDialogBody>คุณต้องการออกจากระบบใช่หรือไม่?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              ยกเลิก
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              ยืนยัน
            </Button>
            {/* <Button colorScheme="red" onClick={onConfirmDelete} ml={3}>
              ยืนยันและลบบัญชีผู้ใช้
            </Button> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default LogoutConfirmationModal;

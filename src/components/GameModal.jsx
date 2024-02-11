import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
  useMediaQuery,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  AlertDialog,
  AlertTitle,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import { useApi } from "../api/ApiContext"; // ตรวจสอบ path ให้ถูกต้อง

function GameModal({ isOpen, onClose, selectedGame }) {
  const [isSmallerThan720] = useMediaQuery("(max-width: 720px)");
  const modalSize = isSmallerThan720 ? "full" : "lg";
  const [comment, setComment] = useState("");
  const [vote, setVote] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [showInputNullModal, setShowInputNullModal] = useState(false);
  const [showPleaseLoginModal, setShowPleaseLoginModal] = useState(false);
  const [showConfirmLoginModal, setShowConfirmLoginModal] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [whoComment, setWhoComment] = useState(() => {
    const storedComment = localStorage.getItem("whoComment");
    return storedComment ? JSON.parse(storedComment) : [];
  });
  const navigate = useNavigate();

  const { apiUrl } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      setShowPleaseLoginModal(true);
      return;
    }

    if (comment.trim() === "" || !/^\d+$/.test(vote)) {
      setStatus("error");
      setMessage("กรุณากรอกความคิดเห็นและคะแนนที่ต้องการให้ก่อนส่ง");
      setShowInputNullModal(true);
      return;
    }

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const loggedInUserName = loggedInUser?.name || "";
    const loggedInUserEmail = loggedInUser?.email || "";

    if (loggedInUserName && loggedInUserEmail) {
      const newComment = {
        email: loggedInUserEmail,
        comment: comment,
        gameid: selectedGame?.game_id || "",
        gamename: selectedGame?.game_name || "",
        vote: vote,
        username: loggedInUserName, // Add username here
      };
      const existingComments =
        JSON.parse(localStorage.getItem("whoComment")) || [];
      const updatedComments = [...existingComments, newComment];
      localStorage.setItem("whoComment", JSON.stringify(updatedComments));
      setWhoComment(updatedComments);
    }

    setIsConfirmationOpen(true);

    const data = {
      game_id: selectedGame.game_id,
      comment: comment,
      vote: vote,
      username: loggedInUserName,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      setStatus(responseData.status);
      setMessage(responseData.message);

      // Reset form fields after successful submission
      setComment("");
      setVote("");
      setIsConfirmationOpen(false);
      setShowThankYouModal(true);
      return;
    } catch (error) {
      setStatus("error");
      setMessage("เกิดข้อผิดพลาดในการเพิ่มความคิดเห็น");
    }
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
    // onClose(); // Close the main modal
  };

  const closePleaseLoginModal = () => {
    setShowPleaseLoginModal(false);
    // onClose(); // Close the main modal
  };

  const closeThankYouModal = () => {
    setShowThankYouModal(false);
    window.location.reload(); // Reload the webpage
  };

  const closeInputNull = () => {
    setShowInputNullModal(false);
  };

  const closeNull = () => {
    setIsConfirmationOpen(false);
    setShowInputNullModal(false);
  };

  const closeConfirmLoginModal = () => {
    setShowConfirmLoginModal(false);
  };

  // const gameComments = whoComment.filter(
  //   (comment) => comment.gameid === selectedGame?.game_id
  // );

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsTooltipOpen(false);
        onClose();
        setComment("");
        setVote("");
      }}
      size={modalSize}
    >
      <ModalOverlay />
      <ModalContent mt="0">
        <ModalHeader>
          {selectedGame?.game_name}
          <Text fontSize="16px">คะแนนรวม: {selectedGame?.score} คะแนน</Text>
          <Text mt="2" color="gray.600" fontStyle="italic">
            ประเภทเกม : {selectedGame?.game_type}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image
              borderRadius="8px"
              src={selectedGame?.img}
              alt={selectedGame?.game_name}
              objectFit="cover"
              width="60%"
            />
          </div>
          <Text mt="2" color="gray.500">
            คำอธิบาย : {selectedGame?.game_description}
          </Text>
          <Text mt="4" fontWeight="bold" color="gray.500">
            ความคิดเห็นทั้งหมด:
          </Text>
          {selectedGame?.comment.map((comment, index) => (
            <div key={index}>
              <Alert
                key={comment.id}
                // status="info"
                mt={2}
                pb={2}
                borderRadius="8px"
                bg={
                  comment.vote >= 80
                    ? "yellow.200"
                    : comment.vote >= 50
                    ? "green.200"
                    : comment.vote >= 1
                    ? "red.200"
                    : "red.200"
                }
              >
                {/* <AlertIcon /> */}
                <Box flex="1">
                  <Text fontSize="sm" color="gray.600" fontWeight="bold">
                    โดย : {comment.username_text}
                  </Text>
                  <Text fontSize="sm" fontWeight="medium" color="gray.600">
                    {" "}
                    ความคิดเห็น : {comment.comment_text}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    คะแนน: {comment.vote}
                  </Text>
                </Box>
              </Alert>
            </div>
          ))}

          <div>
            <Text mt="2" mb="1" fontWeight="bold" color="gray.500">
              แสดงความคิดเห็นและให้คะแนน :
            </Text>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleSubmit}>
            <FormControl mb={1}>
              <FormLabel></FormLabel>
              <Input
                placeholder="ป้อนความคิดเห็น"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel></FormLabel>
              {/* <Input
                placeholder="คะแนน 1-100"
                type="number"
                value={vote}
                onChange={(e) => setVote(e.target.value)}
                isDisabled
              /> */}
            </FormControl>
            {/* With this */}
            <FormControl mb={4}>
              <FormLabel fontWeight="bold" color="gray.500">
                เลื่อนแถบเลื่อนเพื่อให้คะแนนโหวต :
              </FormLabel>
              <Slider
                value={!isNaN(parseInt(vote)) ? parseInt(vote) : 0}
                onChange={(value) => setVote(value.toString())}
                defaultValue={0}
                min={0}
                max={100}
                step={1}
                onMouseEnter={() => setIsTooltipOpen(true)}
                onMouseDown={() => setIsSliderDragging(true)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <Tooltip
                  label={`คะแนน: ${vote}`}
                  placement="top"
                  hasArrow
                  isOpen={isTooltipOpen}
                >
                  <SliderThumb />
                </Tooltip>
              </Slider>
            </FormControl>

            <Button
              type="button"
              colorScheme="blue"
              onClick={() => setIsConfirmationOpen(true)}
            >
              ส่งความคิดเห็น
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>
            ปิด
          </Button>
        </ModalFooter>
        <AlertDialog
          isOpen={isConfirmationOpen}
          onClose={closeConfirmation}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                ยืนยันการแสดงความคิดเห็น
              </AlertDialogHeader>
              <AlertDialogBody>
                คุณต้องการแสดงความคิดเห็นหรือไม่ ?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={closeConfirmation}>ยกเลิก</Button>
                <Button colorScheme="green" onClick={handleSubmit} ml={3}>
                  ตกลง
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </ModalContent>
      {showThankYouModal && (
        <Modal isOpen={showThankYouModal} onClose={closeThankYouModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>ขอบคุณ!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>ขอบคุณสำหรับความคิดเห็นและโหวตของคุณ!</ModalBody>
            <ModalFooter>
              <Button
                colorScheme="green"
                onClick={() => {
                  setShowThankYouModal(false);
                  window.location.reload();
                }}
              >
                ปิด
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {showPleaseLoginModal && (
        <Modal isOpen={showPleaseLoginModal} onClose={closePleaseLoginModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>กรุณาเข้าสู่ระบบหรือสมัครสมาชิก !</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              กรุณาเข้าสู่ระบบหรือสมัครสมาชิกเพื่อแสดงความคิดเห็นและให้คะแนน
            </ModalBody>
            <ModalFooter>
              <Button
                mr="3"
                colorScheme="blue"
                onClick={() => {
                  setShowConfirmLoginModal(true);
                  setIsConfirmationOpen(false);
                }}
              >
                ไปยังหน้าเข้าสู่ระบบ & สมัคร
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  setShowPleaseLoginModal(false);
                  setIsConfirmationOpen(false);
                  setShowConfirmLoginModal(false);
                }}
              >
                ปิด
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {showConfirmLoginModal && (
        <Modal isOpen={showConfirmLoginModal} onClose={closeConfirmLoginModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>ยืนยันไปยังหน้าเข้าสู่ระบบ</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              ระบบจะนำคุณไปยังหน้าเข้าสู่ระบบหากกดยืนยัน - ขอบคุณ
            </ModalBody>
            <ModalFooter>
              <Button
                mr="3"
                colorScheme="blue"
                onClick={() => {
                  navigate("/login");
                }}
              >
                ยืนยัน
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  setShowPleaseLoginModal(false);
                  setIsConfirmationOpen(false);
                  setShowConfirmLoginModal(false);
                }}
              >
                ยกเลิก
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {showInputNullModal && (
        <Modal isOpen={setShowInputNullModal} onClose={closeInputNull}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>กรุณาป้อนข้อมูลให้ครบถ้วน !!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>ป้อนข้อความแสดงความคิดเห็น และ คะแนนความชอบ</ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                onClick={() => {
                  closeNull();
                }}
              >
                ปิด
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Modal>
  );
}

export default GameModal;

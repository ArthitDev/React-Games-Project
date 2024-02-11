import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useApi } from "../api/ApiContext";

function CommentForm() {
  // ตัวแปร state เพื่อเก็บค่าข้อมูลที่ผู้ใช้ป้อนและข้อมูลการตอบกลับจาก API
  const [gameId, setGameId] = useState("");
  const [comment, setComment] = useState("");
  const [vote, setVote] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  // ดึงค่า apiUrl จาก context โดยใช้ useApi hook
  const { apiUrl } = useApi();

  // ฟังก์ชันสำหรับการจัดการการส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();

    // เตรียมข้อมูลที่จะส่งใน POST request
    const data = {
      game_id: gameId,
      comment: comment,
      vote: vote,
    };

    try {
      // ส่ง POST request ไปที่ API โดยใช้ apiUrl จาก context
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // แปลงข้อมูลการตอบกลับเป็น JSON
      const responseData = await response.json();
      setStatus(responseData.status);
      setMessage(responseData.message);
    } catch (error) {
      // จัดการข้อผิดพลาดโดยกำหนดค่า status และ message
      setStatus("error");
      setMessage("เกิดข้อผิดพลาดในการเพิ่มความคิดเห็น");
    }
  };

  return (
    <Box p={4} minHeight="83.5vh" maxWidth="400px" mx="auto">
      <Heading size="md" mb={4}>
        เพิ่มความคิดเห็น
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>รหัสเกม:</FormLabel>
          <Input value={gameId} onChange={(e) => setGameId(e.target.value)} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>ความคิดเห็น:</FormLabel>
          <Input value={comment} onChange={(e) => setComment(e.target.value)} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>โหวต:</FormLabel>
          <Input value={vote} onChange={(e) => setVote(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          ส่งความคิดเห็น
        </Button>
      </form>
      {/* แสดงสถานะและข้อความที่ได้ */}
      {status && <Text mt={2}>สถานะ: {status}</Text>}
      {message && <Text mt={2}>{message}</Text>}
    </Box>
  );
}

export default CommentForm;

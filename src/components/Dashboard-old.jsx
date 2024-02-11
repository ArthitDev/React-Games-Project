import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ChakraProvider,
  Box,
  SimpleGrid,
  Image,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useApi } from "../api/ApiContext";
import GameModalInsert from "./GameModalInsert";
import GameModalDelete from "./GameModalDelete";
import GameModalUpdate from "./GameModalUpdate";

const getGamesData = async (apiUrl) => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    return [];
  }
};

const Dashboard = () => {
  const { apiUrl } = useApi();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteGameId, setDeleteGameId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const GamesData = await getGamesData(apiUrl);
      setData(GamesData);
    } catch (error) {
      console.error("An error occurred while fetching game data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  const openDeleteModal = (game_id) => {
    setIsDeleteModalOpen(true);
    setDeleteGameId(game_id);
    console.log("บรรทัด 51 ", game_id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteGameId(null);
  };

  const handleDelete = async () => {
    try {
      // Delete the game data using the apiUrl and game_id
      await axios.delete(`${apiUrl}/${deleteGameId}`);
      console.log("Data deleted บรรทัด 62:", deleteGameId);

      // Close the delete modal and update the data
      closeDeleteModal();
      fetchData();
    } catch (error) {
      console.error("An error occurred while deleting data:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setModalData({
      game_name: "",
      game_description: "",
      img: "",
      game_type: "",
      score: "",
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [modalData, setModalData] = useState({
    game_name: "",
    game_description: "",
    img: "",
    game_type: "",
    score: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post(apiUrl, modalData);
      console.log("Data added:", response.data);

      // Close the modal and update the data
      closeModal();
      fetchData();
    } catch (error) {
      console.error("An error occurred while adding data:", error);
    }
  };

  const openUpdateModal = (gameId) => {
    const gameToEdit = data.find((game) => game.game_id === gameId);
    setModalData(gameToEdit);
    setIsUpdateModalOpen(true);
  };

  // Close the update modal
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/${modalData.game_id}`,
        modalData
      );
      console.log("Data updated:", response.data);

      // Close the update modal and refresh data
      closeUpdateModal();
      fetchData();
    } catch (error) {
      console.error("An error occurred while updating data:", error);
    }
  };

  return (
    <ChakraProvider>
      <Button
        colorScheme="green"
        mt={10}
        ml={14}
        onClick={openModal}
        style={{ width: "150px" }}
      >
        เพิ่มข้อมูล
      </Button>
      <Box p={50}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={6}>
          {data.map((game) => (
            <Flex
              key={game.game_id}
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              direction="column"
              h="100%"
            >
              <Image
                src={game.img}
                alt={game.game_name}
                maxH="360px"
                objectFit="cover"
              />
              <Button
                colorScheme="blue"
                mt={2}
                onClick={() => openUpdateModal(game.game_id)}
              >
                แก้ไขข้อมูล
              </Button>
              <Button
                colorScheme="red"
                mt={2}
                onClick={() => openDeleteModal(game.game_id)}
              >
                ลบข้อมูล
              </Button>

              <Box p="6" flex="1" textAlign="center">
                <Box
                  d="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb="2"
                >
                  <Text
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                  >
                    ลำดับ {game.game_id}
                  </Text>
                </Box>
                <Text
                  mt="1"
                  fontWeight="semibold"
                  fontSize="xl"
                  lineHeight="tight"
                >
                  {game.game_name}
                </Text>
                <Text mt="2" color="gray.600">
                  {game.game_description.slice(0, 100)}
                  {game.game_description.length > 100 ? "..." : ""}
                </Text>
              </Box>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>
      {/* Insert Modal */}
      <GameModalInsert
        isOpen={isModalOpen}
        closeModal={closeModal}
        modalData={modalData}
        handleSave={handleSubmit}
        handleInputChange={(field, value) =>
          setModalData((prevData) => ({ ...prevData, [field]: value }))
        }
      />
      {/* Delete Confirmation Modal */}
      <GameModalDelete
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        handleDelete={handleDelete}
      />
      <GameModalUpdate
        isOpen={isUpdateModalOpen}
        closeModal={closeUpdateModal}
        modalData={modalData}
        handleUpdate={handleUpdate} // Pass the handleUpdate function
        handleInputChange={(field, value) =>
          setModalData((prevData) => ({ ...prevData, [field]: value }))
        }
      />
    </ChakraProvider>
  );
};

export default Dashboard;

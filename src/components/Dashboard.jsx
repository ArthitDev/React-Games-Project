import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import {
  ChakraProvider,
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  Flex,
  Button,
  Container,
} from "@chakra-ui/react";
import { useApi } from "../api/ApiContext";
import GameModalInsert from "./GameModalInsert";
import GameModalDelete from "./GameModalDelete";
import GameModalUpdate from "./GameModalUpdate";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import Pagination from "./Pagination";
import SearchBoxAdmin from "./SearchBoxAdmin";
import "./Dashboard.css";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const cardsPerPage = 10;
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const GamesData = await getGamesData(apiUrl);
      setData(GamesData);
    } catch (error) {
      console.error("An error occurred while fetching game data:", error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
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

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const totalPages = Math.ceil(data.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const filteredGames = data.filter(
    (game) =>
      game.game_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (game.game_type.toLowerCase() === selectedType.toLowerCase() ||
        selectedType === "all")
  );

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    navigate("/login");
    location.reload();
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };
  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };
  const cancelLogout = () => {
    closeLogoutModal();
  };
  const confirmLogout = () => {
    closeLogoutModal();
    localStorage.removeItem("loggedInUser");
    handleLogout(); // Call your existing handleLogout function
  };

  const confirmLogoutAndDelete = () => {
    // Get the logged-in user's data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // Get the list of registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers"));

    // Find the index of the logged-in user in the registeredUsers array
    const userIndexToDelete = registeredUsers.findIndex(
      (user) => user.email === loggedInUser.email
    );

    // Remove the user from the registeredUsers array
    if (userIndexToDelete !== -1) {
      registeredUsers.splice(userIndexToDelete, 1);
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    }

    // Proceed with the regular logout logic
    confirmLogout();
  };

  const checkLoginStatus = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isStatus = localStorage.getItem("isStatus");

    if (!isLoggedIn) {
      navigate("/login");
      return <Navigate to="/login" />;
    }

    if (isStatus === "admin") {
      navigate("/dashboard");
    } else if (isStatus === "user") {
      navigate("/user-dashboard");
    } else {
      navigate("/");
    }
  };

  // Usage in the component, possibly in useEffect or wherever needed
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const isEmailRegistered = (email) => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers"));
    return registeredUsers.some((user) => user.email === email);
  };

  return (
    <ChakraProvider>
      <Text textAlign="center" fontSize="30px" fontWeight="bold" mt={10}>
        หน้าจัดการข้อมูลเกม,
        ยินดีต้อนรับผู้ดูแลระบบ !
      </Text>
      <Flex justifyContent="space-between">
        <Button
          colorScheme="green"
          mt={10}
          ml={11}
          onClick={openModal}
          style={{ width: "150px" }}
        >
          เพิ่มข้อมูลเกมใหม่
        </Button>
        <Button
          colorScheme="red"
          mt={10}
          mr={11}
          onClick={openLogoutModal}
          style={{ width: "150px" }}
        >
          ออกจากระบบ
        </Button>
      </Flex>

      <Box p={10}>
        <SearchBoxAdmin
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Container
          maxW="container.xl"
          mt="12"
          pb="12px"
          justifyContent="center"
        >
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(5, 1fr)",
            }}
            gap={6}
          >
            {filteredGames.length === 0 ? (
              <Text
                fontSize="xl"
                color="gray.600"
                textAlign="center"
                gridColumn="1 / -1"
              >
                ไม่พบเกม... ลองใช้คำอื่น
              </Text>
            ) : (
              filteredGames.slice(startIndex, endIndex).map((game) => (
                <GridItem key={game.game_id} colSpan={1}>
                  <Flex
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
                      maxH="300px"
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
                      <Text mt="2" color="gray.600" fontStyle="italic">
                        ประเภทเกม : {game.game_type}
                      </Text>
                    </Box>
                  </Flex>
                </GridItem>
              ))
            )}
          </Grid>
        </Container>
      </Box>
      {filteredGames.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
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
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={confirmLogout}
        onConfirmDelete={confirmLogoutAndDelete}
      />
    </ChakraProvider>
  );
};

export default Dashboard;

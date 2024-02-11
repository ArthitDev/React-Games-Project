import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import {
  Container,
  SimpleGrid,
  Box,
  Image,
  Heading,
  Text,
  useDisclosure,
  Flex,
  extendTheme,
  ChakraProvider,
  Select,
} from "@chakra-ui/react";
import { useApi } from "../api/ApiContext";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Pagination from "./Pagination";
import GameModal from "./GameModal";
import SearchBox from "./SearchBox";
import ImageSlideshow from "./ImageSlideshow";
import ArrowUpButton from "./ArrowUpButton";
import FilterSelect from "./FilterSelect";
import './GameModal.css'

function Homepage() {
  const { apiUrl } = useApi();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGame, setSelectedGame] = useState(null);
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  const [filterType, setFilterType] = useState(null);
  const [selectedGameType, setSelectedGameType] = useState("");
  const cardsPerPage = 15;

  // const divElementsInP = document.querySelectorAll("p > div");

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [apiUrl]);

  const handleGameClick = useCallback(
    (game) => {
      setSelectedGame(game);
      onOpen();
    },
    [onOpen]
  );

  const handleScroll = () => {
    const scrollThreshold = 300; // Adjust this threshold as needed
    if (window.scrollY > scrollThreshold) {
      setShowScrollArrow(true);
    } else {
      setShowScrollArrow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const [hoveredGameId, setHoveredGameId] = useState(null);
  const totalPages = Math.ceil(games.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.game_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.game_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.game_type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedGameType === "" || game.game_type === selectedGameType;

    return matchesSearch && matchesType;
  });

  // divElementsInP.forEach((divElement) => {
  //   console.log("ดู Error",divElement);
  // });
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sortedGames = useMemo(() => {
    return [...filteredGames].sort((a, b) => {
      return (b.score || 0) - (a.score || 0);
    });
  }, [filteredGames]);

  const theme = extendTheme({
    fonts: {
      body: "Roboto, sans-serif",
      heading: "Poppins, sans-serif",
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <ImageSlideshow />
      <Container
        minHeight="83.5vh"
        maxW="container.xl"
        mt="8"
        pb="12px"
        justifyContent="center"
      >
        {/* Search Input */}
        <SearchBox
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FilterSelect
          games={games}
          selectedGameType={selectedGameType}
          setSelectedGameType={setSelectedGameType}
        />
        {/* Card Grid */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={6}
        >
          {filteredGames.length === 0 ? (
            <Text fontSize="xl" color="gray.600" textAlign="center" w="100%">
              ไม่พบเกม... ลองใช้คำอื่น
            </Text>
          ) : (
            sortedGames.slice(startIndex, endIndex).map((game) => (
              <Box
                key={game.game_id}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="lg"
                overflow="hidden"
                onClick={() => handleGameClick(game)}
                onMouseEnter={() => setHoveredGameId(game.game_id)}
                onMouseLeave={() => setHoveredGameId(null)}
                _hover={{ cursor: "pointer" }}
              >
                <Box position="relative">
                  <Image
                    src={game.img}
                    alt={game.game_name}
                    objectFit="cover"
                    height="300px"
                    width="100%"
                    opacity={hoveredGameId === game.game_id ? 0.5 : 1}
                    transition="opacity 0.40s"
                  />
                  {hoveredGameId === game.game_id && (
                    <Text
                      position="absolute"
                      top="40%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      fontSize="2xl"
                      color="white"
                      fontWeight="bold"
                      textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
                    >
                      คลิกเพื่อดู
                    </Text>
                  )}
                  <Flex>
                    <Text
                      top="0"
                      right="0"
                      padding="2"
                      textAlign="end"
                      fontWeight="bold"
                      color={
                        game.score >= 80
                          ? "gold"
                          : game.score >= 50
                          ? "green"
                          : game.score >= 1
                          ? "red"
                          : "gray"
                      }
                    >
                      <WorkspacePremiumIcon
                        fontSize="large"
                        color="primary"
                        style={{ float: "left" }}
                      />
                      คะแนน :{" "}
                      {game.score ? `${game.score}/100.00` : "ไม่มีคะแนน"}
                    </Text>
                  </Flex>
                </Box>
                <Box p="4" flex="1" mt="-3">
                  <Heading fontSize="xl">{game.game_name}</Heading>
                  <Text mt="2" color="gray.500">
                    {game.game_description.slice(0, 50)}
                    {game.game_description.length > 50 ? (
                      <>
                        <span>{game.game_description.substring(0, 10)}...</span>
                      </>
                    ) : (
                      game.game_description
                    )}
                  </Text>
                  <Text mt="2" color="gray.600" fontStyle="italic">
                    ประเภทเกม : {game.game_type}
                  </Text>
                </Box>
              </Box>
            ))
          )}
        </SimpleGrid>
      </Container>
      {filteredGames.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <GameModal
        isOpen={isOpen}
        onClose={onClose}
        selectedGame={selectedGame}
      />
      {showScrollArrow && <ArrowUpButton onClick={handleScrollToTop} />}
    </ChakraProvider>
  );
}

export default Homepage;

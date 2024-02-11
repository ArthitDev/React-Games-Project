import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ChakraProvider,
  extendTheme,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import "./TableData.css";
import { useApi } from "../api/ApiContext";

const getGamesData = async (apiUrl) => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    return [];
  }
};

const theme = extendTheme({
  components: {
    Table: {
      baseStyle: {
        th: {
          borderBottomWidth: "1px",
        },
        td: {
          borderBottomWidth: "1px",
        },
      },
    },
  },
});

const GameTableRow = ({ game }) => (
  <Tr key={game.game_id}>
    <Td>{game.game_id}</Td>
    <Td>{game.game_name}</Td>
    <Td>{game.game_description}</Td>
    <Td>
      <img src={game.img} alt={game.game_name} style={{ maxWidth: "100px" }} />
    </Td>
  </Tr>
);

const TableData = () => {
  const { apiUrl } = useApi(); // ใช้ apiUrl จาก Context

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const GamesData = await getGamesData(apiUrl);
        setData(GamesData);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <ChakraProvider theme={theme}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ลำดับ</Th>
            <Th>ชื่อเกม</Th>
            <Th>คำอธิบาย</Th>
            <Th>รูปภาพ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((game) => (
            <GameTableRow key={game.game_id} game={game} />
          ))}
        </Tbody>
      </Table>
    </ChakraProvider>
  );
};

export default TableData;

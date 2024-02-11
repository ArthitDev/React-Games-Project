import React from "react";
import { Select, Flex } from "@chakra-ui/react";

function FilterSelect({ games, selectedGameType, setSelectedGameType }) {
  const gameTypeCounts = games.reduce((counts, game) => {
    const type = game.game_type;
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, {});

  const totalGameCount = games.length; // Calculate total count of all games

  return (
    <Flex width={{ base: "55%", md: "30%", lg: "17%" }} mb="10">
      <Select
        color="gray.500"
        border="1px solid #3c414b"
        placeholder=""
        value={selectedGameType}
        mb="3"
        mt="-2"
        onChange={(e) => setSelectedGameType(e.target.value)}
      >
        <option value="">ทั้งหมด ({totalGameCount}) เกม</option>
        {Array.from(new Set(games.map((game) => game.game_type))).map(
          (type) => (
            <option key={type} value={type}>
              {type} ({gameTypeCounts[type]})
            </option>
          )
        )}
      </Select>
    </Flex>
  );
}

export default FilterSelect;

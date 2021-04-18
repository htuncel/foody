import React from "react";
import { Container, Heading, Divider, Flex } from "@chakra-ui/react";
import IngredientList from "../components/IngredientList";
import SearchBar from "../components/SearchBar";
import SearchHistoryList from "../components/SearchHistoryList";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <Container maxWidth="100%" my="5">
      <Heading pb="2" mb={[2, 4]} mt={[5, 2]}>
        Search Ingredients
      </Heading>

      <Flex>
        <SearchHistoryList />
        <SearchBar />
      </Flex>

      <Divider my="1rem" />

      <IngredientList />
    </Container>
  );
};

export default Home;

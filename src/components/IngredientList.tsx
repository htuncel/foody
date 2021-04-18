import {
  Avatar,
  Flex,
  Text,
  Box,
  Skeleton,
  SkeletonCircle,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import toTitleCase from "../helpers/toTitleCase";
import { Ingredient } from "../models/SearchResult";

interface IngredientListProps {}

const IngredientList: React.FC<IngredientListProps> = ({}) => {
  const { searchResult, isLoading } = useContext(AppContext);

  return (
    <SimpleGrid w="100%" columns={[1, 2, 3]} spacing={[3, 5]}>
      {!isLoading && searchResult && searchResult.results.length > 0 ? (
        searchResult?.results.map((ingredient: Ingredient) => (
          <Flex
            px="4"
            py="4"
            boxShadow="base"
            direction="row"
            alignItems="center"
            key={"ingredient_list_item_" + ingredient.id}
          >
            <Avatar
              src={
                "https://spoonacular.com/cdn/ingredients_100x100/" +
                ingredient.image
              }
              name={ingredient.name}
            />
            <Text ml="3">{toTitleCase(ingredient.name)}</Text>
          </Flex>
        ))
      ) : isLoading ? (
        <>
          {Array(10)
            .fill(1)
            .map((_, index: number) => (
              <Box key={"skeleton_" + index}>
                <Flex alignItems="center" mb="4">
                  <SkeletonCircle size="50" mr="2" />
                  <Skeleton width="100%" height="50px" mr="10" />
                </Flex>
              </Box>
            ))}
        </>
      ) : (
        <Box key="ingredient_list_item_empty">
          Empty List. Try a different item to search.
        </Box>
      )}
    </SimpleGrid>
  );
};

export default IngredientList;

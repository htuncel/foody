import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { InputRightElement } from "@chakra-ui/react";
import { InputGroup } from "@chakra-ui/react";
import { Flex, Input, IconButton, Tooltip } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
  const { searchText, setSearchText, searchIngredients } = useContext(
    AppContext
  );

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent form from submitting
    e.preventDefault();
    if (searchText.trim().length > 0) {
      searchIngredients();
    }
    return false;
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
      <Flex
        width="100%"
        direction="row"
        justifyContent="center"
        alignItems="start"
      >
        <InputGroup>
          <Input
            mr="0.5"
            placeholder="Food ingredients e.g. fruits, vegetables, nuts, grains, meat, fish, dairy etc."
            size="md"
            id="search"
            name="search"
            value={searchText}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setSearchText(e.currentTarget.value)
            }
            type="text"
          />
          <InputRightElement
            children={<CloseIcon color="red.500" />}
            onClick={() => setSearchText("")}
          />
        </InputGroup>

        <Tooltip label="Search" fontSize="md">
          <IconButton type="submit" aria-label="Search" icon={<SearchIcon />} />
        </Tooltip>
      </Flex>
    </form>
  );
};

export default SearchBar;

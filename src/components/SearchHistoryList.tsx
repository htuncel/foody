import React, { useContext } from "react";
import {
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import { TimeIcon, ChevronRightIcon, DeleteIcon } from "@chakra-ui/icons";
import { AppContext } from "../context/AppContext";

interface SearchHistoryListProps {}

const SearchHistoryList: React.FC<SearchHistoryListProps> = ({}) => {
  const { searchHistory, clearHistory, onClickHistory } = useContext(
    AppContext
  );

  return (
    <Menu>
      <Tooltip label="Show Search History" fontSize="md">
        <MenuButton
          mr={[2, 4]}
          as={IconButton}
          aria-label="Options"
          icon={<TimeIcon />}
          variant="outline"
        />
      </Tooltip>
      <MenuList p="0">
        {searchHistory && searchHistory.length > 0 ? (
          searchHistory.map((searchText: string, index: number) => (
            <MenuItem
              key={searchText + "_" + index}
              icon={<ChevronRightIcon />}
              onClick={() => {
                onClickHistory(searchText);
              }}
            >
              {searchText}
            </MenuItem>
          ))
        ) : (
          <MenuItem key="empty_history_item">
            <Text>Empty history</Text>
          </MenuItem>
        )}
        {searchHistory && searchHistory.length > 0 ? (
          <MenuItem
            key="clear_history_item"
            bg="red.500"
            onClick={clearHistory}
          >
            <DeleteIcon mr="2.5" />
            <Text>Clear History</Text>
          </MenuItem>
        ) : null}
      </MenuList>
    </Menu>
  );
};

export default SearchHistoryList;

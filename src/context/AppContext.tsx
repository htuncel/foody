import { useToast } from "@chakra-ui/react";
import { createContext, useCallback, useRef, useState } from "react";
import SearchResult from "../models/SearchResult";

// context holds most of the application state
type AppContextType = {
  searchText: string;
  isLoading: boolean;
  searchResult: SearchResult | undefined;
  searchHistory: string[];
  searchIngredients: () => Promise<void>;
  setSearchText: (t: string) => void;
  clearHistory: () => void;
  onClickHistory: (t: string) => void;
};

export const AppContext = createContext<AppContextType>({
  searchText: "",
  isLoading: false,
  searchResult: undefined,
  searchHistory: [],
  searchIngredients: async () => {},
  setSearchText: () => {},
  clearHistory: () => {},
  onClickHistory: () => {},
});

const AppContextProvider: React.FC = ({ children }) => {
  const toast = useToast();
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /* const [searchResults, setSearchResults] = useState<any>(
    JSON.parse(localStorage.getItem("searchResults") ?? "{}")
  ); */
  // useState was not updating properly so made a quick fix
  const searchResultsRef = useRef<any>(
    JSON.parse(localStorage.getItem("searchResults") ?? "{}")
  );
  const [searchResult, setSearchResult] = useState<SearchResult | undefined>(
    undefined
  );
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const clearHistory = useCallback(() => {
    setSearchHistory((_) => []);
  }, []);

  // on clicking previously searched text get the result from saved results.
  const onClickHistory = useCallback((text: string) => {
    setIsLoading(true);
    setSearchText(text);
    setSearchResult(searchResultsRef.current[text]);
    setIsLoading(false);
  }, []);

  // search ingredients
  // check the already searched results to save a fetch request to api.
  // if not searched before do search then save the result.
  const searchIngredients = async (): Promise<void> => {
    setIsLoading(true);
    if (searchResultsRef.current[searchText] !== undefined) {
      setSearchResult(searchResultsRef.current[searchText]);
    } else {
      const apiResponse = await fetch(`/api/ingredients?search=${searchText}`);
      let result: any = await apiResponse.json();

      // checking for api errors
      // if the usage limit is reached it returnes 401
      if (!result || result.code !== undefined) {
        toast({
          title: "API Error",
          description: result.message,
          status: "error",
          duration: 3500,
          isClosable: true,
        });
        result = undefined;
      }

      if (result !== undefined) {
        searchResultsRef.current = {
          ...searchResultsRef.current,
          [searchText]: result,
        };

        localStorage.setItem(
          "searchResults",
          JSON.stringify(searchResultsRef.current)
        );
        /* setSearchResults({
          ...searchResults,
          [searchText]: result,
        }); */
      }

      setSearchResult(result);
    }

    setIsLoading(false);

    // if searched text is not in last 10 searches add it to history.
    if (searchHistory.filter((s) => s === searchText).length === 0) {
      setSearchHistory((previousSearchHistory) => {
        const prev = [...previousSearchHistory];
        if (prev.length >= 10) {
          prev.shift();
        }
        return [...prev, searchText];
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        searchText,
        isLoading,
        searchResult,
        searchHistory,
        searchIngredients,
        setSearchText,
        clearHistory,
        onClickHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

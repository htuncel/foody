import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import Home from "./home";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import AppContextProvider from "../context/AppContext";

const Index = () => {
  return (
    <AppContextProvider>
      <Image
        zIndex="-1"
        opacity=".25"
        width="100vw"
        height="100vh"
        objectFit="cover"
        position="fixed"
        src="/bg.jpg"
        alt="background image"
      />
      <Flex
        direction="column"
        align="center"
        height="100vh"
        maxW={{ xl: "1200px" }}
        m="0 auto"
      >
        <Home />
        <DarkModeSwitch />
      </Flex>
    </AppContextProvider>
  );
};

export default Index;

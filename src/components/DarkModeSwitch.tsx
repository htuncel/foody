import { useColorMode, Switch, Flex } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Flex position="fixed" top="1rem" right="1rem" alignItems="center">
      <SunIcon w={6} h={6} mr="2" color="yellow.400" />
      <Switch color="green" isChecked={isDark} onChange={toggleColorMode} />
      <MoonIcon w={6} h={6} ml="2" />
    </Flex>
  );
};

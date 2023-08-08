import { ReactNode } from "react";
import { Flex, Box } from "@chakra-ui/react";
import SideBar from "../modules/SideBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex minH="100vh">
      <SideBar />
      <Box overflow="hidden" width="full" py={8} px={4}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;

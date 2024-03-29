import { useState, useEffect } from "react";
import { IconButton, Button, Box, Flex } from "@chakra-ui/react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Package,
  ShoppingCart,
} from "react-feather";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDeviceDetect } from "@/contexts/device-provider";

const WIDTH = "250px";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home />,
  },
  {
    title: "Products",
    href: "/products",
    icon: <Package />,
  },
  {
    title: "Carts",
    href: "/carts",
    icon: <ShoppingCart />,
  },
];

type MenuItem = {
  title: string;
  href: string;
  icon: JSX.Element;
};

export function SideBar() {
  const { isMobile } = useDeviceDetect();
  const [hide, setHide] = useState(isMobile);
  const router = useRouter();

  useEffect(() => {
    if (isMobile) setHide(true);
    else setHide(false);
  }, [isMobile]);

  return (
    <Box
      position="relative"
      flex="none"
      width={hide || isMobile ? "60px" : WIDTH}
    >
      <Box
        width={hide ? "inherit" : WIDTH}
        height="full"
        position="absolute"
        zIndex="docked"
        backgroundColor="white"
        boxShadow="0px 2px 8px 0px #0000001a;"
      >
        <Flex justify="flex-end">
          <IconButton
            variant="ghost"
            aria-label="Show | Hide"
            color="gray.500"
            icon={hide ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
            onClick={() => setHide((prev) => !prev)}
          />
        </Flex>
        <Flex
          p={2}
          gap={2}
          overflowY="auto"
          overflowX="hidden"
          flexDirection="column"
        >
          {menuItems?.map((item: MenuItem) => (
            <Link key={item.title} href={item.href}>
              <Button
                p={2.5}
                leftIcon={item.icon}
                width="full"
                variant="outline"
                justifyContent="flex-start"
                {...(router.pathname && router.pathname.includes(item.href)
                  ? {
                      backgroundColor: "teal.500",
                      border: "1px solid teal",
                      color: "white",
                      _hover: { color: "white" },
                    }
                  : {
                      backgroundColor: "white",
                      border: "0.5px solid gray",
                      _hover: { color: "teal", border: "1px solid teal" },
                    })}
              >
                {!hide && item.title}
              </Button>
            </Link>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

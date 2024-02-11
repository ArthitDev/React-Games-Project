import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Img,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import "./Nav.css";

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLinkClick = () => {
    FaWindows.NavLink("/");
  };

  const handleColorModeChange = () => {
    toggleColorMode(); // เปลี่ยนสี
    // window.location.reload(); // รีเฟรชหน้าเว็บ
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Define a state variable to store the isLoggedIn status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Box
      bg={useColorModeValue("gray.300", "gray.900")}
      px={4}
      position="sticky"
      top={0}
      zIndex={999}
    >
      <Flex h={20} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Image
            borderRadius="full"
            boxSize="70px"
            src="/favicon.webp"
            alt="G-icon"
          />
          <Link
            as={NavLink}
            to="/"
            fontWeight="bold"
            fontSize="xl"
            onClick={handleLinkClick}
          >
            It' Good Games
          </Link>
        </Flex>

        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              variant="ghost"
              display={{ base: "flex", md: "none" }}
              onClick={handleDrawerToggle}
            />
            {/* <Link
              as={NavLink}
              to="/tabledata"
              fontWeight="bold"
              mt={2}
              display={{ base: "none", md: "block" }}
            >
              รายชื่อเกมทั้งหมด
            </Link> */}
            <Link
              as={NavLink}
              to="/contact"
              fontWeight="bold"
              mt={2}
              display={{ base: "none", md: "block" }}
            >
              ติดต่อเรา
            </Link>
            {/* <Link
              as={NavLink}
              to="/addgames"
              fontWeight="bold"
              mt={2}
              display={{ base: "none", md: "block" }}
            >
              ลองเพิ่มเกม
            </Link> */}
            {/* <Link
              as={NavLink}
              to="/comment"
              fontWeight="bold"
              mt={2}
              display={{ base: "none", md: "block" }}
            >
              ลองเพิ่มคอมเม้น
            </Link> */}
            {isLoggedIn ? (
              <Link
                as={NavLink}
                to="/dashboard"
                fontWeight="bold"
                mt={2}
                display={{ base: "none", md: "block" }}
              >
                แดชบอร์ด
              </Link>
            ) : (
              <Link
                as={NavLink}
                to="/login"
                fontWeight="bold"
                mt={2}
                display={{ base: "none", md: "block" }}
              >
                เข้าสู่ระบบ
              </Link>
            )}
            <Button
              onClick={handleColorModeChange}
              display={{ base: "none", md: "block" }}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>

      <Drawer
        placement="right"
        onClose={handleDrawerToggle}
        isOpen={isDrawerOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>เมนู</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              {/* <Link as={NavLink} to="tabledata" fontWeight="bold">
                รายชื่อสถานที่ท่องเที่ยว
              </Link> */}
              <Link
                as={NavLink}
                to="/contact"
                fontWeight="bold"
                onClick={handleClick}
              >
                ติดต่อเรา
              </Link>
              {isLoggedIn ? (
                <Link as={NavLink} to="/dashboard" fontWeight="bold">
                  แดชบอร์ด
                </Link>
              ) : (
                <Link
                  as={NavLink}
                  to="/login"
                  fontWeight="bold"
                  onClick={handleClick}
                >
                  เข้าสู่ระบบ
                </Link>
              )}
              {/* <Link as={NavLink} to="/login-Test" fontWeight="bold">
                เข้าสู่ระบบ
              </Link> */}
              <Button onClick={handleColorModeChange}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Nav;

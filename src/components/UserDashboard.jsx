import { useState, React, useEffect } from "react";
import { Box, Heading, Flex, Center, Button } from "@chakra-ui/react";
import { useNavigate, Navigate } from "react-router-dom";
import LogoutConfirmationModal from "./LogoutConfirmationModal";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isStatus = localStorage.getItem("isStatus");

    if (!isLoggedIn) {
      navigate("/login");
      return <Navigate to="/login" />;
    }

    if (isStatus === "admin") {
      navigate("/dashboard");
    } else if (isStatus === "user") {
      navigate("/user-dashboard");
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      setLoggedInUser(user);
    } else {
      navigate("/");
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "false";
    }
  };

  // Usage in the component, possibly in useEffect or wherever needed
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    navigate("/login");
    location.reload();
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };
  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };
  const cancelLogout = () => {
    closeLogoutModal();
  };
  const confirmLogout = () => {
    closeLogoutModal();
    localStorage.removeItem("loggedInUser");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "false";
    handleLogout(); // Call your existing handleLogout function
  };

  const confirmLogoutAndDelete = () => {
    // Get the logged-in user's data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // Get the list of registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers"));

    // Find the index of the logged-in user in the registeredUsers array
    const userIndexToDelete = registeredUsers.findIndex(
      (user) => user.email === loggedInUser.email
    );

    // Remove the user from the registeredUsers array
    if (userIndexToDelete !== -1) {
      registeredUsers.splice(userIndexToDelete, 1);
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    }

    // Proceed with the regular logout logic
    confirmLogout();
  };
  return (
    <Center h="83.5vh">
      <Box p={4}>
        <Flex direction="column" align="center">
          <Heading size="lg" mb={6} textAlign="center">
            ยินดีต้อนรับ หน้าจัดการของผู้ใช้ !
          </Heading>
          <Box fontSize="24px" fontWeight="bold">
            <p>สวัสดี ! , คุณ {loggedInUser.name}</p>
            {/* <p>อีเมล: {loggedInUser.email}</p> */}
          </Box>
          <Button
            mt="5"
            colorScheme="red"
            onClick={openLogoutModal}
            style={{ width: "150px" }}
          >
            ออกจากระบบ
          </Button>
        </Flex>
      </Box>
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={confirmLogout}
        onConfirmDelete={confirmLogoutAndDelete}
      />
    </Center>
  );
};

export default UserDashboard;

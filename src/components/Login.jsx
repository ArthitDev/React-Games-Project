import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Text,
  Input,
  Button,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import "./login.css";
import RegistrationModal from "./RegistrationModal";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert_2, setShowAlert_2] = useState(false);
  const [showAlertNull, setShowAlertNull] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const registeredUsers =
    JSON.parse(localStorage.getItem("registeredUsers")) || [];

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNewEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleRegistration = () => {
    if (!newEmail || !newPassword) {
      // Handle case where email or password is empty
      setShowAlert_2(false);
      setShowAlertNull(true);
      setTimeout(() => {
        setShowAlertNull(false);
      }, 3000);
      return;
    }

    if (newEmail === "root" && newPassword === "toor") {
      // Handle case where user tries to register with reserved credentials
      setShowAlert(false);
      setShowAlert_2(true);
      setNewName("");
      setNewEmail("");
      setNewPassword("");
      setTimeout(() => {
        setShowAlert_2(false);
      }, 3000);
      return;
    }

    const newUser = { name: newName, email: newEmail, password: newPassword };
    const storedUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const isEmailTaken = storedUsers.some((user) => user.email === newEmail);

    if (isEmailTaken) {
      setShowAlert(false);
      setShowAlert_2(true);
      setTimeout(() => {
        setShowAlert_2(false);
      }, 3000);
      return;
    }

    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    setRegistrationSuccess(true);
    setNewEmail("");
    setNewPassword("");

    setTimeout(() => {
      setShowModal(false);
      location.reload();
    }, 1000);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const isStatus = localStorage.getItem("isStatus");
    if (isLoggedIn === "true" && isStatus === "admin") {
      navigate("/dashboard");
    } else if (isLoggedIn === "true" && isStatus === "user") {
      navigate("/user-dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  const handleLogin = () => {
    const storedUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Find a user whose email and password match the input
    const loggedInUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (
      (loggedInUser && loggedInUser.email !== "root") ||
      (email === "root" && password === "toor")
    ) {
      // Handle successful login
      setShowAlert(false);
      setShowSuccessAlert(true);

      let isStatus = "user"; // Default to user status

      // Check for admin user
      if (email === "root" && password === "toor") {
        isStatus = "admin";
      }

      localStorage.setItem("isStatus", isStatus);

      if (loggedInUser) {
        // Save user data to localStorage
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ name: loggedInUser.name, email, password })
        );
      }

      // Set a flag in localStorage to indicate that the user is logged in
      localStorage.setItem("isLoggedIn", "true");

      setTimeout(() => {
        navigate("/dashboard");
        location.reload();
      }, 1000);
    } else {
      // Handle login failure
      setShowAlert(true);
      setShowSuccessAlert(false);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  return (
    <Center h="83.5vh">
      <Grid
        templateColumns="1fr"
        gap="1rem"
        padding="1rem"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="lg"
        width="350px"
        marginBottom="80px"
      >
        <Text fontSize="xl" textAlign="center">
          เข้าสู่ระบบ
        </Text>
        <Input
          variant="filled"
          placeholder="อีเมล"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          variant="filled"
          placeholder="รหัสผ่าน"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {showAlert && (
          <Alert status="error" mb="0" height="50px" borderRadius="8px">
            <AlertIcon />
            <AlertTitle mr={2}>
              ล็อกอินล้มเหลว อีเมลหรือรหัสผ่านไม่ถูกต้อง
            </AlertTitle>
          </Alert>
        )}
        {showSuccessAlert && (
          <Alert status="success" mb="0" height="50px" borderRadius="8px">
            <AlertIcon />
            <AlertTitle mr={2}>
              ล็อกอินสำเร็จ! ยินดีต้อนรับเข้าสู่ระบบ
            </AlertTitle>
          </Alert>
        )}
        <Button colorScheme="green" onClick={handleLogin}>
          เข้าสู่ระบบ
        </Button>
        {/* Registration section */}
        <Text fontSize="md" textAlign="center">
          หากยังไม่มีบัญชีผู้ใช้{" "}
          <span
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => setShowModal(true)}
          >
            สมัครสมาชิก
          </span>
        </Text>
        <RegistrationModal // ใช้ RegistrationModal component
          showModal={showModal}
          setShowModal={setShowModal}
          newName={newName}
          handleNewNameChange={handleNewNameChange}
          newEmail={newEmail}
          handleNewEmailChange={handleNewEmailChange}
          newPassword={newPassword}
          handleNewPasswordChange={handleNewPasswordChange}
          handleRegistration={handleRegistration}
          registrationSuccess={registrationSuccess}
          showAlert_2={showAlert_2}
          showAlertNull={showAlertNull}
        />
      </Grid>
    </Center>
  );
};

export default Login;

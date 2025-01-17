import React, { useState } from "react";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
      window.location.href = "/dashboard";
    }, 2000);
  };

  return (
    <Box
      bg="linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5))"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
        borderColor="white"
        textAlign="center"
        bg="white"
      >
        <h1 style={{ color: "black", marginBottom: "1rem" }}>
          Welcome Admin !!!
        </h1>
        <form>
          <FormControl>
            <FormLabel style={{ color: "black" }}>Admin Email</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value="admin@gmail.com"
              borderColor="black"
              disabled
              boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel style={{ color: "black" }}>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value="admin"
              borderColor="black"
              disabled
              boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
            />
          </FormControl>
          <Button
            colorScheme="blackAlpha"
            mt={6}
            w="100%"
            onClick={handleLogin}
          >
            Login
          </Button>
          {/* AlertDialog */}
          <AlertDialog isOpen={isOpen} leastDestructiveRef={undefined}>
            <AlertDialogOverlay>
              <AlertDialogContent
                bg="black"
                color="white"
                boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
              >
                <AlertDialogHeader>Welcome Admin !!!</AlertDialogHeader>
                <AlertDialogBody>
                  Redirecting to the dashboard page...
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </form>
      </Container>
    </Box>
  );
};

export default LoginPage;

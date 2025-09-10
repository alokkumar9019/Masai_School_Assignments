import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FeedbackForm from "./components/FeedbackForm";
import Dashboard from "./components/Dashboard";
import { Box, Button, Flex } from "@chakra-ui/react";

function App() {
  return (
    <Router>
      <Box p={5}>
        <Flex gap={4}>
          <Button as={Link} to="/" colorScheme="teal">Feedback Form</Button>
          <Button as={Link} to="/dashboard" colorScheme="teal">Dashboard</Button>
        </Flex>
      </Box>
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

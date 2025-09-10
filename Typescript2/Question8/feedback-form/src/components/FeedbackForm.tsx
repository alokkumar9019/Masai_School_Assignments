import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFeedback } from "../features/feedback/feedbackSlice";
import { v4 as uuidv4 } from "uuid";
import {
  Box, Button, FormControl, FormLabel, Input, NumberInput, NumberInputField, Textarea, Heading
} from "@chakra-ui/react";

const FeedbackForm: React.FC = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !rating || !feedback) return;

    dispatch(addFeedback({
      id: uuidv4(),
      name,
      email,
      rating,
      feedback,
      date: new Date().toISOString(),
    }));

    setName("");
    setEmail("");
    setRating(0);
    setFeedback("");
  };

  return (
    <Box maxW="500px" mx="auto" mt={10} p={5} shadow="md" borderWidth="1px">
      <Heading mb={4}>Feedback Form</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={3}>
          <FormLabel>Name</FormLabel>
          <Input value={name} onChange={e => setName(e.target.value)} />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Rating</FormLabel>
          <NumberInput min={1} max={5} value={rating} onChange={(_, num) => setRating(num)}>
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Feedback</FormLabel>
          <Textarea value={feedback} onChange={e => setFeedback(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="teal">Submit</Button>
      </form>
    </Box>
  );
};

export default FeedbackForm;

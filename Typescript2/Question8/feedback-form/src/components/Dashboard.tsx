import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store.ts";
import { Box, Heading, Table, Thead, Tr, Th, Tbody, Td, Select } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";
import { useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Dashboard: React.FC = () => {
  const feedbackEntries = useSelector((state: RootState) => state.feedback.entries);
  const [filterRating, setFilterRating] = useState<number | "">("");

  const filteredEntries = filterRating
    ? feedbackEntries.filter(entry => entry.rating === filterRating)
    : feedbackEntries;

  const ratings = filteredEntries.reduce((acc, entry) => {
    acc[entry.rating] = (acc[entry.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const data = {
    labels: Object.keys(ratings),
    datasets: [{
      label: "Number of Ratings",
      data: Object.values(ratings),
      backgroundColor: "teal",
    }],
  };

  return (
    <Box maxW="800px" mx="auto" mt={10} p={5}>
      <Heading mb={5}>Feedback Dashboard</Heading>

      <Select placeholder="Filter by Rating" mb={5} onChange={e => setFilterRating(Number(e.target.value) || "")}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </Select>

      <Bar data={data} />

      <Table variant="simple" mt={10}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Rating</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredEntries.map(entry => (
            <Tr key={entry.id}>
              <Td>{entry.name}</Td>
              <Td>{entry.email}</Td>
              <Td>{entry.rating}</Td>
              <Td>{new Date(entry.date).toLocaleDateString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Dashboard;

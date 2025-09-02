import { SimpleGrid, Box, Heading, Text, Spinner } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

function CoffeeList() {
  const { loading, coffeeList, error } = useSelector((state) => state.coffee);

  if (loading) return <Spinner size="xl" thickness="4px" mx="auto" mt="20" />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} p={4} flex="1">
      {coffeeList.map((coffee) => (
        <Box key={coffee.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" textAlign="center">
          <Heading fontSize="xl">{coffee.title}</Heading>
          <Text mt={2}>Price: ${coffee.price}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default CoffeeList;

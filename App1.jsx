import { Flex, useColorModeValue } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import CoffeeList from './CoffeeList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCoffeeData } from './coffeeActions';

function App1() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoffeeData());
  }, [dispatch]);

  return (
    <Flex
      h="100vh"
      direction={{ base: 'column', md: 'row' }}
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      <Sidebar />
      <CoffeeList />
    </Flex>
  );
}

export default App1;

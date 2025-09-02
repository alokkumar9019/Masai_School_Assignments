import { VStack, Select } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { fetchCoffeeData } from './coffeeActions';

function Sidebar() {
  const dispatch = useDispatch();

  const handleSortChange = (e) => {
    dispatch(fetchCoffeeData(e.target.value));
  };

  return (
    <VStack spacing={4} p={4} minW="220px" borderRight="1px solid gray">
      <Select placeholder="Sort by" onChange={handleSortChange}>
        <option value="title">Name</option>
        <option value="price">Price</option>
      </Select>
    </VStack>
  );
}

export default Sidebar;

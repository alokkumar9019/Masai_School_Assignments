import {
  Box,
  Flex,
  Text,
  Avatar,
  Heading,
  Stack,
  VStack,
  HStack,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';

const testimonials = [
  {
    title: "Efficient Collaborating",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.",
    name: "Jane Cooper",
    role: "CEO at ABC Corporation",
    img: "/avatar1.jpg", 
  },
  {
    title: "Intuitive Design",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.",
    name: "Jane Cooper",
    role: "CEO at ABC Corporation",
    img: "/avatar1.jpg",
  },
  {
    title: "Mindblowing Service",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.",
    name: "Jane Cooper",
    role: "CEO at ABC Corporation",
    img: "/avatar1.jpg",
  },
];

function TestimonialCard({ title, text, name, role, img }) {
  return (
    <VStack spacing={3} flex="1">
      <Box
        bg={useColorModeValue('white', 'gray.700')}
        rounded="lg"
        shadow="lg"
        px={7}
        py={6}
        position="relative"
        textAlign="center"
        w="100%"
      >
        <Heading
          as="h3"
          fontSize="lg"
          fontWeight="bold"
          mb={2}
        >
          {title}
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={4}>
          {text}
        </Text>
        <Box
          position="absolute"
          left="50%"
          bottom="-12px"
          transform="translateX(-50%)"
          width="0"
          height="0"
          borderLeft="12px solid transparent"
          borderRight="12px solid transparent"
          borderTop={`12px solid ${useColorModeValue('white', '#2D3748')}`}
        />
      </Box>
      <Avatar size="md" name={name} src={img} mt={2} />
      <Text fontWeight="bold" fontSize="md">
        {name}
      </Text>
      <Text fontSize="sm" color="gray.500" mb={2}>
        {role}
      </Text>
    </VStack>
  );
}

function TestimonialsSection() {
  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      py={{ base: 8, md: 16 }}
      px={{ base: 2, md: 8 }}
      minH="100vh"
    >
      <Flex
        py={4}
        px={6}
        bg={useColorModeValue('white', 'gray.800')}
        shadow="sm"
        mb={8}
        rounded="md"
        align="center"
        justify="space-between"
        direction={{ base: "column", md: "row" }}
      >
        <Heading size="md" letterSpacing="tight">BrandLogo</Heading>
        <HStack mt={{ base: 3, md: 0 }} spacing={6}>
          <Text as="a" href="#">Home</Text>
          <Text as="a" href="#">Services</Text>
          <Text as="a" href="#">Clients</Text>
          <Text as="a" href="#">Contact</Text>
        </HStack>
      </Flex>

      <Container maxW="6xl" centerContent>
        <Heading as="h2" size="xl" fontWeight="bold" mb={2} textAlign="center">
          Our Clients Speak
        </Heading>
        <Text color="gray.500" fontSize="md" mb={8} textAlign="center">
          We have been working with clients around the world
        </Text>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={8}
          align="stretch"
          justify="center"
          width="100%"
        >
          {testimonials.map((item, idx) => (
            <TestimonialCard key={idx} {...item} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default TestimonialsSection;

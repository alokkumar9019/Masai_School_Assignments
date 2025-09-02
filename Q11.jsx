import {
  Box,
  Avatar,
  Heading,
  Text,
  Button,
  Tag,
  Stack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const rawData = {
  name: "Lindsey James",
  username: "@lindsey_jam3s",
  description:
    "Actress, musician, songwriter and artist. PM for work inquires or #tag me in your posts",
  tags: ["#ART", "#PHOTOGRAPHY", "#MUSIC"],
};

function ProfileCard() {
  return (
    <Box
      maxW={{ base: "90vw", md: "350px" }}
      mx="auto"
      bg={useColorModeValue("white", "gray.800")}
      rounded="xl"
      boxShadow="lg"
      p={6}
      textAlign="center"
      fontFamily="heading"
      mt={8}
    >
      <Avatar
        src="/path/to/profile.jpg"
        alt="Lindsey James"
        size="xl"
        mx="auto"
        mb={4}
        borderWidth="4px"
        borderColor={useColorModeValue("blue.400", "blue.300")}
      />
      <Heading fontSize="2xl" fontWeight="bold" mb={1} color={useColorModeValue("gray.700", "white")}>
        Lindsey James
      </Heading>
      <Text fontSize="sm" color="gray.500" mb={2}>
        {rawData.username}
      </Text>
      <Text fontSize="md" color={useColorModeValue("gray.700", "white")} mb={3}>
        Actress, musician, songwriter and artist. PM for work inquires or {" "}
        <Text as="span" color="blue.400" fontWeight="bold">
          #tag
        </Text>{" "}
        me in your posts
      </Text>
      <Stack direction="row" justify="center" spacing={2} mb={5}>
        {rawData.tags.map((tag) => (
          <Tag key={tag} size="sm" colorScheme="blue">
            {tag}
          </Tag>
        ))}
      </Stack>
      <Stack direction={{ base: "column", sm: "row" }} spacing={4} justify="center">
        <Button variant="outline" colorScheme="gray">Message</Button>
        <Button colorScheme="blue">Follow</Button>
      </Stack>
    </Box>
  );
}

function RawDataDisplay() {
  return (
    <Box
      maxW={{ base: "90vw", md: "350px" }}
      mx="auto"
      mt={8}
      p={4}
      bg={useColorModeValue("gray.50", "gray.700")}
      borderRadius="md"
      fontFamily="monospace"
      whiteSpace="pre-wrap"
      wordBreak="break-word"
      overflowX="auto"
    >
      {JSON.stringify(rawData, null, 2)}
    </Box>
  );
}

export default function CombinedProfile() {
  return (
    <Flex
      minH="100vh"
      direction={{ base: "column", md: "row" }}
      justify="center"
      align="center"
      gap={8}
      p={4}
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <ProfileCard />
      {/* <RawDataDisplay /> */}
    </Flex>
  );
}

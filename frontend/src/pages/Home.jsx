import React, { useEffect } from 'react'
import { Button, Container, Heading, useColorModeValue, VStack, Box, Text, SimpleGrid } from '@chakra-ui/react'
import {Link }from 'react-router-dom'
import { useBookStore } from '../stores/book'
import BookCard from '../components/BookCard'
const Home = () => {
  const {fetchBooks, books} = useBookStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text fontSize={"30"} fontWeight={"bold"} textAlign={"center"}>
          Your Library
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing={10}
          w={"full"}
        > 
          {books.map((book) => (
            <BookCard key={book._id} book={book}> Hi</BookCard>
            
          ))}
        </SimpleGrid>

       {books.length == 0 && (<Text fontSize="xl" fontWeight={"bold"} textAlign={"center"} alignContent={"center"}>
          Your Library is Empty
          <Link to={"/add"}>
          <Button m={4}>Add a Book</Button>
          </Link>
        </Text>)} 

      </VStack>

    </Container>
  )
}

export default Home
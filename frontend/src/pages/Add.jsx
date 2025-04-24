import { Button, Container, Heading, useColorModeValue, VStack, Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useBookStore } from '../stores/book'

const Add = () => {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    cover: "",
  })

  const {createBook} = useBookStore()
  const handleAddBook = async () => {
    const {message} = await createBook(newBook)
    console.log(message)
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Add Book to Library
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <input
              placeholder='Book Title'
              name='title'
              value={newBook.title}
              onChange={(e) => setNewBook({...newBook, title: e.target.value})}
            ></input>
            <input
              placeholder='Author'
              name='author'
              value={newBook.author}
              onChange={(e) => setNewBook({...newBook, author: e.target.value})}
            ></input>
            <input
              placeholder='Cover Art URL'
              name='cover'
              value={newBook.cover}
              onChange={(e) => setNewBook({...newBook, cover: e.target.value})}
            ></input>

            <Button colorScheme='blue' onClick={handleAddBook} w="full">Add Book</Button>
          </VStack>

        </Box>
      </VStack>
    </Container>
  )
}

export default Add
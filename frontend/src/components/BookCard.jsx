import { Box, Heading, HStack, Button, Image, Text, useColorModeValue, Modal, useDisclosure, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, ModalBody, VStack, ModalFooter } from '@chakra-ui/react'
import React from 'react'
import { useBookStore } from '../stores/book'
import { useState } from 'react'


const BookCard = ({book}) => {
    const [updatedBook, setUpdatedBook] = useState(book)
    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")

    const {deleteBook} = useBookStore()
    const handleDelete = async(bid) => {
        const {message} = await deleteBook(bid)
    }
    const { isOpen, onOpen, onClose} = useDisclosure()

    const {updateBook} = useBookStore()
    const handleEdit = async(bid, updatedBook) => {
        await updateBook(bid, updatedBook)
        onClose();
    }
  return (
    <Box
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3s'
        _hover={{transform: "translateY(-5px)", shadow: "xl"}}
        bg={bg}
    >
        <Image src={book.cover} alt={book.title} h={48} w='full' objectFit='cover' />
        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {book.title}
            </Heading>
            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                {book.author}
            </Text>
            <HStack spacing={2}>
                <Button colorScheme='blue' onClick={onOpen}>$</Button>
                <Button colorScheme='red' onClick={() => handleDelete(book._id)}>-</Button>

            </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
                <ModalContent>
                <ModalHeader>Update Book</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <VStack spacing={4}><input
              placeholder='Book Title'
              name='title'
              value={updatedBook.title}
              onChange={(e) => setUpdatedBook({...updatedBook, title: e.target.value})}
              ></input>
            <input
              placeholder='Author'
              name='author'
              value={updatedBook.author}
              onChange={(e) => setUpdatedBook({...updatedBook, author: e.target.value})}
              ></input>
            <input
              placeholder='Cover Art URL'
              name='cover'
              value={updatedBook.cover}
              onChange={(e) => setUpdatedBook({...updatedBook, cover: e.target.value})}
              ></input>
              </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => handleEdit(book._id, updatedBook)}>Update</Button>
                    <Button variant='ghost' onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    </Box>
  )
}

export default BookCard
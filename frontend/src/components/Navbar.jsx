import { Button, Container, Flex, HStack, useColorMode, useColorModeValue, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import {IoMoon} from "react-icons/io5";
import {LuSun} from "react-icons/lu";

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();

  return (
    <Container px={4}>
        <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
            base:"column",
            sm:"row"
        }}>
            <Text
                fontSize={{base: "22", sm: "28"}}
                fontWeight={"bold"}
                textAlign={"center"}
                color={useColorModeValue("black", "white")}

            >
                <Link to="/">Wondrous</Link>
            </Text>

            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/add"} >
                <Button>
                    +
                </Button>
                </Link>

                <Button onClick={toggleColorMode}>
                    {colorMode === 'light'? <IoMoon></IoMoon> : <LuSun></LuSun>}
                </Button>

            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar
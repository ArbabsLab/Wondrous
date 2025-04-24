
import { Box, useColorModeValue } from '@chakra-ui/react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Add from './pages/Add'
import Home from './pages/Home'
import Navbar from './components/Navbar'
function App() {

  return (
    <>
    
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </Box>
    </>
  )
}

export default App

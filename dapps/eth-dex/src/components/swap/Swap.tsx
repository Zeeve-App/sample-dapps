import { Heading, Container, SimpleGrid, Flex, VStack } from '@chakra-ui/react';
import { SwapForm } from './SwapForm';

export const Swap = () => {
  return (
    <Flex
      alignItems={'center'}
      h={'100%'}
      bgGradient={['linear(to-b, orange.100, purple.300)']}
    >
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={1}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
        centerContent
      >
        <Flex
          boxShadow={'lg'}
          bg={'gray.50'}
          rounded={'xl'}
          p={2}
          pt={4}
          maxWidth={'480px'}
          w={'100%'}
        >
          <VStack align={'left'} spacing={2} w={'100%'}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={'md'}
              style={{ fontWeight: 600 }}
              p={2}
            >
              Swap
            </Heading>

            <SwapForm />
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

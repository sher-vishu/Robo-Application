import { Button, Flex, Link, Text } from '@chakra-ui/react';

export default function SidebarDocs() {
  const bgColor = 'linear-gradient(135deg, #ECF8ED 0%, #ECF8ED 100%)';

  return (
    <Flex
      justify="center"
      direction="column"
      align="center"
      bg={bgColor}
      borderRadius="30px"
      me="20px"
      position="relative"
    >
      <Flex
        direction="column"
        mb="12px"
        align="center"
        justify="center"
        px="15px"
        pt="55px"
      >
        <Text
          fontSize={{ base: 'lg', xl: '18px' }}
          color="black"
          fontWeight="bold"
          lineHeight="150%"
          textAlign="center"
          px="10px"
          mb="14px"
        >
          Kisui Tech
        </Text>
        <Text
          fontSize="14px"
          color={'black'}
          px="10px"
          mb="14px"
          textAlign="center"
        >
          Utilizing technology to empower farmers.
       
        </Text>
      </Flex>
      <Link href="https://kisuitech.com/">
        <Button
          bg="blackAlpha.900"
          _hover={{ bg: 'whitAlpha.200' }}
          _active={{ bg: 'whiteAlpha.100' }}
          mb={{ sm: '16px', xl: '24px' }}
          color={'white'}
          fontWeight="regular"
          fontSize="sm"
          minW="185px"
          mx="auto"
        >
            Kisui Tech
        </Button>
      </Link>
    </Flex>
  );
}
import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { ColorModeButton } from '@/components/ui/color-mode';

const Navbar = () => {
    return (
        <Box
            as="nav"
            px="4"
            py="2"
            bg={{ base: 'white', _dark: 'teal.900' }}
            color="secondary"
            borderBottomWidth="2px"
            borderBottomColor="accent"
        >
            <Flex justifyContent="space-between" alignItems="center">
                {/* Logo */}
                <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color={{ base: 'teal.900', _dark: 'teal.50' }}
                >
                    My Dashboard
                </Text>
                <ColorModeButton className="bg-gray-200 dark:bg-black text-teal-800 dark:text-teal-800" />
            </Flex>
        </Box>
    );
};

export default Navbar;

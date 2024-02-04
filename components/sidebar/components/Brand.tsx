// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HSeparator } from '@/components/separator/Separator';

export function SidebarBrand() {

	let logoColor = useColorModeValue('navy.700', 'white');
	return (
		<Flex alignItems='center' flexDirection='column'>
			 <img alt="" src="/logo.png" width="50%" className='mr-10 mb-7' color={logoColor}/>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
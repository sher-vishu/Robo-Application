import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react';
import Calendar from '@/components/calendar/Calendar'; 

const DrawerComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className='flex justify-end'>
      <Button onClick={onOpen}
      colorScheme='blue'
      variant='solid'
      >Open Calendar</Button>
      <Drawer onClose={onClose} isOpen={isOpen} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create Task</DrawerHeader>
          <DrawerBody>
            <Calendar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerComponent
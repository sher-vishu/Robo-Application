import Link from 'next/link'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button, Stack, Text } from '@chakra-ui/react'

const navigation = [
 { name: 'Main Dashboard', href: '/', current: true},
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


export default function Nav() {

  return (
    <Disclosure as="nav" style={{ backgroundColor: '#1f2737' }} >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                 <Text as='b' color='white'>Adam App</Text>
                 </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item, index) => (
                       <Link key={item.name} href={item.href} legacyBehavior>
                        <a className={classNames
                        (item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium')}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                       </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex bg-gray-800 text-sm">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {/* {user && (
                       <>
                      <Text className='pt-1.5' color='white' paddingRight='3'>{ user?.email}</Text> 
                      <Icon as={MdArrowDropDown} w={8} h={8} color='white'/>
                      </>
                      )} */}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg focus:outline-none">
                      <Menu.Item>
                      {/* {user && (
                      <Link href="/api/auth/logout" legacyBehavior>
                         <a className='block px-4 py-2 text-sm text-gray-700'>
                         Sign Out
                         </a>
                         </Link>
                        )} */}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
             {/* Display when user is logged out */}
             {/* {!user && (
              <Stack direction="row" spacing={4}>
                { user ? (
                            <Button 
                            fontSize='md' 
                            textColor="white" 
                            variant='link'>
                                 <Link href='/api/auth/logout'>Logout</Link>
                                </Button>
                          ):
                         (<Button 
                          fontSize='sm' 
                          textColor="white" 
                          variant='link'>
                            <Link href='/api/auth/login'>Login</Link>
                                </Button>)
                    }
              </Stack>
            )} */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
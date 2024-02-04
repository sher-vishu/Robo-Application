import "@/styles/globals.css";
import "@/styles/App.css"
import type { AppProps } from "next/app";
import React from 'react'
import StoreProvider from './StoreProvider';
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
       <ChakraProvider theme={theme}>
           <Component {...pageProps} />
           </ChakraProvider>
  </StoreProvider>
  );
}

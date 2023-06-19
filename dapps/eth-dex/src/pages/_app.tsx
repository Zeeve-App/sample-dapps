import '../styles/styles.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from '../components/layout/Layout';
import { Web3Provider } from '../contexts/Web3Context';
import { CookiesProvider } from 'react-cookie';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Web3Provider>
        <ChakraProvider resetCSS theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </Web3Provider>
    </CookiesProvider>
  );
}

export default MyApp;

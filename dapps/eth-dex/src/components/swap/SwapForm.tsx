import { ArrowDownIcon } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import { Form, Formik, FormikProps } from 'formik';
import { FormEvent, useState } from 'react';
import { useWeb3Context } from '../../contexts/Web3Context';
import { CurrencyInputPanel } from './CurrencyInputPanel';
import { toWei } from '../../utils/web3.utils';

interface InitialValues {
  input: number;
  output: number;
}

const tokens = {
  ethDex: {
    ticker: 'ETHDEX',
    icon: './logos/ethdex-logo.png',
  },
  eth: {
    ticker: 'ETH',
    icon: './logos/eth-logo.png',
  },
};

const ETH_ETHDEX_RATE = 100;

export const SwapForm = () => {
  const {
    account,
    connectWallet,
    contracts: { ethDex, ethSwap },
  } = useWeb3Context();

  const [currencies, setCurrencies] = useState({
    input: tokens.eth,
    output: tokens.ethDex,
  });

  const swapFields = (props: FormikProps<InitialValues>) => {
    setCurrencies({ input: currencies.output, output: currencies.input });

    props.setFieldValue('input', props.values.output);
    props.setFieldValue('output', props.values.input);
  };

  const setFields = (
    props: FormikProps<InitialValues>,
    id: string,
    value: number,
    field: string
  ) => {
    id === tokens.eth.ticker
      ? props.setFieldValue(field, value * ETH_ETHDEX_RATE)
      : props.setFieldValue(field, value / ETH_ETHDEX_RATE);
  };

  const handleChange = (e: FormEvent, props: FormikProps<InitialValues>) => {
    const { name, id, value } = e.target as HTMLInputElement;
    name === 'input'
      ? setFields(props, id, Number(value), 'output')
      : setFields(props, id, Number(value), 'input');
  };

  const swapTokens = async (value: BN) => {
    if (currencies.input.ticker === tokens.eth.ticker) {
      await ethSwap?.methods.buyTokens().send({ from: account, value });
    } else {
      await ethDex?.methods
        .approve(ethSwap?.options.address, value)
        .send({ from: account });
      await ethSwap?.methods.sellTokens(value).send({ from: account });
    }
  };

  return (
    <Formik
      initialValues={{ input: '', output: '' }}
      onSubmit={(values, { setSubmitting }) => {
        swapTokens(toWei(values.input));
        setSubmitting(false);
      }}
    >
      {(props: FormikProps<InitialValues>) => (
        <Form onChange={(e) => handleChange(e, props)}>
          <CurrencyInputPanel currency={currencies.input} k={'input'} />
          <Flex width={'100%'} justifyContent={'center'} alignItems={'center'}>
            <Button
              position={'absolute'}
              size={'md'}
              color={'grey.400'}
              p={0}
              m={0}
              zIndex={1000}
              border={'2px'}
              borderColor={'#f7fafc'}
              borderRadius={12}
              h={'32px'}
              w={'32px'}
              onClick={() => swapFields(props)}
            >
              <ArrowDownIcon />
            </Button>
          </Flex>
          <CurrencyInputPanel currency={currencies.output} k={'output'} />
          {account ? (
            <Button
              mt={2}
              colorScheme="purple"
              isLoading={props.isSubmitting}
              type="submit"
              width={'100%'}
            >
              Swap
            </Button>
          ) : (
            <Button
              mt={2}
              bg="purple.200"
              color={'white'}
              _hover={{ bg: 'purple.100' }}
              isLoading={props.isSubmitting}
              width={'100%'}
              onClick={connectWallet}
            >
              Connect Wallet
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

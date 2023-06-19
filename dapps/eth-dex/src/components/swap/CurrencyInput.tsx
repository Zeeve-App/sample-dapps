import { ArrowDownIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  Flex,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { FieldInputProps, FormikProps } from 'formik';
import { Currency } from './CurrencyInputPanel';

interface SwapInputProps {
  form: FormikProps<any>;
  field: FieldInputProps<any>;
  currency: Currency;
}

export const CurrencyInput = ({ form, field, currency }: SwapInputProps) => {
  return (
    <>
      <InputGroup size={'lg'}>
        <Input
          _focus={{ boxShadow: 'none' }}
          id={currency.ticker}
          {...field}
          placeholder="0.0"
          size={'lg'}
          fontSize={'2xl'}
          border={'none'}
          px={0}
          type={'number'}
        />
        <InputRightElement width={'8rem'}>
          <Button bg={'gray.200'} w={'100%'} borderRadius={14}>
            <Flex align={'center'} justify={'space-around'} width={'100%'}>
              <Avatar size={'xs'} src={currency.icon} />
              <Text noOfLines={0}>{currency.ticker}</Text>
            </Flex>
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{form?.errors?.from?.toString()}</FormErrorMessage>
    </>
  );
};

import { Flex, FormControl } from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import { useWeb3Context } from '../../contexts/Web3Context';
import { fromWei } from '../../utils/web3.utils';
import { CurrencyInput } from './CurrencyInput';

export interface Currency {
  ticker: string;
  icon: string;
}

export interface CurrencyInputPanelProps {
  currency: Currency;
  k: string;
}

export const CurrencyInputPanel = ({
  currency,
  k,
}: CurrencyInputPanelProps) => {
  const { currencies } = useWeb3Context();
  const balance = currencies && currencies[currency.ticker];

  return (
    <Field key={k} name={k} type={'text'}>
      {({ field, form }: FieldProps) => (
        <FormControl
          mb={0.5}
          isRequired
          isInvalid={
            Boolean(form?.errors?.from) && Boolean(form?.touched?.from)
          }
        >
          <Flex
            direction={'column'}
            py={3}
            px={4}
            bg={'gray.100'}
            border={'1px'}
            borderRadius={'0.425rem'}
            borderColor={'transparent'}
            _hover={{ borderColor: 'gray.300' }}
          >
            <CurrencyInput currency={currency} form={form} field={field} />
            {balance && (
              <Flex key={balance} justify={'right'} align={'right'} w={'100%'}>
                Balance: {fromWei(balance)}
              </Flex>
            )}
          </Flex>
        </FormControl>
      )}
    </Field>
  );
};

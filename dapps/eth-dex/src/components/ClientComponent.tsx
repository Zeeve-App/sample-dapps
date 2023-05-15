import { useEffect, useState } from 'react';

interface Props {
  component: React.ReactNode;
}

const ClientComponent: React.FC<Props> = ({ component }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{component}</>;
};
export default ClientComponent;

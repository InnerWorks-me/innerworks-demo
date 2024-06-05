import { ReactNode } from 'react';
import BackButton from '@/components/BackButton';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <BackButton />
      <main>{children}</main>
    </>
  );
};

export default Layout;

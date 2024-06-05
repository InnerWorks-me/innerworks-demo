import HomeButton from '@/components/HomeButton';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <HomeButton />
      <main>{children}</main>
    </>
  );
};

export default Layout;
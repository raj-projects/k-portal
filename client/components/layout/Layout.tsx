import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingAIButton from '../features/FloatingAIButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingAIButton />
    </div>
  );
};

export default Layout;

import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, hideFooter = false }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};

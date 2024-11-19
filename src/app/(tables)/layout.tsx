import { ReactNode } from 'react';
import Header from './(components)/Header';

export default function TablesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="container mx-auto">{children}</main>
    </>
  );
}

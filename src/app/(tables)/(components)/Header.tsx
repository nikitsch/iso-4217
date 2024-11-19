import Link from 'next/link';
import NavButton from './NavButton';

function Header() {
  return (
    <header className="container mx-auto py-4">
      <nav className="flex justify-end gap-4">
        <Link href="/countries">
          <NavButton>Countries</NavButton>
        </Link>
        <Link href="/currencies">
          <NavButton>Currencies</NavButton>
        </Link>
      </nav>
    </header>
  );
}

export default Header;

import { getISOCountries } from '@/lib/mongo/isoCountries';
import './styles.css';

async function fetchISOCountries() {
  const { isoCountries } = await getISOCountries();
  if (!isoCountries) throw new Error('Failed to fetch isoCountries P');

  return isoCountries;
}

export default async function Home() {
  const isoCountries = await fetchISOCountries();
  console.log({ isoCountries });

  return <div className="container mx-auto p-4">Hello</div>;
}

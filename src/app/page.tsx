import { Country } from '@/interfaces';
import './styles.css';

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/isoCountries', {
    // cache: 'no-store', // Опционально: отключает кэширование
  });

  // if (!res.ok) {
  //   console.error('Failed to fetch data');
  //   return <div>Error loading data</div>;
  // }

  const isoCountries = await res.json();
  console.log({ isoCountries });

  if (!isoCountries) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ISO Countries</h1>
      <div className="list">
        {isoCountries.map((item: Country) => (
          <div key={item._id} className="flex justify-between p-2">
            <span>
              {item.country} - {item.alphabeticCode}
            </span>
            <input type="checkbox" />
          </div>
        ))}
      </div>
    </div>
  );
}

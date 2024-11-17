// import { useCountriesData } from '@/hooks/useCountriesData';
import { useState } from 'react';
import './styles.css';

export default function Home() {
  const data = { isoCountries: [] };
  // const data = useCountriesData();
  const [view, setView] = useState<'country' | 'currency'>('country');

  if (!data) return <p>Loading...</p>;

  const toggleActive = (
    type: 'country' | 'currency',
    value: string | number,
  ) => {
    // Обновление данных через API (POST/PUT запрос)
    console.log(`Toggle ${type}: ${value}`);
  };

  const renderList = () => {
    if (view === 'country') {
      return data.isoCountries.map((item: any) => (
        <div
          key={item.id}
          className={`flex justify-between p-2 ${
            data.inactiveCountries.includes(item.country) ? 'opacity-50' : ''
          }`}
        >
          <span>
            {item.country} - {item.currency}
          </span>
          <input
            type="checkbox"
            checked={!data.inactiveCountries.includes(item.country)}
            onChange={() => toggleActive('country', item.country)}
          />
        </div>
      ));
    } else {
      // Генерация валюты и стран
      const currencyMap: Record<string, string[]> = {};
      data.isoCountries.forEach((item: any) => {
        currencyMap[item.currency] = currencyMap[item.currency] || [];
        currencyMap[item.currency].push(item.country);
      });

      return Object.entries(currencyMap).map(([currency, countries]) => (
        <div
          key={currency}
          className={`flex justify-between p-2 ${
            data.inactiveCurrencies.includes(currency) ? 'opacity-50' : ''
          }`}
        >
          <span>
            {currency} - {countries.join(', ')}
          </span>
          <input
            type="checkbox"
            checked={!data.inactiveCurrencies.includes(currency)}
            onChange={() => toggleActive('currency', currency)}
          />
        </div>
      ));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ISO Countries</h1>
      <button
        onClick={() => setView(view === 'country' ? 'currency' : 'country')}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Toggle View
      </button>
      <div className="list">{renderList()}</div>
    </div>
  );
}

import { Table } from '@/interfaces';
import clientPromise from '@/lib/mongo';

export async function GET(request: { url: string | URL }) {
  try {
    const client = await clientPromise;
    const db = client.db('iso-4217');

    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table') as Table;

    if (!table) {
      return new Response(JSON.stringify({ error: 'Table is required' }), {
        status: 400,
      });
    }

    if (table === 'COUNTRIES') {
      const isoCountries = await db
        .collection('isoCountries')
        .find({})
        .toArray();
      const inactiveCountries = await db
        .collection('inactiveCountries')
        .find({})
        .toArray();

      return new Response(JSON.stringify({ isoCountries, inactiveCountries }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (table === 'CURRENCY') {
      const isoCountries = await db
        .collection('isoCountries')
        .find({})
        .toArray();
      const currency = await db.collection('currency').find({}).toArray();
      const inactiveCurrencies = await db
        .collection('inactiveCurrencies')
        .find({})
        .toArray();

      return new Response(
        JSON.stringify({ isoCountries, currency, inactiveCurrencies }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    return new Response(JSON.stringify({ error: 'Unknown table' }), {
      status: 400,
    });
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
    });
  }
}

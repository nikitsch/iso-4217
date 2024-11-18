import { Action, Country, Table } from '@/interfaces';
import clientPromise from '@/lib/mongo';

export async function POST(request: {
  json: () =>
    | PromiseLike<{ table: Table; action: Action; element: Country }>
    | { table: Table; action: Action; element: Country };
}) {
  try {
    const client = await clientPromise;
    const db = client.db('iso-4217');

    const { table, action, element } = await request.json();

    if (!table || !action || !element) {
      return new Response(
        JSON.stringify({ error: 'Table, action, and element are required' }),
        { status: 400 },
      );
    }

    if (table === 'COUNTRIES') {
      const collection = db.collection('inactiveCountries');

      if (action === 'ADD') {
        await collection.insertOne(element.country);
      } else if (action === 'REMOVE') {
        await collection.deleteOne(element.country);
      } else {
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
        });
      }
    } else if (table === 'CURRENCY') {
      const collection = db.collection('inactiveCurrencies');

      if (action === 'ADD') {
        await collection.insertOne(element.numericCode);
      } else if (action === 'REMOVE') {
        await collection.deleteOne(element.numericCode);
      } else {
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
        });
      }
    } else {
      return new Response(JSON.stringify({ error: 'Invalid action' }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Failed to update data:', error);
    return new Response(JSON.stringify({ error: 'Failed to update data' }), {
      status: 500,
    });
  }
}

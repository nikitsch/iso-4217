import {
  DBNaming,
  InactiveCountries,
  InactiveCurrencies,
  Table,
  TableEnum,
} from '@/interfaces';
import clientPromise from '@/lib/mongo';

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(DBNaming.DB);

    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table') as Table;

    if (!table) {
      return new Response(JSON.stringify({ error: 'Table is required' }), {
        status: 400,
      });
    }

    if (table === TableEnum.COUNTRIES) {
      const inactiveCountries = await db
        .collection<InactiveCountries>(DBNaming.COLL_INACT_COUNTRIES)
        .findOne({ _id: 'inactiveCountries' });

      return new Response(
        JSON.stringify({ inactiveCountries: inactiveCountries?.countries }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    if (table === TableEnum.CURRENCY) {
      const inactiveCurrencies = await db
        .collection<InactiveCurrencies>(DBNaming.COLL_INACT_CURRENCY)
        .findOne({ _id: 'inactiveCurrencies' });

      return new Response(
        JSON.stringify({ inactiveCurrencies: inactiveCurrencies?.currencies }),
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

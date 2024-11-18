import { BD_Naming, InactiveCountries, InactiveCurrencies } from '@/interfaces';
import clientPromise from '@/lib/mongo';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(BD_Naming.BD);
    const isoCountries = await db
      .collection(BD_Naming.COLL_ISO_COUNTRIES)
      .find({})
      .toArray();

    const currency = await db.collection(BD_Naming.COLL_CURRENCY).findOne({});

    const inactiveCountries = await db
      .collection<InactiveCountries>(BD_Naming.COLL_INACT_COUNTRIES)
      .findOne({ _id: 'inactiveCountries' });

    const inactiveCurrencies = await db
      .collection<InactiveCurrencies>(BD_Naming.COLL_INACT_CURRENCY)
      .findOne({ _id: 'inactiveCurrencies' });

    return new Response(
      JSON.stringify({
        isoCountries,
        currency,
        inactiveCountries: inactiveCountries?.countries || [],
        inactiveCurrencies: inactiveCurrencies?.currencies || [],
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
    });
  }
}

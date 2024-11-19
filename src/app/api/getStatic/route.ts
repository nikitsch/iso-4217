import { BD_Naming } from '@/interfaces';
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

    return new Response(JSON.stringify({ isoCountries, currency }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch data:', error);

    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
    });
  }
}

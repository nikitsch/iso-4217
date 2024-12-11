import { DBNaming } from '@/interfaces';
import clientPromise from '@/lib/mongo';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DBNaming.DB);
    const isoCountries = await db
      .collection(DBNaming.COLL_ISO_COUNTRIES)
      .find({})
      .toArray();
    return new Response(JSON.stringify({ isoCountries }), {
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

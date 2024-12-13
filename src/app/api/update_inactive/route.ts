import {
  ActionEnum,
  DBNaming,
  InactiveCountries,
  InactiveCurrencies,
  TableEnum,
} from '@/interfaces';
import clientPromise from '@/lib/mongo';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(DBNaming.DB);

    const { table, action, value } = await request.json();

    if (!table || !action || !value) {
      return new Response(
        JSON.stringify({ error: 'Table, action, and value are required' }),
        { status: 400 },
      );
    }

    let collectionName:
      | DBNaming.COLL_INACT_COUNTRIES
      | DBNaming.COLL_INACT_CURRENCY;
    let updateKey: 'countries' | 'currencies';

    switch (table) {
      case TableEnum.COUNTRIES:
        collectionName = DBNaming.COLL_INACT_COUNTRIES;
        updateKey = 'countries';
        break;
      case TableEnum.CURRENCY:
        collectionName = DBNaming.COLL_INACT_CURRENCY;
        updateKey = 'currencies';
        break;
      default:
        return new Response(JSON.stringify({ error: 'Invalid table' }), {
          status: 400,
        });
    }

    const collection = db.collection<InactiveCountries | InactiveCurrencies>(
      collectionName,
    );

    if (action === ActionEnum.ADD) {
      await collection.updateOne(
        { _id: collectionName },
        { $addToSet: { [updateKey]: value } },
      );
    } else if (action === ActionEnum.REMOVE) {
      await collection.updateOne(
        { _id: collectionName },
        { $pull: { [updateKey]: value } },
      );
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

import {
  Action,
  ActionEnum,
  DBNaming,
  Country,
  InactiveCountries,
  InactiveCurrencies,
  Table,
  TableEnum,
} from '@/interfaces';
import clientPromise from '@/lib/mongo';

type POSTRequestType = {
  table: Table;
  action: Action;
  element: Pick<Country, 'country'> | Pick<Country, 'numericCode'>;
};

export async function POST(request: {
  json: () => PromiseLike<POSTRequestType> | POSTRequestType;
}) {
  try {
    const client = await clientPromise;
    const db = client.db(DBNaming.DB);

    const { table, action, element } = await request.json();

    if (!table || !action || !element) {
      return new Response(
        JSON.stringify({ error: 'Table, action, and element are required' }),
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
        { $addToSet: { [updateKey]: element } },
      );
    } else if (action === ActionEnum.REMOVE) {
      await collection.updateOne(
        { _id: collectionName },
        { $pull: { [updateKey]: element } },
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

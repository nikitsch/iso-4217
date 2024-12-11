import {
  DBNaming,
  InactiveCountries,
  InactiveCurrencies,
  Table,
  TableEnum,
} from '@/interfaces';
import clientPromise from '@/lib/mongo';

const REQUERY_INTERVAL = 3000;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const table = searchParams.get('table') as Table;

  if (!table) {
    return new Response(JSON.stringify({ error: 'Table is required' }), {
      status: 400,
    });
  }

  let interval: NodeJS.Timeout;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const sendData = async () => {
        try {
          const client = await clientPromise;
          const db = client.db(DBNaming.DB);
          let data;

          if (table === TableEnum.COUNTRIES) {
            const inactiveCountries = await db
              .collection<InactiveCountries>(DBNaming.COLL_INACT_COUNTRIES)
              .findOne({ _id: 'inactiveCountries' });
            data = {
              inactive: inactiveCountries?.countries || [],
            };
          }

          if (table === TableEnum.CURRENCY) {
            const inactiveCurrencies = await db
              .collection<InactiveCurrencies>(DBNaming.COLL_INACT_CURRENCY)
              .findOne({ _id: 'inactiveCurrencies' });
            data = {
              inactive: inactiveCurrencies?.currencies || [],
            };
          }

          const chunk = `data: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(chunk));
        } catch (error) {
          console.error('SSE error:', error);
          controller.close();
        }
      };

      sendData();
      interval = setInterval(sendData, REQUERY_INTERVAL);
    },
    cancel() {
      clearInterval(interval);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

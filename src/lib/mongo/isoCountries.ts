// import clientPromise from '.';

// let client;
// let db;
// let isoCountries;

// async function init() {
//   if (db) return;

//   console.log('clientPromise:', clientPromise);
//   try {
//     client = await clientPromise;
//     db = await client.db();
//     isoCountries = await db.collection('isoCountries');
//   } catch (error) {
//     console.log({ error });

//     throw new Error('Failed to stablish connection to datadase');
//   }
// }

// (async () => {
//   await init();
// })();

// export async function getISOCountries() {
//   try {
//     if (!isoCountries) await init();

//     const result = await isoCountries
//       .find({})
//       // .limit(20)
//       // .map((el) => ({ ...el, _id: el._id.toString() }))
//       .toArray();

//     return { isoCountries: result };
//   } catch {
//     return { error: 'Failed to fetch isoCountries' };
//   }
// }

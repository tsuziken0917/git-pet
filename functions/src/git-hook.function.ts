import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

const expTable = [
  20,
  40,
  100,
  250,
  500,
  1000,
  1500,
  4000,
  10000
];

const EARN_EXPERIENCE = 10;

export const gitHook = functions.https.onRequest(async (request, response) => {
  const pets = await db.collection('pets')
    .where('ownerGitHubId', '==', request.body.sender.id)
    .get();

  const pet = pets.docs[0].data();

  let level = 1;
  expTable.some(nextExp => {
    if (pet.exp + EARN_EXPERIENCE >= nextExp) {
      level++;
      return false;
    } else {
      return true;
    }
  });

  const increement = admin.firestore.FieldValue.increment(EARN_EXPERIENCE);
  pets.docs.forEach(doc => doc.ref.update({
    exp: increement,
    level:level
  }));
  response.send('success');
});

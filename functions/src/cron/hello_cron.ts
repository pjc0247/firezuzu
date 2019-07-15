import * as functions from 'firebase-functions';

export const cron_hello = functions.pubsub.schedule('1 0 * * *').onRun(async (context) => {
    // In here, you can write some tasks which should be run in specific interval.
    // Please see
    // https://firebase.google.com/docs/functions/schedule-functions
    console.log("[Jobs done!]");
});
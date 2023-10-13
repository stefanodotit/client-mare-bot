import admin from 'firebase-admin'
import { getMessaging } from 'firebase/messaging/sw';

admin.initializeApp({
  credential: admin.credential.cert('./mare-bot-firebase-adminsdk-shb4y-2bfb8bc88e.json')
});

// These registration tokens come from the client FCM SDKs.
const registrationTokens = [
  "e5KTAQ4MtmvkbXaImxG3ib:APA91bGXlpZA1kIG5LhjoVMXPLQ…2TxAGOnaDA1sYeceBYFjA0_vc2bWnQBZ98CfFAtCDPjhtArL2"
];

// Subscribe the devices corresponding to the registration tokens to the
// topic.
// @ts-ignore
getMessaging(admin).subscribeToTopic(registrationTokens, "topic")
  .then((response) => {
    // See the MessagingTopicManagementResponse reference documentation
    // for the contents of response.
    console.log('Successfully subscribed to topic:', response);
  })
  .catch((error) => {
    console.log('Error subscribing to topic:', error);
  });

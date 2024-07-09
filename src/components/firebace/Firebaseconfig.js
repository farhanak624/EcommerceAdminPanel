import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDQGSoVfGTwrD__UtdYXYkvyeDnVgnf294",
  authDomain: "ecommerce-32d01.firebaseapp.com",
  projectId: "ecommerce-32d01",
  storageBucket: "ecommerce-32d01.appspot.com",
  messagingSenderId: "335822083710",
  appId: "1:335822083710:web:a5595779557f5f44daaa2f",
  measurementId: "G-BPPEJTPD1W",
};
initializeApp(firebaseConfig);

const messaging = getMessaging();
console.log(messaging);
export const requestForToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BAIRF0_dvkDOUqejituXSZtnPr1ayo3taWt2j64J1u0hbYGefFGeHeh84hk1RTZUPS1wDsRIRqMTay7aoIy-X4Q",
    });
    console.log("FCM token:", token);

    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("recived a bg mesahe))))))))))))))))");

      resolve(payload);
    });
  });

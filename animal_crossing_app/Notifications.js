import * as Notifications from 'expo-notifications';
import React, {Component} from 'react';
import {getSettingsString} from "./LoadJsonData"

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

// export async function testNotification(){
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Test",
//       body: 'Notification',
//       color : "#6474A8",
//     },
//     trigger: { seconds: 1 },
//   });
// }

// <Button
//     title="Test"
//     onPress={async () => {
//       await testNotification();
//     }}
//   />

export async function schedulePushNotification(date,time,name,body) {
  const dateTrigger = new Date(date);
  const timeChosen = new Date(time)
  if(time!==""){
    dateTrigger.setHours(timeChosen.getHours());
    dateTrigger.setMinutes(timeChosen.getMinutes());
  } else {
    dateTrigger.setHours(8);
    dateTrigger.setMinutes(0);
  }
  
  const trigger = dateTrigger;
  // console.log("Schedule notification " + name + " " + body)
  // console.log("For: " + dateTrigger.getHours() + ":"+dateTrigger.getMinutes() + " " + dateTrigger)
  await Notifications.scheduleNotificationAsync({
    content: {
      title: name,
      body: body,
      color : "#6DA864",
    },
    trigger,
  });
}

export async function logNextTriggerDate() {
  try {
    const nextTriggerDate = await Notifications.getNextTriggerDateAsync({
      seconds:10,
    });
    console.log(nextTriggerDate === null ? 'No next trigger date' : new Date(nextTriggerDate));
  } catch (e) {
    console.warn(`Couldn't have calculated next trigger date: ${e}`);
  }
}

export function cancelAllPushNotifications() {
  // console.log("cancelled all subscriptions")
  Notifications.cancelAllScheduledNotificationsAsync();
}
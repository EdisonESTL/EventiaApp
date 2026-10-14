import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleNotification({ title, body }: { title: string; body: string }) {
  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) {
    console.error("Notification permission not granted");
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body
    },
    trigger: null
  });
}

export async function eventReminderNotification(eventName: string, eventDate: Date) {
  const now = new Date(eventDate.getTime() - 24 * 60 * 60 * 1000); // 24 hours before the event
  if (now > new Date()) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Recuerda: ${eventName}`,
        body: `Tu evento "${eventName}" es mañana "${eventDate.toLocaleDateString()}". ¡No olvides prepararte!`,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: now,
      },
    });
  }
}

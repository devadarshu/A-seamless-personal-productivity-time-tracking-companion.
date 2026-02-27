/**
 * HumanizedNotificationService.js
 * Focuses on actionable titles, clear captions, and channel management.
 */

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// 3. Channel Importance (Android Specific)
// We categorize notifications so users can silence "Marketing" but keep "Updates"
export async function setupNotificationChannels() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('item-updates', {
      name: 'Item Updates',
      description: 'Helpful nudges when your saved items change.',
      importance: Notifications.AndroidImportance.HIGH,
      lightColor: '#FF231F7C',
    });

    await Notifications.setNotificationChannelAsync('system-alerts', {
      name: 'System Status',
      description: 'Important alerts regarding your account and app health.',
      importance: Notifications.AndroidImportance.MAX,
    });
  }
}

/**
 * Sends a humanized notification nudge
 * @param {string} type - 'update' or 'alert'
 */
export async function sendNudge(type) {
  let content = {
    title: "Something New for You!", // 1. Actionable Title
    body: "We've updated your item list with the latest details.", // 2. Clear Caption
    data: { screen: 'DetailScreen' },
  };

  if (type === 'alert') {
    content = {
      title: "Quick Status Update",
      body: "Everything is synced! Your local data is now up to date with the server.",
      data: { screen: 'SettingsScreen' },
    };
  }

  await Notifications.scheduleNotificationAsync({
    content: content,
    trigger: null, // Sends immediately
  });
}

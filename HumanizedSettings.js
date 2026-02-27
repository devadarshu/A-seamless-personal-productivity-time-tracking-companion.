/**
 * HumanizedSettings.js
 * A settings configuration designed for empathy and clarity.
 */

import React, { useState } from 'react';
import { View, Text, Switch, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const SettingsScreen = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    dataSaver: false,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // 3. Intuitive Grouping: Defining sections logically
  const settingsConfig = [
    {
      sectionTitle: "Appearance",
      items: [
        {
          id: 'darkMode',
          // 1. Friendly Labels
          title: "Night Owl Mode", 
          // 2. Contextual Captions
          caption: "Saves your eyes by using darker colors at night.",
          value: settings.darkMode
        }
      ]
    },
    {
      sectionTitle: "Experience",
      items: [
        {
          id: 'notifications',
          title: "Keep Me Posted",
          caption: "Receive updates about new items and community alerts.",
          value: settings.notifications
        },
        {
          id: 'dataSaver',
          title: "Lite Mode",
          caption: "Reduces data usage by loading smaller images.",
          value: settings.dataSaver
        }
      ]
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {settingsConfig.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionHeader}>{section.sectionTitle}</Text>
          {section.items.map(item => (
            <View key={item.id} style={styles.row}>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemCaption}>{item.caption}</Text>
              </View>
              <Switch
                value={item.value}
                onValueChange={() => toggleSetting(item.id)}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={item.value ? "#f5dd4b" : "#f4f3f4"}
              />
            </View>
          ))}
        </View>
      ))}
      
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Support</Text>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.itemTitle}>Talk to a Human</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  section: { marginTop: 25, paddingHorizontal: 20 },
  sectionHeader: { fontSize: 13, color: '#888', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 1 },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1 // subtle shadow
  },
  textContainer: { flex: 0.85 },
  itemTitle: { fontSize: 17, fontWeight: '500', color: '#333' },
  itemCaption: { fontSize: 13, color: '#666', marginTop: 3 }
});

export default SettingsScreen;

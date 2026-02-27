import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, AccessibilityInfo, Platform, ToastAndroid, Alert } from 'react-native';

const IntelligentSettingsManager = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDataSaving, setIsDataSaving] = useState(false);

  // 1. State Management: Immediate UI Update
  // This effect simulates changing the global theme provider or native styles
  useEffect(() => {
    const mode = isDarkMode ? "Dark" : "Light";
    console.log(`System Theme applied: ${mode}`);
  }, [isDarkMode]);

  // 2. User Feedback: Humanized Confirmation
  const showFeedback = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      // iOS doesn't have native Toasts, so we use a subtle Alert or custom UI
      console.log(`Feedback: ${message}`); 
    }
  };

  const handleToggleDark = (value) => {
    setIsDarkMode(value);
    const msg = value ? "Night Owl Mode activated!" : "Bright Mode activated!";
    showFeedback(msg);
  };

  const handleClearCache = () => {
    // Logic to clear local storage would go here
    showFeedback("Cache cleared successfully!");
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}>
      
      {/* 3. Accessibility: Descriptive labels for screen readers */}
      <View 
        style={styles.settingRow}
        accessible={true}
        accessibilityLabel="Night Owl Mode"
        accessibilityHint="Toggles the app theme between light and dark colors."
        accessibilityRole="switch"
        accessibilityState={{ checked: isDarkMode }}
      >
        <View>
          <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>
            Night Owl Mode
          </Text>
          <Text style={isDarkMode ? styles.darkCaption : styles.lightCaption}>
            Easy on the eyes for late-night browsing.
          </Text>
        </View>
        
        <Switch
          value={isDarkMode}
          onValueChange={handleToggleDark}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={handleClearCache}
        accessibilityLabel="Clear temporary data"
        accessibilityHint="Removes cached images to free up space on your phone."
      >
        <Text style={styles.buttonText}>Clear Cache</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  darkBg: { backgroundColor: '#121212' },
  lightBg: { backgroundColor: '#FFFFFF' },
  settingRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingVertical: 15 
  },
  title: { fontSize: 18, fontWeight: '600' },
  darkText: { color: '#FFFFFF' },
  lightText: { color: '#000000' },
  button: { marginTop: 30, padding: 15, backgroundColor: '#007AFF', borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});

export default IntelligentSettingsManager;

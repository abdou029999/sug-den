/**
 * ═══════════════════════════════════════════════════════════
 * AURA APP - PROFILE SCREEN
 * ═══════════════════════════════════════════════════════════
 * 
 * 🔑 ADMIN ACCESS (SECRET GESTURE):
 * ─────────────────────────────────────────────────────────
 * HOW TO ACCESS ADMIN PANEL:
 * 1. Navigate to Profile tab (👤)
 * 2. Tap your profile picture 5 times quickly
 * 3. Tap within 3 seconds
 * 4. Admin panel appears with options!
 * 
 * This is the ONLY way to access admin features!
 * No password needed - secret gesture access only!
 * ─────────────────────────────────────────────────────────
 * 
 * ADMIN FEATURES AVAILABLE:
 * • 👥 Manage Users
 * • 📊 View Analytics  
 * • 🚫 Ban Users
 * • 🪙 Add Aura Coins
 * 
 * ═══════════════════════════════════════════════════════════
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth } from '../../src/config/firebase';

const COLORS = [
  { name: 'Purple', code: '#8B5CF6' },
  { name: 'Blue', code: '#3B82F6' },
  { name: 'Pink', code: '#EC4899' },
  { name: 'Green', code: '#10B981' },
];

const FRAMES = [
  { name: 'Classic', emoji: '⬜' },
  { name: 'Gold', emoji: '🟨' },
  { name: 'Diamond', emoji: '💎' },
  { name: 'Dragon', emoji: '🐉' },
];

export default function ProfileScreen() {
  const [tapCount, setTapCount] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [username, setUsername] = useState('@darboom72-tech');
  const [profilePic, setProfilePic] = useState('👤');
  const [selectedColor, setSelectedColor] = useState('#8B5CF6');
  const [selectedFrame, setSelectedFrame] = useState('Classic');
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

  const followers = 12450;
  const following = 3421;
  const lives = 156;

  const handleProfilePicTap = () => {
    // ADMIN ACCESS: Counting taps on profile picture
    // After exactly 5 taps, unlock the secret admin panel
    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (newCount >= 5) {
      setShowAdmin(true);
      setTapCount(0);
      // Admin panel is now visible
    }
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut(auth);
            router.replace('/(auth)/SignInScreen');
          } catch (error: any) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]);
  };

  const handleSaveSettings = () => {
    Alert.alert('Success', 'Profile settings updated!');
    setShowSettings(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Profile Picture */}
      <TouchableOpacity onPress={handleProfilePicTap} style={styles.profilePicContainer}>
        <Text style={[styles.profilePic, { fontSize: 100 }]}>{profilePic}</Text>
        {showAdmin && <Text style={styles.adminBadge}>👑</Text>}
      </TouchableOpacity>

      {/* Username */}
      <Text style={styles.username}>{username}</Text>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{followers.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{following.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{lives}</Text>
          <Text style={styles.statLabel}>Lives</Text>
        </View>
      </View>

      {/* Admin Panel */}
      {showAdmin && (
        <View style={styles.adminPanel}>
          <Text style={styles.adminTitle}>👑 OWNER PANEL</Text>
          <TouchableOpacity
            style={styles.adminBtn}
            onPress={() =>
              Alert.alert('Manage Users', 'User management interface')
            }>
            <Text style={styles.adminBtnText}>👥 Manage Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.adminBtn}
            onPress={() =>
              Alert.alert('View Analytics', 'App analytics and statistics')
            }>
            <Text style={styles.adminBtnText}>📊 View Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.adminBtn}
            onPress={() =>
              Alert.alert('Ban Users', 'Ban user management')
            }>
            <Text style={styles.adminBtnText}>🚫 Ban Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.adminBtn}
            onPress={() =>
              Alert.alert('Add Aura Coins', 'Add coins to user account')
            }>
            <Text style={styles.adminBtnText}>🪙 Add Aura Coins</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.adminBtn, styles.adminBtnClose]}
            onPress={() => setShowAdmin(false)}>
            <Text style={styles.adminBtnText}>✕ Close Admin</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Colors Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 Colors</Text>
        <View style={styles.colorGrid}>
          {COLORS.map((color) => (
            <TouchableOpacity
              key={color.name}
              style={[
                styles.colorItem,
                { backgroundColor: color.code },
                selectedColor === color.code && styles.colorItemSelected,
              ]}
              onPress={() => setSelectedColor(color.code)}>
              <Text style={styles.colorName}>{color.name}</Text>
              {selectedColor === color.code && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Frames Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🖼️ Frames</Text>
        <View style={styles.frameGrid}>
          {FRAMES.map((frame) => (
            <TouchableOpacity
              key={frame.name}
              style={[
                styles.frameItem,
                selectedFrame === frame.name && styles.frameItemSelected,
              ]}
              onPress={() => setSelectedFrame(frame.name)}>
              <Text style={styles.frameEmoji}>{frame.emoji}</Text>
              <Text style={styles.frameName}>{frame.name}</Text>
              {selectedFrame === frame.name && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Settings Button */}
      <TouchableOpacity
        style={styles.settingsBtn}
        onPress={() => setShowSettings(true)}>
        <Text style={styles.settingsBtnText}>⚙️ Settings</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutBtnText}>🚪 Logout</Text>
      </TouchableOpacity>

      {/* Settings Modal */}
      <Modal transparent visible={showSettings} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>⚙️ Settings</Text>
              <TouchableOpacity onPress={() => setShowSettings(false)}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
              {/* Change Username */}
              <View style={styles.settingGroup}>
                <Text style={styles.settingLabel}>📝 Change Username</Text>
                <TextInput
                  style={styles.settingInput}
                  placeholder="Enter new username"
                  placeholderTextColor="#666"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>

              {/* Change Profile Picture */}
              <View style={styles.settingGroup}>
                <Text style={styles.settingLabel}>🖼️ Change Profile Picture</Text>
                <Text style={styles.settingSubtext}>Choose an emoji:</Text>
                <View style={styles.emojiGrid}>
                  {['👤', '👨', '👩', '🎮', '🎬', '🎵'].map((emoji) => (
                    <TouchableOpacity
                      key={emoji}
                      style={[
                        styles.emojiBtn,
                        profilePic === emoji && styles.emojiBtnSelected,
                      ]}
                      onPress={() => setProfilePic(emoji)}>
                      <Text style={styles.emojiText}>{emoji}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Change Password */}
              <View style={styles.settingGroup}>
                <Text style={styles.settingLabel}>🔒 Change Password</Text>
                <TextInput
                  style={styles.settingInput}
                  placeholder="Enter new password"
                  placeholderTextColor="#666"
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
              </View>

              {/* Notification Settings */}
              <View style={styles.settingGroup}>
                <Text style={styles.settingLabel}>🔔 Notifications</Text>
                <View style={styles.toggleItem}>
                  <Text style={styles.toggleLabel}>Push Notifications</Text>
                  <Text style={styles.toggleSwitch}>ON</Text>
                </View>
                <View style={styles.toggleItem}>
                  <Text style={styles.toggleLabel}>Email Notifications</Text>
                  <Text style={styles.toggleSwitch}>ON</Text>
                </View>
              </View>

              {/* Privacy Settings */}
              <View style={styles.settingGroup}>
                <Text style={styles.settingLabel}>🔐 Privacy</Text>
                <View style={styles.toggleItem}>
                  <Text style={styles.toggleLabel}>Public Profile</Text>
                  <Text style={styles.toggleSwitch}>ON</Text>
                </View>
                <View style={styles.toggleItem}>
                  <Text style={styles.toggleLabel}>Allow Messages</Text>
                  <Text style={styles.toggleSwitch}>ON</Text>
                </View>
              </View>
            </ScrollView>

            {/* Save Button */}
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSaveSettings}>
              <Text style={styles.saveBtnText}>✓ Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profilePic: {
    fontSize: 100,
    marginBottom: 10,
  },
  adminBadge: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    fontSize: 40,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#333',
    marginHorizontal: 10,
  },
  adminPanel: {
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  adminTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 15,
    textAlign: 'center',
  },
  adminBtn: {
    backgroundColor: '#2A1A4A',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  adminBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  adminBtnClose: {
    backgroundColor: '#4A1A1A',
    borderColor: '#EF4444',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorItem: {
    width: '48%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorItemSelected: {
    borderColor: '#fff',
    borderWidth: 3,
  },
  colorName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  checkmark: {
    color: '#fff',
    fontSize: 20,
    marginTop: 5,
  },
  frameGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  frameItem: {
    width: '48%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderColor: '#333',
  },
  frameItemSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: '#2A1A4A',
  },
  frameEmoji: {
    fontSize: 30,
    marginBottom: 5,
  },
  frameName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  settingsBtn: {
    backgroundColor: '#1A4A8B',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  settingsBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutBtn: {
    backgroundColor: '#4A1A1A',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#EF4444',
  },
  logoutBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#0F0F0F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeBtnText: {
    fontSize: 28,
    color: '#fff',
  },
  modalScroll: {
    maxHeight: '70%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  settingGroup: {
    marginBottom: 25,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  settingSubtext: {
    color: '#999',
    fontSize: 12,
    marginBottom: 10,
  },
  settingInput: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    fontSize: 14,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  emojiBtn: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },
  emojiBtnSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: '#2A1A4A',
  },
  emojiText: {
    fontSize: 32,
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  toggleLabel: {
    color: '#fff',
    fontSize: 14,
  },
  toggleSwitch: {
    color: '#8B5CF6',
    fontWeight: 'bold',
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 15,
    paddingHorizontal: 20,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

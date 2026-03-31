import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../src/config/firebase';
import { getCurrentUserProfile, banUser, unbanUser, addAuraCoins } from '../../src/utils/userHelper';

interface User {
  uid: string;
  username: string;
  email: string;
  followers: number;
  following: number;
  lives: number;
  auraCoins: number;
  isAdmin: boolean;
}

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminTapCount, setAdminTapCount] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getCurrentUserProfile();
        if (profile) {
          setUser({
            uid: profile.uid,
            username: profile.username,
            email: profile.email,
            followers: profile.followers || 0,
            following: profile.following || 0,
            lives: profile.livesCount || 0,
            auraCoins: profile.auraCoins || 0,
            isAdmin: profile.isAdmin || false,
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        Alert.alert('Error', 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleAvatarPress = () => {
    setAdminTapCount(prev => prev + 1);
    if (adminTapCount === 4) {
      setShowAdminPanel(!showAdminPanel);
      setAdminTapCount(0);
      Alert.alert('Admin Panel', showAdminPanel ? 'Closed' : 'Opened');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/(auth)/SignInScreen');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  const handleAddCoins = async () => {
    if (!user) return;
    try {
      await addAuraCoins(user.uid, 100);
      Alert.alert('Success', 'Added 100 Aura coins!');
      setUser(prev => prev ? { ...prev, auraCoins: prev.auraCoins + 100 } : null);
    } catch (error) {
      Alert.alert('Error', 'Failed to add coins');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Profile not loaded</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleAvatarPress} style={styles.avatarBtn}>
          <Text style={styles.avatar}>👤</Text>
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{user.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{user.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{user.lives}</Text>
          <Text style={styles.statLabel}>Lives</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>★ {user.auraCoins}</Text>
          <Text style={styles.statLabel}>Aura Coins</Text>
        </View>
      </View>

      {/* Admin Panel */}
      {showAdminPanel && (
        <View style={styles.adminPanel}>
          <Text style={styles.adminTitle}>⚙️ Admin Panel</Text>
          
          <TouchableOpacity style={styles.adminBtn} onPress={handleAddCoins}>
            <Text style={styles.adminBtnText}>➕ Add 100 Coins</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.adminBtn, { backgroundColor: '#EF4444' }]}
            onPress={() => Alert.alert('Ban User', 'Feature in development')}>
            <Text style={styles.adminBtnText}>🚫 Ban User</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutBtnText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  avatarBtn: {
    marginRight: 16,
  },
  avatar: {
    fontSize: 50,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    color: '#999',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#999',
    fontSize: 12,
  },
  adminPanel: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#8B5CF6',
  },
  adminTitle: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  adminBtn: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  adminBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutBtn: {
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});

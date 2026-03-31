import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { searchUsers, followUser, unfollowUser } from '../../src/utils/userHelper';

interface User {
  uid: string;
  email: string;
  username: string;
  followers: number;
  following: number;
}

const defaultChats = [
  { id: '1', name: 'Maya Chen', message: 'Hey, did you see the new aura pulse?', time: '2m ago', unread: true },
  { id: '2', name: 'Leo Torres', message: 'Thanks for the starlight gift! ✨', time: '2m ago', unread: true },
  { id: '3', name: 'Aurora Sky', message: 'Thanks for the starlight gift! ✨', time: '2m ago', unread: false },
  { id: '4', name: 'Nova Stars', message: 'Have a great day!', time: 'Yesterday', unread: false },
  { id: '5', name: 'Mav Torres', message: 'See you later!', time: 'Yesterday', unread: false },
];

export default function MessagesScreen() {
  const [activeTab, setActiveTab] = useState<'chats' | 'find'>('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.length === 0) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const results = await searchUsers(query);
      setSearchResults(results || []);
    } catch (error) {
      console.error('Search error:', error);
      Alert.alert('Error', 'Failed to search users');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUser = async (user: User) => {
    try {
      await followUser(user.uid);
      Alert.alert('Success', `You followed ${user.username}!`);
      // Refresh search results
      handleSearch(searchQuery);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to follow user');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'chats' && styles.activeTab]} 
          onPress={() => setActiveTab('chats')}
        >
          <Text style={[styles.tabText, activeTab === 'chats' && styles.activeTabText]}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'find' && styles.activeTab]} 
          onPress={() => setActiveTab('find')}
        >
          <Text style={[styles.tabText, activeTab === 'find' && styles.activeTabText]}>Find Friends</Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'chats' ? (
        /* CHATS TAB */
        <ScrollView style={styles.scrollView}>
          {defaultChats.map((chat) => (
            <TouchableOpacity key={chat.id} style={styles.chatCard}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName}>{chat.name}</Text>
                  <Text style={styles.chatTime}>{chat.time}</Text>
                </View>
                <Text style={styles.chatMessage} numberOfLines={1}>{chat.message}</Text>
              </View>
              {chat.unread && <View style={styles.unreadBadge} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        /* FIND FRIENDS TAB */
        <View style={styles.findFriendsContainer}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#8B5CF6" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by username or email..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView style={styles.resultsContainer}>
            {loading ? (
              <View style={styles.emptyState}>
                <Text style={styles.loadingText}>Searching...</Text>
              </View>
            ) : searchQuery.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="people" size={48} color="#8B5CF6" />
                <Text style={styles.emptyText}>Find New Friends</Text>
                <Text style={styles.emptySubtext}>Search users by username or email to get started</Text>
              </View>
            ) : searchResults.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="search" size={48} color="#666" />
                <Text style={styles.emptyText}>No results found</Text>
                <Text style={styles.emptySubtext}>Try searching with different keywords</Text>
              </View>
            ) : (
              searchResults.map((user) => (
                <View key={user.uid} style={styles.userCard}>
                  <View style={styles.userAvatar}>
                    <Ionicons name="person-circle" size={48} color="#8B5CF6" />
                  </View>
                  
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user.username}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    <View style={styles.userStats}>
                      <Text style={styles.userStat}>{user.followers} followers</Text>
                      <Text style={styles.userStat}> • </Text>
                      <Text style={styles.userStat}>{user.following} following</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.followBtn}
                    onPress={() => handleFollowUser(user)}
                  >
                    <Text style={styles.followBtnText}>Follow</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomColor: '#1F1F1F',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomColor: '#8B5CF6',
    borderBottomWidth: 2,
  },
  tabText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#8B5CF6',
  },
  scrollView: {
    flex: 1,
  },
  chatCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomColor: '#1F1F1F',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  chatTime: {
    color: '#6B7280',
    fontSize: 12,
  },
  chatMessage: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  unreadBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8B5CF6',
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySubtext: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  loadingText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  // Find Friends Styles
  findFriendsContainer: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 25,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 14,
  },
  resultsContainer: {
    flex: 1,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#1F1F1F',
    borderBottomWidth: 1,
  },
  userAvatar: {
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 6,
  },
  userStats: {
    flexDirection: 'row',
  },
  userStat: {
    color: '#6B7280',
    fontSize: 11,
  },
  followBtn: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

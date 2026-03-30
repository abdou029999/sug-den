import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const chats = [
  { id: '1', name: 'Maya Chen', message: 'Hey, did you see the new aura pulse?', time: '2m ago', unread: true },
  { id: '2', name: 'Leo Torres', message: 'Thanks for the starlight gift! ✨', time: '2m ago', unread: true },
  { id: '3', name: 'Aurora Sky', message: 'Thanks for the starlight gift! ✨', time: '2m ago', unread: false },
  { id: '4', name: 'Nova Stars', message: 'Have a great day!', time: 'Yesterday', unread: false },
  { id: '5', name: 'Mav Torres', message: 'See you later!', time: 'Yesterday', unread: false },
];

export default function MessagesScreen() {
  const [activeTab, setActiveTab] = useState<'chats' | 'requests'>('chats');

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
          style={[styles.tab, activeTab === 'requests' && styles.activeTab]} 
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>Requests</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {activeTab === 'chats' ? (
          chats.map((chat) => (
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
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="person-add" size={48} color="#8B5CF6" />
            <Text style={styles.emptyText}>No friend requests</Text>
          </View>
        )}
      </ScrollView>
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
    marginBottom: 4,
  },
  chatName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatTime: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  chatMessage: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B5CF6',
    marginLeft: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 16,
    marginTop: 12,
  },
});

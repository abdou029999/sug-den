import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const stories = [
  { id: '1', username: 'Your Story', isUser: true },
  { id: '2', username: 'Luna', hasNew: true },
  { id: '3', username: 'Nova', hasNew: true },
  { id: '4', username: 'Stellar', hasNew: false },
  { id: '5', username: 'Lila', hasNew: true },
  { id: '6', username: 'Max', hasNew: false },
];

const posts = [
  { id: '1', username: 'Autgrats', caption: 'Amazing sunset today! 🌅', likes: 234, aura: 50, image: 'https://picsum.photos/400/300?random=10' },
  { id: '2', username: 'MysticVibes', caption: 'New aura frame unlocked! ✨', likes: 189, aura: 30, image: 'https://picsum.photos/400/300?random=11' },
  { id: '3', username: 'StarGazer', caption: 'Live stream was epic! 🔥', likes: 412, aura: 80, image: 'https://picsum.photos/400/300?random=12' },
];

export default function AuraFlowScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Stories */}
        <View style={styles.storiesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {stories.map((story) => (
              <TouchableOpacity key={story.id} style={styles.storyItem}>
                <View style={[styles.storyRing, story.hasNew && styles.storyRingNew]}>
                  <View style={styles.storyAvatar}>
                    <Ionicons name="person" size={28} color="#FFFFFF" />
                  </View>
                </View>
                <Text style={styles.storyUsername} numberOfLines={1}>{story.username}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Posts */}
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postAvatar}>
                <Ionicons name="person" size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.postUsername}>{post.username}</Text>
            </View>
            <Image source={{ uri: post.image }} style={styles.postImage} />
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.auraButton}>
                <Ionicons name="sparkles" size={20} color="#8B5CF6" />
                <Text style={styles.auraButtonText}>Send Aura</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.postStats}>
              <Text style={styles.likesText}>{post.likes} likes</Text>
            </View>
            <Text style={styles.postCaption}>
              <Text style={styles.captionUsername}>{post.username}</Text> {post.caption}
            </Text>
          </View>
        ))}

        {/* Discover Section */}
        <View style={styles.discoverSection}>
          <Text style={styles.discoverTitle}>Discover / Recommended</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {posts.map((post) => (
              <TouchableOpacity key={post.id} style={styles.discoverCard}>
                <Image source={{ uri: post.image }} style={styles.discoverImage} />
                <Text style={styles.discoverUsername}>{post.username}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  scrollView: {
    flex: 1,
  },
  storiesContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  storyRing: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#1F1F1F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  storyRingNew: {
    borderColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyUsername: {
    color: '#FFFFFF',
    fontSize: 11,
    width: 70,
    textAlign: 'center',
  },
  postCard: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  postAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  postUsername: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  postActions: {
    flexDirection: 'row',
    padding: 12,
  },
  actionButton: {
    marginRight: 16,
  },
  auraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  auraButtonText: {
    color: '#8B5CF6',
    fontWeight: '600',
    marginLeft: 4,
  },
  postStats: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  likesText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  postCaption: {
    color: '#FFFFFF',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  captionUsername: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  discoverSection: {
    padding: 16,
  },
  discoverTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  discoverCard: {
    marginRight: 12,
    alignItems: 'center',
  },
  discoverImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  discoverUsername: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 8,
  },
});

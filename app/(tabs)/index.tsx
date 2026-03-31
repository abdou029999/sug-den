import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { subscribeToActiveStreams, addLiveViewer } from '../../src/utils/agoraHelper';

interface LiveStream {
  streamId: string;
  userId: string;
  username: string;
  viewers: number;
  isActive: boolean;
}

export default function LiveScreen() {
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    
    // Subscribe to real-time updates from Firestore
    const unsubscribe = subscribeToActiveStreams((streams) => {
      setLiveStreams(streams);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleGoLive = () => {
    router.push('./LiveStreamScreen');
  };

  const handleJoinLive = async (stream: LiveStream) => {
    try {
      await addLiveViewer(stream.streamId, 'current_user');
      router.push({
        pathname: './LiveStreamScreen',
        params: { streamId: stream.streamId, join: 'true' }
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to join live stream');
    }
  };

  const handleInvite = async (stream: LiveStream) => {
    const { Share } = await import('react-native');
    try {
      await Share.share({
        message: `Check out ${stream.username}'s live stream on Aura App! 🔴 ${stream.viewers} watching now!`,
        title: 'Join Live Stream',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Now</Text>
        <TouchableOpacity style={styles.goLiveBtn} onPress={handleGoLive}>
          <Text style={styles.goLiveText}>🎬 GO LIVE</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading live streams...</Text>
        </View>
      ) : liveStreams.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No one is live right now</Text>
          <Text style={styles.emptySubtext}>Tap "GO LIVE" to be the first! 🔴</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {liveStreams.map((stream) => (
            <View key={stream.streamId} style={styles.card}>
              <TouchableOpacity 
                style={styles.livePreview}
                onPress={() => handleJoinLive(stream)}>
                <View style={styles.placeholderImage}>
                  <Text style={styles.placeholderText}>📹</Text>
                </View>
                <View style={styles.liveIndicator}>
                  <Text style={styles.liveText}>🔴 LIVE</Text>
                </View>
              </TouchableOpacity>
              
              <View style={styles.cardInfo}>
                <View style={styles.userInfo}>
                  <Text style={styles.username}>{stream.username}</Text>
                  <Text style={styles.viewers}>👥 {stream.viewers} watching</Text>
                </View>
                
                <View style={styles.actions}>
                  <TouchableOpacity 
                    style={styles.actionBtn}
                    onPress={() => handleJoinLive(stream)}>
                    <Text style={styles.actionBtnText}>Join</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionBtn, styles.actionBtnSecondary]}
                    onPress={() => handleInvite(stream)}>
                    <Text style={styles.actionBtnTextSecondary}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0F0F0F' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20, 
    paddingTop: 50 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  goLiveBtn: { 
    backgroundColor: '#8B5CF6', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 25 
  },
  goLiveText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  scrollView: { 
    flex: 1 
  },
  scrollContent: { 
    padding: 15,
    paddingBottom: 30 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubtext: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  card: { 
    borderRadius: 15, 
    overflow: 'hidden', 
    marginBottom: 15, 
    backgroundColor: '#1A1A1A' 
  },
  livePreview: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 60,
  },
  liveIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardInfo: { 
    padding: 15 
  },
  userInfo: {
    marginBottom: 10,
  },
  username: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  viewers: { 
    color: '#9CA3AF', 
    fontSize: 14, 
    marginTop: 5 
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionBtnSecondary: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  actionBtnTextSecondary: {
    color: '#8B5CF6',
    fontWeight: 'bold',
    fontSize: 14,
  },
});


/**
 * ═══════════════════════════════════════════════════════════
 * LIVE STREAMS TAB - AGORA INTEGRATION
 * ═══════════════════════════════════════════════════════════
 * 
 * Features:
 * • Real-time list of active live streams
 * • Powered by Agora + Firestore
 * • Join any live stream
 * • Start your own broadcast
 * 
 * ═══════════════════════════════════════════════════════════
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../src/config/firebase';

interface LiveStream {
  id: string;
  userId: string;
  email: string;
  channelId: string;
  startTime: any;
  viewers: number;
  isActive: boolean;
}

export default function LiveScreen() {
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Listen to active live streams from Firestore
  useEffect(() => {
    const activeStreamsQuery = query(
      collection(db, 'live_streams'),
      where('isActive', '==', true)
    );

    const unsubscribe = onSnapshot(
      activeStreamsQuery,
      (snapshot) => {
        const streams: LiveStream[] = [];
        snapshot.forEach((doc) => {
          streams.push({
            id: doc.id,
            ...doc.data(),
          } as LiveStream);
        });
        setLiveStreams(streams);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching live streams:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleGoLive = () => {
    router.push('./LiveStreamScreen');
  };

  const handleJoinLive = (stream: LiveStream) => {
    Alert.alert('Join Live', `Join ${stream.email}'s live stream?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Join',
        onPress: () => {
          // Navigate to LiveStreamScreen with viewer parameters
          router.push({
            pathname: './LiveStreamScreen',
            params: {
              isViewer: 'true',
              channelId: stream.channelId,
              broadcasterUid: stream.userId,
            },
          } as any);
        },
      },
    ]);
  };

  // Get username from email
  const getUsername = (email: string): string => {
    return email.split('@')[0] || 'User';
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Live Now</Text>
          <TouchableOpacity style={styles.goLiveBtn} onPress={handleGoLive}>
            <Text style={styles.goLiveText}>🎬 GO LIVE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8B5CF6" />
          <Text style={styles.loadingText}>Loading live streams...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Now</Text>
        <TouchableOpacity style={styles.goLiveBtn} onPress={handleGoLive}>
          <Text style={styles.goLiveText}>🎬 GO LIVE</Text>
        </TouchableOpacity>
      </View>

      {liveStreams.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📺</Text>
          <Text style={styles.emptyText}>No one is streaming right now</Text>
          <Text style={styles.emptySubtext}>Start the first live stream!</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {liveStreams.map((stream) => (
            <TouchableOpacity
              key={stream.id}
              style={styles.card}
              onPress={() => handleJoinLive(stream)}>
              {/* Thumbnail - use gradient background */}
              <View style={styles.thumbnailContainer}>
                <View style={styles.thumbnailGradient} />
                <View style={styles.thumbnailOverlay}>
                  <Text style={styles.joinText}>TAP TO JOIN</Text>
                </View>
              </View>

              {/* Live Indicator */}
              <View style={styles.liveIndicator}>
                <Text style={styles.liveText}>🔴 LIVE</Text>
              </View>

              {/* Card Info */}
              <View style={styles.cardInfo}>
                <Text style={styles.username}>@{getUsername(stream.email)}</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.viewers}>👥 {stream.viewers} watching</Text>
                  <Text style={styles.email}>{stream.email}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  goLiveBtn: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  goLiveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 15,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyEmoji: {
    fontSize: 70,
    marginBottom: 20,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: '#1A1A1A',
  },
  thumbnailContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  thumbnailGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(139, 92, 246, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  liveIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  liveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardInfo: {
    padding: 15,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  viewers: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  email: {
    color: '#9CA3AF',
    fontSize: 12,
  },
});

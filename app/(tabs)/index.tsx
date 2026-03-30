import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const liveStreams = [
  { id: '1', username: 'Luna_Star', viewers: 247, thumbnail: 'https://picsum.photos/300/400?random=1' },
  { id: '2', username: 'CelestialAura', viewers: 189, thumbnail: 'https://picsum.photos/300/400?random=2' },
  { id: '3', username: 'MysticVibes', viewers: 312, thumbnail: 'https://picsum.photos/300/400?random=3' },
  { id: '4', username: 'StarGazer', viewers: 456, thumbnail: 'https://picsum.photos/300/400?random=4' },
];

export default function LiveScreen() {
  const router = useRouter();

  const handleGoLive = () => {
    router.push('./LiveStreamScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Now</Text>
        <TouchableOpacity style={styles.goLiveBtn} onPress={handleGoLive}>
          <Text style={styles.goLiveText}>🎬 GO LIVE</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {liveStreams.map((stream) => (
          <TouchableOpacity key={stream.id} style={styles.card}>
            <Image source={{ uri: stream.thumbnail }} style={styles.thumbnail} />
            <View style={styles.liveIndicator}>
              <Text style={styles.liveText}>🔴 LIVE</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.username}>{stream.username}</Text>
              <Text style={styles.viewers}>👥 {stream.viewers} watching</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    padding: 15 
  },
  card: { 
    borderRadius: 15, 
    overflow: 'hidden', 
    marginBottom: 15, 
    backgroundColor: '#1A1A1A' 
  },
  thumbnail: { 
    width: '100%', 
    height: 250 
  },
  liveIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
    padding: 15 
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
});


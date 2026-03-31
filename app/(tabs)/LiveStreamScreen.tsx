/**
 * ═══════════════════════════════════════════════════════════
 * LIVE STREAM SCREEN - CAMERA & AGORA STREAMING
 * ═══════════════════════════════════════════════════════════
 * 
 * 📹 CAMERA CONTROLS (Like TikTok):
 * ─────────────────────────────────────────────────────────
 * • 🎤 Mic Toggle: Turn microphone on/off
 * • 📷 Camera Switch: Switch between front (selfie) and back camera
 * • 🔴 GO LIVE / END LIVE: Start and stop streaming
 * • 👥 INVITE: Share your live with friends
 * 
 * DEFAULT: Front camera (selfie mode)
 * SWITCH: Tap 📷 button to switch to back camera
 * 
 * VIEWER COUNT: Real-time viewer count from Firestore
 * 
 * PERMISSIONS REQUIRED:
 * • Camera (expo-camera)
 * • Microphone (audio recording)
 * 
 * FIRESTORE INTEGRATION:
 * • Stream stored in live_streams collection
 * • Viewers tracked in real-time
 * • Auto cleanup when ending stream
 * 
 * ═══════════════════════════════════════════════════════════
 */

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { RtcEngine, ChannelProfile, ClientRole } from 'react-native-agora';
import { createLiveStream, endLiveStream, subscribeToActiveStreams } from '../../src/utils/agoraHelper';
import { getCurrentUserProfile } from '../../src/utils/userHelper';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const AGORA_APP_ID = 'ebd4c18270f34be1b62017bc390edf10';

export default function LiveStreamScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [micOn, setMicOn] = useState(true);
  const [cameraFacing, setCameraFacing] = useState<'front' | 'back'>('front');
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [streamId, setStreamId] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [rtcEngine, setRtcEngine] = useState<RtcEngine | null>(null);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
    // Get current user profile
    getCurrentUserProfile().then((user) => {
      if (user) {
        setUsername(user.username);
      }
    });
  }, [permission]);

  // Subscribe to active streams to update viewer count
  useEffect(() => {
    if (!isLive || !streamId) return;

    const unsubscribe = subscribeToActiveStreams((streams) => {
      const currentStream = streams.find((s) => s.streamId === streamId);
      if (currentStream) {
        setViewerCount(currentStream.viewers);
      }
    });

    return () => unsubscribe();
  }, [isLive, streamId]);

  const toggleCameraFacing = () => {
    setCameraFacing(prev => prev === 'front' ? 'back' : 'front');
  };

  const toggleMic = () => {
    setMicOn(!micOn);
  };

  const handleGoLive = async () => {
    if (!permission?.granted) {
      Alert.alert('Permission Required', 'Camera permission is required to go live');
      return;
    }

    if (!username) {
      Alert.alert('Error', 'Could not load username');
      return;
    }

    setLoading(true);
    try {
      // Initialize Agora
      const engine = new RtcEngine();
      await engine.initialize(AGORA_APP_ID);
      await engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
      await engine.setClientRole(ClientRole.Broadcaster);
      await engine.enableVideo();
      await engine.enableAudio();

      // Create stream in Firestore
      const newStreamId = await createLiveStream(username, 'Live Stream');
      
      // Get the channel ID from the stream
      const channelId = `channel_${username}_${Date.now()}`;
      
      // Join Agora channel
      await engine.joinChannel('', channelId, 0);

      setRtcEngine(engine);
      setStreamId(newStreamId);
      setIsLive(true);
      setViewerCount(1);

      Alert.alert('Success', 'You are now streaming! 🔴');
    } catch (error: any) {
      console.error('Error starting live:', error);
      Alert.alert('Error', error.message || 'Failed to start live stream');
    } finally {
      setLoading(false);
    }
  };

  const handleEndLive = async () => {
    Alert.alert('End Live', 'Are you sure you want to end the stream?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'End Stream',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoading(true);
            
            // Leave Agora channel
            if (rtcEngine) {
              await rtcEngine.leaveChannel();
              await rtcEngine.destroy();
              setRtcEngine(null);
            }

            // End stream in Firestore
            if (streamId) {
              await endLiveStream(streamId);
            }

            setIsLive(false);
            setStreamId(null);
            setViewerCount(0);
            router.back();
          } catch (error: any) {
            console.error('Error ending live:', error);
            Alert.alert('Error', error.message || 'Failed to end stream');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const handleInvite = async () => {
    try {
      await Share.share({
        message: `Join me live on Aura App! I'm streaming as @${username} 🔴 Live: ${username}`,
        title: 'Join My Live Stream',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Camera permission not granted</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={cameraFacing}
        mode="video">
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => !isLive && router.back()}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
          
          {isLive && (
            <View style={styles.liveIndicator}>
              <Text style={styles.liveText}>🔴 LIVE</Text>
            </View>
          )}
          
          {isLive && (
            <View style={styles.viewerCount}>
              <Text style={styles.viewerText}>👥 {viewerCount}</Text>
            </View>
          )}
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          {/* Mic Toggle */}
          <TouchableOpacity
            style={[styles.controlBtn, !micOn && styles.controlBtnOff]}
            onPress={toggleMic}
            disabled={loading}>
            <Text style={styles.controlBtnText}>{micOn ? '🎤' : '🔇'}</Text>
          </TouchableOpacity>

          {/* Camera Switch */}
          <TouchableOpacity
            style={styles.controlBtn}
            onPress={toggleCameraFacing}
            disabled={loading}>
            <Text style={styles.controlBtnText}>📷</Text>
          </TouchableOpacity>

          {/* Invite Button (when live) */}
          {isLive && (
            <TouchableOpacity
              style={styles.controlBtn}
              onPress={handleInvite}
              disabled={loading}>
              <Text style={styles.controlBtnText}>📤</Text>
            </TouchableOpacity>
          )}

          {/* Go Live / End Live Button */}
          <TouchableOpacity
            style={[styles.liveBtn, isLive && styles.liveBtnActive]}
            onPress={isLive ? handleEndLive : handleGoLive}
            disabled={loading}>
            <Text style={styles.liveBtnText}>
              {loading ? 'Loading...' : isLive ? 'END LIVE' : 'GO LIVE'}
            </Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  message: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    fontSize: 24,
    color: '#fff',
  },
  liveIndicator: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  viewerCount: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  viewerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  controlBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBtnOff: {
    backgroundColor: 'rgba(255, 0, 0, 0.4)',
  },
  controlBtnText: {
    fontSize: 28,
  },
  liveBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(139, 92, 246, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  liveBtnActive: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    borderColor: '#FF0000',
  },
  liveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});

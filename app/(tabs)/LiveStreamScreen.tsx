/**
 * ═══════════════════════════════════════════════════════════
 * LIVE STREAM SCREEN - CAMERA & STREAMING
 * ═══════════════════════════════════════════════════════════
 * 
 * 📹 CAMERA CONTROLS (Like TikTok):
 * ─────────────────────────────────────────────────────────
 * • 🎤 Mic Toggle: Turn microphone on/off
 * • 📷 Camera Switch: Switch between front (selfie) and back camera
 * • 🔴 GO LIVE / END LIVE: Start and stop streaming
 * 
 * DEFAULT: Front camera (selfie mode)
 * SWITCH: Tap 📷 button to switch to back camera
 * 
 * VIEWER COUNT: Updates in real-time while streaming
 * 
 * PERMISSIONS REQUIRED:
 * • Camera (expo-camera)
 * • Microphone (audio recording)
 * 
 * ═══════════════════════════════════════════════════════════
 */

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function LiveStreamScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [micOn, setMicOn] = useState(true);
  const [cameraFacing, setCameraFacing] = useState<'front' | 'back'>('front');
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  // Simulate viewer count increase when live
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const newCount = prev + Math.floor(Math.random() * 5);
        return newCount;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const toggleCameraFacing = () => {
    setCameraFacing(prev => prev === 'front' ? 'back' : 'front');
  };

  const toggleMic = () => {
    setMicOn(!micOn);
  };

  const handleGoLive = () => {
    if (!permission?.granted) {
      Alert.alert('Permission Required', 'Camera permission is required to go live');
      return;
    }

    setIsLive(true);
    setViewerCount(1);
    Alert.alert('Live', 'You are now streaming! 🔴', [
      { text: 'OK' }
    ]);
  };

  const handleEndLive = () => {
    Alert.alert('End Live', 'Are you sure you want to end the stream?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'End Stream',
        style: 'destructive',
        onPress: () => {
          setIsLive(false);
          setViewerCount(0);
          router.back();
        },
      },
    ]);
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
            onPress={toggleMic}>
            <Text style={styles.controlBtnText}>{micOn ? '🎤' : '🔇'}</Text>
          </TouchableOpacity>

          {/* Camera Switch */}
          <TouchableOpacity
            style={styles.controlBtn}
            onPress={toggleCameraFacing}>
            <Text style={styles.controlBtnText}>📷</Text>
          </TouchableOpacity>

          {/* Go Live / End Live Button */}
          <TouchableOpacity
            style={[styles.liveBtn, isLive && styles.liveBtnActive]}
            onPress={isLive ? handleEndLive : handleGoLive}>
            <Text style={styles.liveBtnText}>
              {isLive ? 'END LIVE' : 'GO LIVE'}
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

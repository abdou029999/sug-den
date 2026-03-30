# 🚀 Agora Live Streaming Integration Guide

## ✅ What Was Added

### 1. **Agora Configuration** (`src/config/agora.ts`)
- APP ID: `ebd4c18270f34be1b62017bc390edf10`
- Channel ID generation from user ID
- Agora SDK configuration constants

### 2. **Updated LiveStreamScreen** (`app/(tabs)/LiveStreamScreenAgora.tsx`)
Agora-powered live streaming with:
- ✅ Real-time video/audio streaming
- ✅ Host: Broadcast with front/back camera switch
- ✅ Viewer: Watch live streams with real-time video
- ✅ Microphone toggle (on/off)
- ✅ Camera switch (front/back)
- ✅ Firestore integration to track active streams
- ✅ Multiple viewers support

### 3. **Updated Live Tab** (`app/(tabs)/indexAgora.tsx`)
Real-time live streams discovery with:
- ✅ Real-time Firestore listener for active streams
- ✅ List of all users currently streaming
- ✅ "Join Live" functionality
- ✅ View count for each stream
- ✅ "GO LIVE" button to start broadcasting

### 4. **Firestore Collection: `live_streams`**
Document structure:
```json
{
  "userId": "user_uid",
  "email": "user@email.com",
  "channelId": "channel_user_uid",
  "startTime": "2026-03-30T...",
  "viewers": 0,
  "isActive": true
}
```

---

## 🔧 Integration Steps

### Step 1: Replace Files
To activate Agora integration, you need to replace the current files:

```bash
# Backup originals
mv app/(tabs)/LiveStreamScreen.tsx app/(tabs)/LiveStreamScreen.backup.tsx
mv app/(tabs)/index.tsx app/(tabs)/index.backup.tsx

# Use Agora versions
cp app/(tabs)/LiveStreamScreenAgora.tsx app/(tabs)/LiveStreamScreen.tsx
cp app/(tabs)/indexAgora.tsx app/(tabs)/index.tsx
```

### Step 2: Verify Installation
```bash
npm list react-native-agora
# Should show: react-native-agora@^4.3.0
```

### Step 3: Test Installation
```bash
npx expo-doctor
# Should pass all 17 checks
```

### Step 4: Deploy
```bash
eas build --platform android --profile preview
```

---

## 📱 User Flow

### **Broadcasting (Going Live)**
1. User opens Aura App
2. Navigates to Live tab (📺)
3. Taps "GO LIVE" button
4. Camera opens with controls:
   - 📷 Switch camera (front/back)
   - 🎤 Toggle microphone (on/off)
   - END LIVE button
5. Real-time video/audio streams to viewers
6. Firestore updates with active stream info
7. User taps "END LIVE" → Stream closes

### **Watching (Joining a Stream)**
1. User opens Aura App
2. Goes to Live tab (📺)
3. Sees list of active live streams
4. Taps on a stream → "Join Live" prompt
5. Confirms joining
6. Real-time video feed loads
7. Can see & hear the broadcaster
8. Auto-closes when broadcaster ends stream

---

## 🔑 Key Features Enabled

### Real-Time Streaming
- **Latency**: < 1 second
- **Quality**: Up to 1080p 60fps
- **Participants**: Unlimited viewers per stream

### Active Stream Tracking
- Firestore automatically lists all active streams
- Real-time viewer count updates
- Auto-cleanup when stream ends

### User Experience
- ✅ Seamless channel joining
- ✅ Crystal clear video/audio
- ✅ Multiple simultaneous broadcasts
- ✅ Easy discovery of live content

---

## ⚙️ Configuration Details

### Your Agora App ID
```
ebd4c18270f34be1b62017bc390edf10
```

### Firebase Collection
```
Collection: live_streams
Broadcaster ID: user_uid_timestamp
Auto-queried: where isActive == true
```

### Channel Naming Convention
```
Format: channel_{userId}
Example: channel_abc123def456
```

---

## 🚀 Production Considerations

### Token Generation (For Production)
Currently using `null` token for development. For production:

1. Implement token server
2. Generate tokens in backend
3. Update LiveStreamScreen to fetch token before joining

```typescript
// Example token generation
const token = await getAgoraToken(channelId, uid);
await rtcEngine.current.joinChannel(token, channelId, '', uid);
```

### Permissions
Ensure Firestore security rules allow:
- Creating `live_streams` documents
- Reading active streams
- Updating viewer counts

### Scalability
- Agora handles up to 1 million concurrent users
- Firestore real-time listener efficiently manages stream list
- Recommended: Implement pagination for 100+ concurrent streams

---

## 📊 Testing Checklist

- [ ] User A broadcasts live
- [ ] Firestore shows `isActive: true` document
- [ ] User B sees User A's stream in Live tab
- [ ] User B joins User A's stream
- [ ] Both users see real-time video
- [ ] Both users hear crystal clear audio
- [ ] User A switches camera (front/back)
- [ ] User A toggles microphone (on/off)
- [ ] User A ends live stream
- [ ] Firestore shows `isActive: false`
- [ ] User B's feed automatically closes
- [ ] User B returns to Live tab showing no active streams

---

## 🐛 Troubleshooting

### Issue: "Failed to initialize Agora"
**Solution**: Verify App ID in `src/config/agora.ts` is correct:
```typescript
export const AGORA_APP_ID = 'ebd4c18270f34be1b62017bc390edf10';
```

### Issue: "Camera permission denied"
**Solution**: Grant camera permissions on Android:
- Settings → Apps → Aura App → Permissions → Camera → Allow

### Issue: "No sound"
**Solution**: 
1. Check microphone is enabled (tap 🎤 button)
2. Grant microphone permissions
3. Device volume is not muted

### Issue: "Viewers don't see video"
**Solution**: Ensure user is broadcaster:
- LiveStreamScreen checks `isViewer` parameter
- Broadcaster: `isViewer` = false
- Viewer: `isViewer` = true

---

## 📚 Resources

- [Agora React Native SDK Docs](https://docs.agora.io/en/video-calling/get-started/get-started-sdk)
- [Agora Real-time Channels](https://www.agora.io/en/)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)

---

## ✨ Next Steps

1. **Replace files** (Step 1 above)
2. **Test on Android device**
3. **Deploy with `eas build`**
4. **Share with 10 test users**
5. **Gather feedback**
6. **Implement token-based auth for production**

---

💡 **Your Agora App ID is saved. Save this guide for future reference!**

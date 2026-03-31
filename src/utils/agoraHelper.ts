/**
 * Agora/Firestore Live Streaming Helper
 * ✅ INTERNET-BASED STREAMING (NOT LOCAL)
 * 
 * ARCHITECTURE:
 * ├── Firestore: Manages stream metadata & viewer tracking
 * └── Agora Cloud: Handles video/audio transmission (configured on backend)
 * 
 * WORKS OVER:
 * ✅ 4G/5G/WiFi (different networks)
 * ✅ Internet (cloud-based Agora)
 * ✅ Different phones & continents
 */

import { db, auth } from '../config/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

export interface LiveStream {
  streamId: string;
  userId: string;
  username: string;
  channelId: string;
  title: string;
  viewers: number;
  isActive: boolean;
  startedAt: Date;
  thumbnailURL?: string;
}

export interface Viewer {
  streamId: string;
  userId: string;
  username: string;
  joinedAt: Date;
}

/**
 * Create a new live stream in Firestore
 * + Creates Agora channel ID for backend to initialize
 */
export async function createLiveStream(
  username: string,
  title: string = 'Live Stream'
): Promise<string> {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error('User not authenticated');

    const channelId = `channel_${userId}_${Date.now()}`;

    const streamRef = await addDoc(collection(db, 'live_streams'), {
      userId,
      username,
      channelId, // Backend uses this to initialize Agora channel
      title,
      viewers: 0,
      isActive: true,
      startedAt: new Date(),
      thumbnailURL: null,
      createdAt: new Date(),
    });

    return streamRef.id;
  } catch (error) {
    console.error('Error creating live stream:', error);
    throw error;
  }
}

/**
 * End a live stream
 */
export async function endLiveStream(streamId: string): Promise<void> {
  try {
    const streamRef = doc(db, 'live_streams', streamId);
    await updateDoc(streamRef, {
      isActive: false,
      endedAt: new Date(),
    });

    // Remove all viewers for this stream
    const viewersRef = collection(db, 'live_viewers');
    const q = query(viewersRef, where('streamId', '==', streamId));

    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    });
  } catch (error) {
    console.error('Error ending live stream:', error);
    throw error;
  }
}

/**
 * Add a viewer to a live stream
 */
export async function addLiveViewer(
  streamId: string,
  username: string
): Promise<void> {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error('User not authenticated');

    await addDoc(collection(db, 'live_viewers'), {
      streamId,
      userId,
      username,
      joinedAt: new Date(),
    });

    // Update viewer count
    const streamRef = doc(db, 'live_streams', streamId);
    const streamDoc = await getDoc(streamRef);
    if (streamDoc.exists()) {
      await updateDoc(streamRef, {
        viewers: (streamDoc.data().viewers || 0) + 1,
      });
    }
  } catch (error) {
    console.error('Error adding viewer:', error);
    throw error;
  }
}

/**
 * Remove a viewer from a live stream
 */
export async function removeLiveViewer(
  streamId: string,
  viewerId: string
): Promise<void> {
  try {
    const viewersRef = collection(db, 'live_viewers');
    const q = query(
      viewersRef,
      where('streamId', '==', streamId),
      where('userId', '==', viewerId)
    );

    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    });

    // Update viewer count
    const streamRef = doc(db, 'live_streams', streamId);
    const streamDoc = await getDoc(streamRef);
    if (streamDoc.exists()) {
      const currentViewers = Math.max(
        0,
        (streamDoc.data().viewers || 1) - 1
      );
      await updateDoc(streamRef, {
        viewers: currentViewers,
      });
    }
  } catch (error) {
    console.error('Error removing viewer:', error);
    throw error;
  }
}

/**
 * Get all active live streams
 */
export function subscribeToActiveStreams(
  callback: (streams: LiveStream[]) => void
): () => void {
  try {
    const q = query(
      collection(db, 'live_streams'),
      where('isActive', '==', true)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const streams: LiveStream[] = snapshot.docs.map((doc) => ({
        streamId: doc.id,
        ...doc.data(),
      } as LiveStream));
      callback(streams);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error subscribing to active streams:', error);
    throw error;
  }
}

/**
 * Get viewers for a specific stream
 */
export function subscribeToStreamViewers(
  streamId: string,
  callback: (viewers: Viewer[]) => void
): () => void {
  try {
    const q = query(
      collection(db, 'live_viewers'),
      where('streamId', '==', streamId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const viewers: Viewer[] = snapshot.docs.map((doc) => ({
        ...doc.data(),
      } as Viewer));
      callback(viewers);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error subscribing to viewers:', error);
    throw error;
  }
}

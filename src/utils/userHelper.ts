/**
 * User Data Management Helper
 * Manages user profiles, followers, and user-related operations
 */

import { db, auth } from '../config/firebase';
import { collection, doc, getDoc, updateDoc, query, where, getDocs, onSnapshot } from 'firebase/firestore';

export interface User {
  uid: string;
  email: string;
  username: string;
  photoURL?: string;
  bio?: string;
  followers: number;
  following: number;
  livesCount: number;
  auraCoins: number;
  isBanned?: boolean;
  isAdmin?: boolean;
  lastActive?: Date;
  createdAt?: Date;
}

/**
 * Get current user profile
 */
export async function getCurrentUserProfile(): Promise<User | null> {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) return null;

    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return {
        uid: userId,
        ...userDoc.data() as Omit<User, 'uid'>,
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

/**
 * Subscribe to current user profile updates
 */
export function subscribeToCurrentUserProfile(callback: (user: User | null) => void): () => void {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      callback(null);
      return () => {};
    }

    const userRef = doc(db, 'users', userId);
    
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        callback({
          uid: userId,
          ...doc.data() as Omit<User, 'uid'>,
        });
      } else {
        callback(null);
      }
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error subscribing to user profile:', error);
    throw error;
  }
}

/**
 * Get user profile by ID
 */
export async function getUserProfile(userId: string): Promise<User | null> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return {
        uid: userId,
        ...userDoc.data() as Omit<User, 'uid'>,
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(updates: Partial<User>): Promise<void> {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error('User not authenticated');

    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, updates);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

/**
 * Search users by username
 */
export async function searchUsers(searchTerm: string, limit: number = 20): Promise<User[]> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef);
    
    const snapshot = await getDocs(q);
    const users: User[] = snapshot.docs
      .map((doc) => ({
        uid: doc.id,
        ...doc.data() as Omit<User, 'uid'>,
      }))
      .filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, limit);

    return users;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
}

/**
 * Follow a user
 */
export async function followUser(targetUserId: string): Promise<void> {
  try {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) throw new Error('User not authenticated');

    // Add follow relationship
    const followRef = collection(db, 'follows');
    const existingFollow = query(
      followRef,
      where('followerId', '==', currentUserId),
      where('followingId', '==', targetUserId)
    );
    
    const snapshot = await getDocs(existingFollow);
    if (snapshot.empty) {
      // Add follow
      await new Promise((resolve, reject) => {
        import('firebase/firestore').then(({ addDoc }) => {
          addDoc(followRef, {
            followerId: currentUserId,
            followingId: targetUserId,
            createdAt: new Date(),
          }).then(resolve).catch(reject);
        });
      });

      // Update counts
      const currentUserRef = doc(db, 'users', currentUserId);
      const targetUserRef = doc(db, 'users', targetUserId);
      
      const currentUserDoc = await getDoc(currentUserRef);
      const targetUserDoc = await getDoc(targetUserRef);
      
      if (currentUserDoc.exists() && targetUserDoc.exists()) {
        await updateDoc(currentUserRef, {
          following: (currentUserDoc.data().following || 0) + 1,
        });
        await updateDoc(targetUserRef, {
          followers: (targetUserDoc.data().followers || 0) + 1,
        });
      }
    }
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
}

/**
 * Unfollow a user
 */
export async function unfollowUser(targetUserId: string): Promise<void> {
  try {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) throw new Error('User not authenticated');

    // Remove follow relationship
    const followRef = collection(db, 'follows');
    const existingFollow = query(
      followRef,
      where('followerId', '==', currentUserId),
      where('followingId', '==', targetUserId)
    );
    
    const snapshot = await getDocs(existingFollow);
    if (!snapshot.empty) {
      await Promise.all(snapshot.docs.map((doc) => doc.ref.delete()));

      // Update counts
      const currentUserRef = doc(db, 'users', currentUserId);
      const targetUserRef = doc(db, 'users', targetUserId);
      
      const currentUserDoc = await getDoc(currentUserRef);
      const targetUserDoc = await getDoc(targetUserRef);
      
      if (currentUserDoc.exists() && targetUserDoc.exists()) {
        await updateDoc(currentUserRef, {
          following: Math.max(0, (currentUserDoc.data().following || 1) - 1),
        });
        await updateDoc(targetUserRef, {
          followers: Math.max(0, (targetUserDoc.data().followers || 1) - 1),
        });
      }
    }
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
}

/**
 * Get all users (for admin panel)
 */
export async function getAllUsers(): Promise<User[]> {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    
    return snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data() as Omit<User, 'uid'>,
    }));
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
}

/**
 * Ban a user (admin only)
 */
export async function banUser(userId: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      isBanned: true,
    });
  } catch (error) {
    console.error('Error banning user:', error);
    throw error;
  }
}

/**
 * Unban a user (admin only)
 */
export async function unbanUser(userId: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      isBanned: false,
    });
  } catch (error) {
    console.error('Error unbanning user:', error);
    throw error;
  }
}

/**
 * Add aura coins to user (admin only)
 */
export async function addAuraCoins(userId: string, amount: number): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      await updateDoc(userRef, {
        auraCoins: (userDoc.data().auraCoins || 0) + amount,
      });
    }
  } catch (error) {
    console.error('Error adding aura coins:', error);
    throw error;
  }
}

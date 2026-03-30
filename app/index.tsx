import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth } from '../src/config/firebase';

export default function RootIndex() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // User is logged in - redirect to tabs
        router.replace('/(tabs)');
      } else {
        // User is not logged in - redirect to auth
        router.replace('/(auth)/SignInScreen');
      }
    }
  }, [isLoading, user]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F0F0F' }}>
      <ActivityIndicator size="large" color="#8B5CF6" />
    </View>
  );
}

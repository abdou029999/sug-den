import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#0F0F0F',
          borderTopColor: '#1A1A1A',
        },
        headerStyle: {
          backgroundColor: '#0F0F0F',
        },
        headerTintColor: '#fff',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Live',
          headerShown: false,
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>📺</Text>,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          headerShown: false,
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>💬</Text>,
        }}
      />
      <Tabs.Screen
        name="auraflow"
        options={{
          title: 'AuraFlow',
          headerShown: false,
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🌊</Text>,
        }}
      />
      <Tabs.Screen
        name="aurafarm"
        options={{
          title: 'AuraFarm',
          headerShown: false,
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🎮</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}

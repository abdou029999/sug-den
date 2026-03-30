import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';

// ===== LIVE TAB =====
function HomeScreen() {
  const liveStreams = [
    { id: 1, username: 'Sarah_Live', viewers: 1243, aura: 150, avatar: '👩' },
    { id: 2, username: 'alex.streams', viewers: 892, aura: 120, avatar: '👨' },
    { id: 3, username: 'Luna_Gaming', viewers: 3421, aura: 280, avatar: '🎮' },
    { id: 4, username: 'DJ_Purple', viewers: 2156, aura: 200, avatar: '🎵' },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LIVE NOW</Text>
        <Pressable style={styles.goLiveBtn}>
          <Text style={styles.goLiveBtnText}>🎬 GO LIVE</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.streamGrid}>
        {liveStreams.map((stream) => (
          <Pressable key={stream.id} style={styles.streamCard}>
            <View style={styles.streamThumbnail}>
              <Text style={styles.streamAvatar}>{stream.avatar}</Text>
              <View style={styles.liveIndicator}>
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            </View>
            <View style={styles.streamInfo}>
              <Text style={styles.streamUsername}>{stream.username}</Text>
              <View style={styles.streamStats}>
                <Text style={styles.streamStat}>👥 {stream.viewers}</Text>
                <Text style={styles.streamStat}>✨ {stream.aura}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

// ===== MESSAGES TAB =====
function MessagesScreen() {
  const [msgTab, setMsgTab] = useState(0);
  
  const chats = [
    { id: 1, name: 'Sarah', message: 'Hey! How are you?', unread: 3, avatar: '👩' },
    { id: 2, name: 'Alex', message: 'Wanna go live?', unread: 1, avatar: '👨' },
    { id: 3, name: 'Luna', message: 'Check my new video!', unread: 0, avatar: '🎮' },
    { id: 4, name: 'Chris', message: 'Thanks for the gift!', unread: 2, avatar: '⭐' },
  ];

  const friendRequests = [
    { id: 1, name: 'NewFriend1', avatar: '🌟' },
    { id: 2, name: 'NewFriend2', avatar: '💫' },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.msgTabs}>
        <Pressable
          style={[styles.msgTab, msgTab === 0 && styles.msgTabActive]}
          onPress={() => setMsgTab(0)}
        >
          <Text style={[styles.msgTabText, msgTab === 0 && styles.msgTabTextActive]}>Chats</Text>
        </Pressable>
        <Pressable
          style={[styles.msgTab, msgTab === 1 && styles.msgTabActive]}
          onPress={() => setMsgTab(1)}
        >
          <Text style={[styles.msgTabText, msgTab === 1 && styles.msgTabTextActive]}>Requests</Text>
        </Pressable>
      </View>

      <ScrollView>
        {msgTab === 0 ? (
          <View>
            {chats.map((chat) => (
              <Pressable key={chat.id} style={styles.chatItem}>
                <Text style={styles.chatAvatar}>{chat.avatar}</Text>
                <View style={styles.chatDetails}>
                  <Text style={styles.chatName}>{chat.name}</Text>
                  <Text style={styles.chatMessage}>{chat.message}</Text>
                </View>
                {chat.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadBadgeText}>{chat.unread}</Text>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        ) : (
          <View>
            {friendRequests.map((req) => (
              <View key={req.id} style={styles.requestItem}>
                <Text style={styles.chatAvatar}>{req.avatar}</Text>
                <Text style={styles.chatName}>{req.name}</Text>
                <Pressable style={styles.acceptBtn}>
                  <Text style={styles.acceptBtnText}>Accept</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// ===== AURAFLOW TAB =====
function AuraFlowScreen() {
  const stories = [
    { id: 1, name: 'You', avatar: '😊' },
    { id: 2, name: 'Sarah', avatar: '👩' },
    { id: 3, name: 'Alex', avatar: '👨' },
    { id: 4, name: 'Luna', avatar: '🎮' },
  ];

  const feedPosts = [
    { id: 1, author: 'Sarah', avatar: '👩', content: 'Just went live! 🎬', likes: 234, comments: 12 },
    { id: 2, author: 'Luna', avatar: '🎮', content: 'New gaming setup ready 🖥️', likes: 456, comments: 28 },
    { id: 3, author: 'Alex', avatar: '👨', content: 'Aura farming tips 💡', likes: 189, comments: 43 },
  ];

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.storiesContainer}>
          {stories.map((story) => (
            <Pressable key={story.id} style={styles.storyCircle}>
              <Text style={styles.storyAvatar}>{story.avatar}</Text>
              <Text style={styles.storyName}>{story.name}</Text>
            </Pressable>
          ))}
        </View>

        {feedPosts.map((post) => (
          <View key={post.id} style={styles.feedPost}>
            <View style={styles.postHeader}>
              <Text style={styles.postAvatar}>{post.avatar}</Text>
              <View>
                <Text style={styles.postAuthor}>{post.author}</Text>
                <Text style={styles.postTime}>2h ago</Text>
              </View>
            </View>
            <Text style={styles.postContent}>{post.content}</Text>
            <View style={styles.postActions}>
              <Pressable style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>❤️ {post.likes}</Text>
              </Pressable>
              <Pressable style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>💬 {post.comments}</Text>
              </Pressable>
              <Pressable style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>✨ Send</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ===== AURAFARM TAB =====
function AuraFarmScreen() {
  const [auraBalance] = useState(2450);
  const [farmTab, setFarmTab] = useState(0);

  const quests = [
    { id: 1, name: 'Daily Login', progress: 100, reward: 50, completed: true },
    { id: 2, name: 'Watch Ads', progress: 75, reward: 100, completed: false },
    { id: 3, name: 'Send Gifts', progress: 40, reward: 150, completed: false },
  ];

  const packages = [
    { id: 1, amount: 500, price: '$2.99' },
    { id: 2, amount: 1200, price: '$5.99' },
    { id: 3, amount: 3000, price: '$12.99' },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.auraDisplay}>
        <Text style={styles.auraLabel}>Your Aura Balance</Text>
        <Text style={styles.auraAmount}>{auraBalance}</Text>
        <Text style={styles.auraSymbol}>✨</Text>
      </View>

      <View style={styles.farmTabs}>
        <Pressable
          style={[styles.farmTab, farmTab === 0 && styles.farmTabActive]}
          onPress={() => setFarmTab(0)}
        >
          <Text style={[styles.farmTabText, farmTab === 0 && styles.farmTabTextActive]}>Quests</Text>
        </Pressable>
        <Pressable
          style={[styles.farmTab, farmTab === 1 && styles.farmTabActive]}
          onPress={() => setFarmTab(1)}
        >
          <Text style={[styles.farmTabText, farmTab === 1 && styles.farmTabTextActive]}>Shop</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.farmContent}>
        {farmTab === 0 ? (
          <View>
            {quests.map((quest) => (
              <View key={quest.id} style={styles.questItem}>
                <View>
                  <Text style={styles.questName}>{quest.name}</Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${quest.progress}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.questReward}>+{quest.reward} ✨</Text>
                </View>
                {quest.completed ? (
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedText}>✓</Text>
                  </View>
                ) : (
                  <Pressable style={styles.claimBtn}>
                    <Text style={styles.claimBtnText}>Claim</Text>
                  </Pressable>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View>
            {packages.map((pkg) => (
              <Pressable key={pkg.id} style={styles.packageItem}>
                <View>
                  <Text style={styles.packageAmount}>{pkg.amount} ✨</Text>
                  <Text style={styles.packageBonus}>(+5% bonus)</Text>
                </View>
                <Text style={styles.packagePrice}>{pkg.price}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// ===== PROFILE TAB =====
function ProfileScreen() {
  const [tapCount, setTapCount] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [colorTab, setColorTab] = useState(0);

  const colors = ['Purple', 'Blue', 'Pink', 'Green'];
  const frames = ['Classic', 'Gold', 'Diamond', 'Dragon'];

  const handleProfileTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount === 5) {
      setShowAdmin(true);
      setTapCount(0);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <Pressable onPress={handleProfileTap}>
            <View style={styles.profilePicContainer}>
              <Text style={styles.profilePic}>👤</Text>
              <View style={styles.profileRing} />
            </View>
          </Pressable>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>1,234</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>567</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statLabel}>Lives</Text>
            </View>
          </View>
        </View>

        {showAdmin && (
          <View style={styles.adminPanel}>
            <Text style={styles.adminTitle}>⚙️ ADMIN ACCESS</Text>
            <Pressable style={styles.adminBtn}>
              <Text style={styles.adminBtnText}>Manage Users</Text>
            </Pressable>
            <Pressable style={styles.adminBtn}>
              <Text style={styles.adminBtnText}>View Analytics</Text>
            </Pressable>
            <Pressable style={styles.adminBtn}>
              <Text style={styles.adminBtnText}>System Settings</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.customizeSection}>
          <Text style={styles.sectionTitle}>🎨 Colors</Text>
          <View style={styles.optionsGrid}>
            {colors.map((color, idx) => (
              <Pressable
                key={idx}
                style={[styles.optionItem, colorTab === idx && styles.optionItemActive]}
                onPress={() => setColorTab(idx)}
              >
                <Text style={styles.optionText}>{color}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.customizeSection}>
          <Text style={styles.sectionTitle}>🖼️ Frames</Text>
          <View style={styles.optionsGrid}>
            {frames.map((frame, idx) => (
              <Pressable key={idx} style={styles.optionItem}>
                <Text style={styles.optionText}>{frame}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable style={styles.settingsBtn}>
          <Text style={styles.settingsBtnText}>⚙️ Settings</Text>
        </Pressable>

        <Pressable style={styles.logoutBtn}>
          <Text style={styles.logoutBtnText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Live', screen: <HomeScreen /> },
    { name: 'Messages', screen: <MessagesScreen /> },
    { name: 'AuraFlow', screen: <AuraFlowScreen /> },
    { name: 'AuraFarm', screen: <AuraFarmScreen /> },
    { name: 'Profile', screen: <ProfileScreen /> },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {tabs[activeTab].screen}
      </View>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <Pressable
            key={tab.name}
            style={[
              styles.tabButton,
              activeTab === index && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab(index)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === index && styles.tabTextActive,
              ]}
            >
              {tab.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  content: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },

  // ===== LIVE TAB STYLES =====
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1F1F1F',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  goLiveBtn: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  goLiveBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  streamGrid: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  streamCard: {
    marginBottom: 12,
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  streamThumbnail: {
    width: 100,
    height: 100,
    backgroundColor: '#2F2F2F',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  streamAvatar: {
    fontSize: 48,
  },
  liveIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  streamInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  streamUsername: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  streamStats: {
    flexDirection: 'row',
    gap: 12,
  },
  streamStat: {
    color: '#9CA3AF',
    fontSize: 12,
  },

  // ===== MESSAGES TAB STYLES =====
  msgTabs: {
    flexDirection: 'row',
    backgroundColor: '#1F1F1F',
    borderBottomWidth: 1,
    borderBottomColor: '#2F2F2F',
  },
  msgTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  msgTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#8B5CF6',
  },
  msgTabText: {
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
  msgTabTextActive: {
    color: '#8B5CF6',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  chatAvatar: {
    fontSize: 36,
    marginRight: 12,
  },
  chatDetails: {
    flex: 1,
  },
  chatName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  chatMessage: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
  },
  unreadBadge: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadgeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  acceptBtn: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  acceptBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  // ===== AURAFLOW TAB STYLES =====
  storiesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
    gap: 12,
  },
  storyCircle: {
    alignItems: 'center',
    gap: 4,
  },
  storyAvatar: {
    fontSize: 36,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2F2F2F',
    textAlign: 'center',
    lineHeight: 56,
  },
  storyName: {
    color: '#9CA3AF',
    fontSize: 10,
    width: 56,
    textAlign: 'center',
  },
  feedPost: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  postAuthor: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  postTime: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  postContent: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: '#1F1F1F',
    borderRadius: 6,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // ===== AURAFARM TAB STYLES =====
  auraDisplay: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#1F1F1F',
    marginBottom: 12,
  },
  auraLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 8,
  },
  auraAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  auraSymbol: {
    fontSize: 32,
    marginTop: 4,
  },
  farmTabs: {
    flexDirection: 'row',
    backgroundColor: '#1F1F1F',
    borderBottomWidth: 1,
    borderBottomColor: '#2F2F2F',
  },
  farmTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  farmTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#8B5CF6',
  },
  farmTabText: {
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
  farmTabTextActive: {
    color: '#8B5CF6',
  },
  farmContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  questItem: {
    backgroundColor: '#1F1F1F',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  progressBar: {
    width: 200,
    height: 6,
    backgroundColor: '#2F2F2F',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
  },
  questReward: {
    color: '#8B5CF6',
    fontWeight: 'bold',
    fontSize: 12,
  },
  claimBtn: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  claimBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  completedBadge: {
    backgroundColor: '#10B981',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  packageItem: {
    backgroundColor: '#1F1F1F',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  packageAmount: {
    color: '#8B5CF6',
    fontWeight: 'bold',
    fontSize: 18,
  },
  packageBonus: {
    color: '#9CA3AF',
    fontSize: 10,
  },
  packagePrice: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // ===== PROFILE TAB STYLES =====
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#1F1F1F',
    marginBottom: 12,
  },
  profilePicContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profilePic: {
    fontSize: 72,
  },
  profileRing: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 3,
    borderColor: '#8B5CF6',
    borderRadius: 50,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#8B5CF6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
  },
  adminPanel: {
    backgroundColor: '#1F1F1F',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    padding: 16,
  },
  adminTitle: {
    color: '#8B5CF6',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  adminBtn: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 8,
    alignItems: 'center',
  },
  adminBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  customizeSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  optionItem: {
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2F2F2F',
  },
  optionItemActive: {
    borderColor: '#8B5CF6',
    backgroundColor: '#2F2F2F',
  },
  optionText: {
    color: '#9CA3AF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  settingsBtn: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#1F1F1F',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2F2F2F',
  },
  settingsBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  logoutBtn: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  logoutBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  // ===== TAB BAR STYLES =====
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#0F0F0F',
    borderTopWidth: 1,
    borderTopColor: '#1F1F1F',
    height: 80,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#1F1F1F',
  },
  tabText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: '#8B5CF6',
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ads = [
  { id: '1', title: 'Watch Ad', reward: 100, platform: 'YouTube' },
  { id: '2', title: 'Watch Ad', reward: 100, platform: 'YouTube' },
  { id: '3', title: 'Watch Ad', reward: 100, platform: 'TikTok' },
];

const quests = [
  { id: '1', title: 'Watch 3 lives', progress: 80, reward: 50 },
  { id: '2', title: 'Send 5 gifts', progress: 60, reward: 100 },
  { id: '3', title: 'Complete profile', progress: 100, reward: 200 },
];

const auraPackages = [
  { id: '1', aura: 500, price: '$0.99', bonus: 50 },
  { id: '2', aura: 1200, price: '$1.99', bonus: 120 },
  { id: '3', aura: 3000, price: '$4.99', bonus: 300 },
];

export default function AuraFarmScreen() {
  const [auraBalance, setAuraBalance] = useState(4820);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Aura Balance */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Your Aura</Text>
          <Text style={styles.balanceAmount}>{auraBalance.toLocaleString()}</Text>
          <View style={styles.auraOrb}>
            <Ionicons name="sparkles" size={60} color="#8B5CF6" />
          </View>
        </View>

        {/* Watch Ads */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Watch Ads</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ads.map((ad) => (
              <TouchableOpacity key={ad.id} style={styles.adCard}>
                <View style={styles.adPlatform}>
                  <Ionicons name="play-circle" size={32} color="#FFFFFF" />
                </View>
                <Text style={styles.adTitle}>{ad.title}</Text>
                <Text style={styles.adReward}>+{ad.reward} Aura</Text>
                <TouchableOpacity style={styles.watchButton}>
                  <Text style={styles.watchButtonText}>Watch</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Daily Quests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Quests</Text>
          {quests.map((quest) => (
            <View key={quest.id} style={styles.questCard}>
              <View style={styles.questInfo}>
                <Ionicons name="diamond" size={20} color="#8B5CF6" />
                <Text style={styles.questTitle}>{quest.title}</Text>
              </View>
              <View style={styles.questProgress}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${quest.progress}%` }]} />
                </View>
                <Text style={styles.progressText}>{quest.progress}%</Text>
              </View>
              <TouchableOpacity style={styles.claimButton}>
                <Text style={styles.claimButtonText}>Claim</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Buy Aura */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Buy Aura</Text>
          <View style={styles.packagesContainer}>
            {auraPackages.map((pkg) => (
              <TouchableOpacity key={pkg.id} style={styles.packageCard}>
                <Text style={styles.packageAura}>{pkg.aura}</Text>
                <Text style={styles.packageLabel}>Aura</Text>
                <Text style={styles.packagePrice}>{pkg.price}</Text>
                <Text style={styles.packageBonus}>+{pkg.bonus} Bonus</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  scrollView: {
    flex: 1,
  },
  balanceCard: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#1F1F1F',
    marginBottom: 16,
  },
  balanceTitle: {
    color: '#9CA3AF',
    fontSize: 16,
    marginBottom: 8,
  },
  balanceAmount: {
    color: '#8B5CF6',
    fontSize: 48,
    fontWeight: 'bold',
    textShadowColor: '#8B5CF6',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  auraOrb: {
    marginTop: 20,
    opacity: 0.8,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  adCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 140,
    alignItems: 'center',
  },
  adPlatform: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  adTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  adReward: {
    color: '#8B5CF6',
    fontSize: 12,
    marginBottom: 8,
  },
  watchButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  watchButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  questCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  questInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  questTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
  },
  questProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
  },
  progressText: {
    color: '#9CA3AF',
    fontSize: 12,
    width: 35,
  },
  claimButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  claimButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  packagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  packageCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 20,
    width: '31%',
    alignItems: 'center',
    marginBottom: 12,
  },
  packageAura: {
    color: '#8B5CF6',
    fontSize: 24,
    fontWeight: 'bold',
  },
  packageLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 8,
  },
  packagePrice: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  packageBonus: {
    color: '#8B5CF6',
    fontSize: 11,
  },
});

// Agora App Configuration
export const AGORA_APP_ID = 'ebd4c18270f34be1b62017bc390edf10';

// Channel name generation
export const generateChannelId = (userId: string): string => {
  return `channel_${userId}`;
};

// Agora configuration constants
export const AGORA_CONFIG = {
  appId: AGORA_APP_ID,
  channelProfile: 1, // 1 = Communication, 2 = LiveBroadcasting
  clientRole: 1, // 1 = Audience, 2 = Broadcaster
  audioProfile: 1, // High quality audio
  videoProfile: 66, // HD video
};

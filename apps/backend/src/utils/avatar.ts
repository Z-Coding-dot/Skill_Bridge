export const getAvatarUrl = (avatar: string | null | undefined): string => {
  const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';
  
  if (!avatar) return defaultAvatar;
  if (avatar.startsWith('http')) return avatar; 
  
  return avatar;
};
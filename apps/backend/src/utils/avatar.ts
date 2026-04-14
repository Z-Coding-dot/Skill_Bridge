/**
 * Resolves the correct avatar URL regardless of environment.
 * Handles: Cloudinary URLs, local relative paths, and "Frankenstein" double-URLs.
 */
export const getAvatarUrl = (avatar: string | null | undefined): string => {
  const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';
  
  // 1. Safety check for null/undefined
  if (!avatar || typeof avatar !== 'string' || avatar.trim() === '') {
    return defaultAvatar;
  }

  // 2. Fix "Double URL" issue (e.g., http://localhost:3000https://res.cloudinary...)
  // This happens if the backend prepends a base URL to an already full Cloudinary link.
  if (avatar.includes('http') && avatar.includes('res.cloudinary.com')) {
    const cloudinaryIndex = avatar.lastIndexOf('https://res.cloudinary.com');
    if (cloudinaryIndex !== -1) {
      return avatar.substring(cloudinaryIndex);
    }
  }

  // 3. If it's already a clean full URL, return it
  if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
    return avatar;
  }

  // 4. Handle relative paths (for local file uploads if not using Cloudinary)
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // If no base URL is defined (local dev fallback), use a default or just the path
  if (!baseUrl) {
    return avatar.startsWith('/') ? avatar : `/${avatar}`;
  }

  // 5. Cleanly join the Base URL and the Path
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = avatar.startsWith('/') ? avatar : `/${avatar}`;

  return `${cleanBase}${cleanPath}`;
};

// Simple browser fingerprint generator
export const generateFingerprint = () => {
  const { userAgent, language, platform } = navigator;
  const { colorDepth, pixelDepth } = window.screen;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  const fingerprintString = `${userAgent}${language}${platform}${colorDepth}${pixelDepth}${timezone}`;
  return btoa(fingerprintString);
};
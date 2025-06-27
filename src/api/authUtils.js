// export const decodeJWT = (token) => {
//   try {
//     return JSON.parse(atob(token.split('.')[1]));
//   } catch {
//     return null;
//   }
// };

// export const isTokenExpired = (token) => {
//   const decoded = decodeJWT(token);
//   if (!decoded || !decoded.exp) return true;
//   return Math.floor(Date.now() / 1000) >= decoded.exp;
// };
 

export const decodeJWT = (token) => {
  // Validate input
  if (!token || typeof token !== 'string') {
    return null;
  }
  
  const parts = token.split('.');
  if (parts.length !== 3) {
    return null;
  }
  
  try {
    // Decode the payload (second part)
    const payload = parts[1];
    // Add padding if needed for base64 decoding
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    return JSON.parse(atob(paddedPayload));
  } catch (error) {
    console.warn('Failed to decode JWT:', error.message);
    return null;
  }
};

export const isTokenExpired = (token) => {
  const decoded = decodeJWT(token);
  
  // If decoding failed or no expiration claim, consider expired
  if (!decoded || !decoded.exp) {
    return true;
  }
  
  // Check if current time is past expiration (with small buffer for clock skew)
  const now = Math.floor(Date.now() / 1000);
  const bufferSeconds = 30; // 30 second buffer
  
  return now >= (decoded.exp - bufferSeconds);
};

// Optional: Helper to get time until expiration
export const getTokenTimeToExpiry = (token) => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return 0;
  
  const now = Math.floor(Date.now() / 1000);
  return Math.max(0, decoded.exp - now);
};
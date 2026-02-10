// SHA-256 hash using Web Crypto API
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

// Hash of "kartikandaashiforever" using SHA-256
export const CORRECT_PASSWORD_HASH = '0c43148c3bb737c1aba39e948e697ade9801e8854d971b92b99f8fadd4065de3';

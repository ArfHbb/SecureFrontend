// Simple auth util
export function isLoggedIn() {
  const token = localStorage.getItem('token');
  const loginTime = localStorage.getItem('login_time');
  if (!token || !loginTime) return false;
  const now = Date.now();
  const maxSessionMs = 8 * 60 * 60 * 1000; // 8 jam
  if (now - parseInt(loginTime, 10) > maxSessionMs) {
    // Hapus token dan waktu login jika expired
    localStorage.removeItem('token');
    localStorage.removeItem('login_time');
    return false;
  }
  return true;
}

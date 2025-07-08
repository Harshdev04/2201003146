import axios from 'axios';

let accessToken = ''; // Set your token here from registration step

export function setAccessToken(token) {
  accessToken = token;
}

export async function logEvent(stack, level, packageName, message) {
  if (!accessToken) {
    console.error('❌ Log failed: accessToken is not defined');
    return;
  }

  try {
    await axios.post(
      '/logs',
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log('✅ Log sent:', message);
  } catch (err) {
    console.error('❌ Log failed:', err.message);
  }
}

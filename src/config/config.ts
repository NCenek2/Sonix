// config.ts
export default () => ({
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  COOKIE_KEY: process.env.COOKIE_KEY,
  CALLBACK_URL: process.env.CALLBACK_URL,
});

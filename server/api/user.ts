/**
 * API endpoint that returns current user info and their visible item IDs
 */
export default defineEventHandler(async () => {
  // Simulate a delay like a real API call
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Current user info
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    itemCardType: '1',
    level: 42,
    isPremium: Math.random() > 0.5,
  };

  return {
    user,
    timestamp: new Date().toISOString(),
  };
});

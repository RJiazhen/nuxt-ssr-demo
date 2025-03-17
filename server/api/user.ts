/**
 * API endpoint that returns current user info and item card type
 */
export default defineEventHandler(async () => {
  return {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    itemCardType: Math.random() > 0.5 ? '1' : '2',
  };
});

/**
 * API endpoint that returns premium member information
 */
export default defineEventHandler(async () => {
  // Simulate a delay like a real API call
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Generate random premium member data
  const premiumMember = {
    level: Math.floor(Math.random() * 50) + 1,
    premiumStartDate: new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
    ).toISOString(), // Random date within last year
    premiumEndDate: new Date(
      Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000,
    ).toISOString(), // Random date within next year
    premiumFeatures: [
      'Unlimited Access',
      'Priority Support',
      'Exclusive Content',
      'Ad-Free Experience',
      'Early Access to New Features',
      'Premium Customer Service',
    ],
    membershipStatus: 'active',
    totalSavings: Math.floor(Math.random() * 1000),
    nextReward: Math.floor(Math.random() * 100) + 50,
  };

  return {
    premiumMember,
    timestamp: new Date().toISOString(),
  };
});

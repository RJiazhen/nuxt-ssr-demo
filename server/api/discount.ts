/**
 * API endpoint that returns member discount information
 */
export default defineEventHandler(async () => {
  // Simulate a delay like a real API call
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Generate random discount data
  const discount = {
    originalPrice: 99.99,
    discountPercentage: 20,
    startDate: new Date().toISOString(),
    endDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      Math.floor(Math.random() * 28) + 1,
    ).toISOString(),
    features: [
      'Unlimited Access',
      'Priority Support',
      'Exclusive Content',
      'Ad-Free Experience',
    ],
    terms: [
      'Offer valid until end of month',
      'One-time purchase',
      'Cancel anytime',
      '30-day money-back guarantee',
    ],
  };

  return {
    discount,
    timestamp: new Date().toISOString(),
  };
});

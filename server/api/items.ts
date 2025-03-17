/**
 * a api that returns a large list of items after 1 second
 */
export default defineEventHandler(async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Generate a large list of items (100 items)
  const items = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    title: `Item ${index + 1}`,
    description: `This is a description for item ${index + 1}`,
    createdAt: new Date().toISOString(),
    category: ['Category A', 'Category B', 'Category C'][
      Math.floor(Math.random() * 3)
    ],
  }));

  return {
    items,
    total: items.length,
    timestamp: new Date().toISOString(),
  };
});

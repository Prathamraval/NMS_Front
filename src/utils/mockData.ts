import { format, subDays, subMonths, subYears } from 'date-fns';

export const generateMockData = () => {
  // Generate mock stats
  const stats = {
    revenue: 128745,
    revenueChange: 12.3,
    users: 12583,
    usersChange: 8.1,
    conversionRate: 3.2,
    conversionRateChange: -0.5,
    orders: 1482,
    ordersChange: 4.2,
  };

  // Generate revenue data (365 days)
  const revenueData = Array.from({ length: 365 }, (_, i) => {
    const date = format(subDays(new Date(), 364 - i), 'MMM d');
    // Base value with some randomization and an overall upward trend
    const baseValue = 1000 + (i * 5);
    const randomFactor = Math.random() * 200 - 100;
    // Add some seasonal patterns
    const seasonalFactor = Math.sin(i / 30) * 200;
    // Add weekly patterns (weekends have higher values)
    const dayOfWeek = new Date().getDay();
    const weekendBoost = (dayOfWeek === 0 || dayOfWeek === 6) ? 100 : 0;
    
    return {
      date,
      value: Math.round(baseValue + randomFactor + seasonalFactor + weekendBoost),
    };
  });

  // Generate user data (365 days)
  const userData = Array.from({ length: 365 }, (_, i) => {
    const date = format(subDays(new Date(), 364 - i), 'MMM d');
    // Base value with some randomization and an overall upward trend
    const baseValue = 100 + (i * 0.5);
    const randomFactor = Math.random() * 20 - 10;
    
    return {
      date,
      value: Math.round(baseValue + randomFactor),
    };
  });

  // Category data
  const categoryData = [
    { name: 'Electronics', value: 42500 },
    { name: 'Clothing', value: 24300 },
    { name: 'Home & Garden', value: 18200 },
    { name: 'Sports', value: 15400 },
    { name: 'Beauty', value: 12800 },
    { name: 'Toys', value: 9600 },
    { name: 'Books', value: 8700 },
    { name: 'Food', value: 7200 },
  ];

  // Product data
  const productData = [
    { name: 'Smartphone X Pro', value: 12450 },
    { name: 'Wireless Earbuds', value: 8730 },
    { name: 'Ultra HD TV 55"', value: 7840 },
    { name: 'Fitness Tracker', value: 6520 },
    { name: 'Smart Watch S3', value: 5430 },
    { name: 'Laptop Pro 15"', value: 4980 },
    { name: 'Bluetooth Speaker', value: 4320 },
    { name: 'Gaming Console', value: 3760 },
  ];

  // Traffic sources
  const trafficData = [
    { name: 'Organic Search', value: 42 },
    { name: 'Direct', value: 28 },
    { name: 'Social Media', value: 16 },
    { name: 'Referral', value: 10 },
    { name: 'Paid Search', value: 4 },
  ];

  return {
    stats,
    revenueData,
    userData,
    categoryData,
    productData,
    trafficData,
  };
};
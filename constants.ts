
import { InventoryItem, ExpiryStatus } from './types';

export const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: '1',
    name: 'Organic Tomatoes',
    category: 'Vegetables',
    quantity: '500g',
    addedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: ExpiryStatus.EXPIRING_SOON
  },
  {
    id: '2',
    name: 'Whole Milk',
    category: 'Dairy',
    quantity: '1L',
    addedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: ExpiryStatus.FRESH
  },
  {
    id: '3',
    name: 'Baby Spinach',
    category: 'Vegetables',
    quantity: '250g',
    addedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: ExpiryStatus.EXPIRED
  },
  {
    id: '4',
    name: 'Chicken Breast',
    category: 'Meat',
    quantity: '1kg',
    addedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: ExpiryStatus.EXPIRING_SOON
  },
  {
    id: '5',
    name: 'Greek Yogurt',
    category: 'Dairy',
    quantity: '500ml',
    addedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: ExpiryStatus.FRESH
  },
  {
    id: '6',
    name: 'Red Onions',
    category: 'Vegetables',
    quantity: '2kg',
    addedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    status: ExpiryStatus.FRESH
  },
  {
    id: '7',
    name: 'Avocados',
    category: 'Fruits',
    quantity: '3 units',
    addedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: ExpiryStatus.EXPIRING_SOON
  },
  {
    id: '8',
    name: 'Basmati Rice',
    category: 'Grains',
    quantity: '5kg',
    addedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000).toISOString(),
    status: ExpiryStatus.FRESH
  },
  {
    id: '9',
    name: 'Strawberries',
    category: 'Fruits',
    quantity: '400g',
    addedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: ExpiryStatus.EXPIRED
  }
];

export const SUSTAINABILITY_METRICS = [
  { name: 'Week 1', wasted: 4.2, saved: 12.5 },
  { name: 'Week 2', wasted: 3.8, saved: 15.2 },
  { name: 'Week 3', wasted: 2.1, saved: 18.1 },
  { name: 'Week 4', wasted: 1.5, saved: 22.2 },
  { name: 'Week 5', wasted: 0.8, saved: 25.8 },
  { name: 'Week 6', wasted: 0.4, saved: 29.5 },
  { name: 'Week 7', wasted: 0.2, saved: 32.0 },
];

export const CATEGORIES = ['Vegetables', 'Fruits', 'Dairy', 'Meat', 'Grains', 'Spices', 'Other'];

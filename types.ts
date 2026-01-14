
export enum ExpiryStatus {
  FRESH = 'Fresh',
  EXPIRING_SOON = 'Expiring Soon',
  EXPIRED = 'Expired'
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  addedAt: string;
  expiryDate: string;
  status: ExpiryStatus;
}

export interface Recipe {
  title: string;
  ingredientsUsed: string[];
  missingIngredients: string[];
  instructions: string[];
  sustainabilityScore: number;
}

export interface AnalyticsData {
  name: string;
  value: number;
}

export interface VisionInferenceResult {
  items: Array<{
    name: string;
    quantity: string;
    category: string;
    confidence: number;
  }>;
}

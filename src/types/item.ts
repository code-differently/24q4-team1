export type Item = {
  id: number;
  title: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  stock: number;
  rating?: number;
  discountPercentage?: number;
  brand?: string;
  sku?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  reviews?: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  images?: string[];
};

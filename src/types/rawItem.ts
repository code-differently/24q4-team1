export type RawItem = {
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
  reviews?: string;
  images?: string;
};

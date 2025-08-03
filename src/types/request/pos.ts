export type CreateProduct = {
  name: string;
  description: string;
  price: number | string;
  vat: number | string;
  category: string;
  image_url: string;
  is_service: string | boolean;
};

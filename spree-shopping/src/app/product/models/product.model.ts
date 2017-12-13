/*
 * Product model
 */

import { OptionType } from './option-type.model';
import { Classification } from './classification.model';
import { ProductProperty } from './product-property.model';
import { Variant } from './variant.model';

export class Product {
  id: number;
  name: string;
  description: string;
  price: string;
  display_price: string;
  available_on: string;
  slug: string;
  meta_description: string;
  meta_keywords: string;
  shipping_category_id: number;
  taxon_ids: number[];
  total_on_hand: number;
  has_variants: boolean;
  master: Variant;
  variants: Variant[];
  option_types: OptionType[];
  product_properties: ProductProperty[];
  classifications: Classification[];
}

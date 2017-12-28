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
  displayPrice: string;
  availableOn: string;
  slug: string;
  metaDescription: string;
  metaKeywords: string;
  shippingCategoryId: number;
  taxonIds: number[];
  totalOnHand: number;
  hasVariants: boolean;
  master: Variant;
  variants: Variant[];
  optionTypes: OptionType[];
  productProperties: ProductProperty[];
  classifications: Classification[];
}

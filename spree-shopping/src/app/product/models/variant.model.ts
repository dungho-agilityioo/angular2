import { Image } from './image.model';
import { OptionValue } from './option-value.model';
/*
 * Variant model
 */

export class Variant {
  id: number;
  name: string;
  sku: string;
  price: string;
  weight: string;
  height: string;
  width: string;
  depth: string;
  isMaster: boolean;
  slug: string;
  description: string;
  trackInventory: boolean;
  costPrice: string;
  optionValues: OptionValue[];
  totalOnHand: number;
  displayPrice: string;
  optionsText: string;
  inStock: boolean;
  isBackorderable: boolean;
  isDestroyed: boolean;
  images: Image[];
}

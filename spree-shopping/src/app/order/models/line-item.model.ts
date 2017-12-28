import { Variant } from 'app/product/models/variant.model';
/*
 * LineItem model
 */

export class LineItem {
  id: number;
  quantity: number;
  price: number;
  singleDisplayAmount: number;
  total: number;
  displayAmount: number;
  variantId: number;
  variant: Variant;
}

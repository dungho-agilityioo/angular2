import { LineItem } from './line-item.model';
export interface Order {
    number: string;
    item_total?: number;
    total?: number;
    ship_total?: number;
    state?: string;
    adjustment_total?: number;
    user_id?: number;
    payment_total?: number;
    shipment_state?: string;
    payment_state?: string;
    email?: string;
    special_instructions?: string;
    included_tax_total?: number;
    additional_tax_total?: number;
    display_included_tax_total?: string;
    display_additional_tax_total?: string;
    tax_total?: number;
    considered_risky?: false;
    canceler_id?: number;
    display_item_total?: string;
    total_quantity?: number;
    display_total?: string;
    display_ship_total?: string;
    display_tax_total?: string;
    display_adjustment_total?: string;
    token?: string;
    bill_address?: null;
    ship_address?: null;
    line_items?: LineItem;
  }

export interface Order {
  number: string;
  total?: number;
  item_total?: number;
  user_id?: number;
  token: string;
}

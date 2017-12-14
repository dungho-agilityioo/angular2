import { Order } from "app/order/models/order.model";

export class LocalStorageService {
  private orderKey: String = 'order';

  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  /**
   * Get token and number of order from local storage
   * @return string
   */
  getOrder(): Order {
    const order = this.getItem(this.orderKey);

    return order;
  }

  /**
   * Set token and number of order on local storage
   * @param string
   */
  setOrder(order: Order): void {
    this.setItem(this.orderKey, { token: order.token, number: order.number });
  }
}

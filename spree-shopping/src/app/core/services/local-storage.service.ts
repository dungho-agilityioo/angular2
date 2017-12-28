import { Order } from 'app/order/models/order.model';
import { User } from 'app/user/models/user.model';

export class LocalStorageService {
  private orderKey: string = 'order';
  private userKey: string = 'user';

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

  /**
   * Remove order caching
   */
  removeOrder() {
    localStorage.removeItem(this.orderKey);
  }

  /**
   * Caching user in local storage
   * @param user
   */
  setUser(user: User) {
    this.setItem( this.userKey, user);
  }

  /**
   * Get user api key
   */
  getUserApiKey() {
    const user: User = this.getItem(this.userKey);

    return user ? user.spreeApiKey : null;
  }

  getUser() {
    const user: User = this.getItem(this.userKey);

    return user || { id: null, email: null};
  }

  /**
   * Remove user caching
   */
  removeUser() {
    localStorage.removeItem(this.userKey);
  }

}

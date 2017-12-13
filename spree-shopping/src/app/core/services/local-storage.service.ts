export class LocalStorageService {
  private user = 'user';
  private orderNumberKey = 'order.number';
  private orderTokenKey  = 'order.token';

  setItem(key, value) {
    localStorage.setItem(`${key}`, JSON.stringify(value));
  }

  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  /**
   * Get order number from local storage
   * @return string
   */
  getOrderNumber() {
    const orderNumber = this.getItem(this.orderNumberKey);
    return orderNumber;
  }

  /**
   * Get order token from local storage
   * @return string
   */
  getOrderToken(): string {
    const orderToken = this.getItem(this.orderTokenKey);

    return orderToken;
  }

  /**
   * Set order token on local storage
   * @param string
   */
  setOrderToken(token: string): void {
    this.setItem(this.orderTokenKey, token);
  }

  /**
   * Set order number on local storage
   * @param number
   */
  setOrderNumber(number: string): void {
    this.setItem(this.orderNumberKey, number);
  }
}

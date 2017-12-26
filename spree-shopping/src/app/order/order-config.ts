export const  API_PATH_NAME = {
    ORDER_CURRENT: 'orders/<%= number %>?order_token=<%= token %>',
    ORDER_LINE_ITEM: 'orders/<%= number %>/line_items?order_token=<%= token %>',
    ORDER_CHANGE_STATE: 'checkouts/<%= number %>/next.json?order_token=<%= token %>',
    ORDER_UPDATE: 'checkouts/<%= number %>.json?order_token=<%= token %>',
    ORDER_PAYMENT_METHOD: 'orders/<%= number %>/payments/new?order_token=<%= token %>',
    ORDER_PAYMENT: 'orders/<%= number %>/payments?order_token=<%= token %>',
    ORDER_SEARCH: 'orders?q[email_cont]=<%= email %>',
    ORDER_ONE: 'orders/<%= number %>?order_token=<%= token %>',
    ORDER_EMPTY_CREATE: 'orders.json',
    ORDER_LINE_ITEM_ONE: 'orders/<%= number %>/line_items/<%= id %>'
  };

const fn = (db)=>{

  const sidebarOptions = [
    {
      label: 'Home',
      key: 'home',
      leftIcon: 'home'
    },
    // {
    //   label: 'POS System',
    //   key: 'pos',
    //   leftIcon: 'shopping_cart',
    //   children: [
    //     {
    //       label: 'Shop',
    //       key: 'shop-page',
    //       leftIcon: 'people'
    //     },
    //     {
    //       label: 'Cart',
    //       key: 'cart-page',
    //       leftIcon: 'redeem'
    //     },
    //     {
    //       label: 'Checkout',
    //       key: 'checkout-page',
    //       leftIcon: 'shopping_cart'
    //     }/*,
    //     {
    //       label: 'Manage Receipts',
    //       key: 'receipts-manage',
    //       leftIcon: 'inbox'
    //     },*/
    //   ]
    // },
    // {
    //   label: 'Inbox',
    //   key: 'inbox',
    //   leftIcon: 'inbox'
    // },
    /*{
      label: "Data Entry",
      leftIcon: "ballot",
      key: "entrepreneur-main",
      children: [
        {
          label: 'Staff',
          key: 'staff-page',
          leftIcon: 'people'
        },
        {
          label: 'Inventory',
          key: 'inventory-page',
          leftIcon: 'redeem'
        },
        {
          label: 'Products',
          key: 'products-page',
          leftIcon: 'shopping_cart'
        },
        {
          label: 'Product Category',
          key: 'product-catalog',
          leftIcon: 'shopping_cart'
        },
        {
          label: 'Receipts',
          key: 'receipts-page',
          leftIcon: 'shop_two'
        },
        {
          label: 'Sales',
          key: 'sales-page',
          leftIcon: 'shop_two'
        },
        {
          label: 'Suppliers',
          key: 'suppliers-page',
          leftIcon: 'local_shipping'
        },
        {
          label: 'Deliveries',
          key: 'deliveries-page',
          leftIcon: 'departure_board'
        },
        {
          label: 'Investments',
          key: 'investments-page',
          leftIcon: 'equalizer'
        },
        {
          label: 'Subscriptions',
          key: 'subscriptions-page',
          leftIcon: 'equalizer'
        }
      ]
    },*/

    {
      label: "Reports",
      leftIcon: "pie_chart",
      key: "dashboard-reports",
      children: [
        {
          label: 'Cost Efficiency',
          key: 'cost-efficiency',
          leftIcon: 'monetization_on'

        },
        {
          label: 'Inventory Optimisation',
          key: 'inventory-optimisation-page',
          leftIcon: 'assignment_turned_in'
        },
        {
          label: 'Business Waste Reduction',
          key: 'business-waste-page',
          leftIcon: 'delete_forever'
        },
        {
          label: 'Business Process Improvement',
          key: 'business-improvement-page',
          leftIcon: 'extension'
        },
        {
          label: 'Customer Satisfaction',
          key: 'customer-satisfaction-page',
          leftIcon: 'face'
        },
        // report is global
        {
          label: 'Platform Engagement',
          key: 'platform-engagement-page',
          leftIcon: 'thumb_up'
        }
      ]
    },
  ];

  return sidebarOptions;
}

module.exports = {
    sidebarConfiguration:fn
}
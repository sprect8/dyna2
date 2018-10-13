import { getDefaultPath } from '../../helpers/urlSync';

const options = [
  {
    label: 'Home',
    key: '',
    leftIcon: 'home'
  },
  {
    label: 'Inbox',
    key: 'inbox',
    leftIcon: 'inbox'
  },
  {
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
      }
    ]
  },
  
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
        key: 'business-waste',
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
      {
        label: 'Platform Engagement',
        key: 'platform-engagement-page',
        leftIcon: 'thumb_up'
      }
    ]
  },
];
const getBreadcrumbOption = () => {
  const preKeys = getDefaultPath();
  let parent, activeChildren;
  options.forEach(option => {
    if (preKeys[option.key]) {
      parent = option;
      (option.children || []).forEach(child => {
        if (preKeys[child.key]) {
          activeChildren = child;
        }
      });
    }
  });
  return { parent, activeChildren };
};
export default options;
export { getBreadcrumbOption };

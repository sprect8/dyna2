import { getDefaultPath } from '../../helpers/urlSync';

const options = [
  {
    label: 'Home',
    key: 'blank-page',
    leftIcon: 'home'
  },
  {
    label: 'Staff',
    key: 'staff-page',
    leftIcon: 'people'

  },
  {
    label: 'Inventory',
    key: 'inventory-page',
    leftIcon: 'notes'
  },
  {
    label: 'Products',
    key: 'products-page',
    leftIcon: 'view_headline'
  },
  {
    label: 'Sales',
    key: 'sales-page',
    leftIcon: 'receipt'
  }
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

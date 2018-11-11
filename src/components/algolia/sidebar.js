import React from 'react';
import SearchText from './searchText';
import CheckboxCategory from './checkboxCategory';
// import RangeSlider from './rangeSlider';
// import NestedCategories from './nestedCategories';
import ClearAll from './clearAll';
import { SidebarWrapper, SidebarItem } from './algoliaComponent.style';
import Scanner from './barcode'

const Sidebar = props => (
  <SidebarWrapper className="algoliaSidebar">
    {/*<SidebarItem className="contentBox">
      <SearchText {...props} />
</SidebarItem>*/}
    {/* <SidebarItem className="contentBox">
      <h3 className="algoliaSidebarTitle" style={{ marginBottom: 10 }}>
        Slider
      </h3>
      <RangeSlider {...props} attribute="price" />
    </SidebarItem> */}
    <SidebarItem className="contentBox">
      <h3 className="algoliaSidebarTitle">Category</h3>
      <CheckboxCategory {...props} />
    </SidebarItem>
    {/* <SidebarItem className="contentBox">
      <NestedCategories {...props} />
    </SidebarItem> */}


    <SidebarItem className="contentBox">
      <Scanner
        {...props}
        variant="raised"
        color="primary"
        style={{ marginRight: 10 }}
        searchMode={true}
      >
        Scan
      </Scanner>

    </SidebarItem>
    <SidebarItem className="contentBox">

      <ClearAll {...props} />
    </SidebarItem>
  </SidebarWrapper>
);

export default Sidebar;

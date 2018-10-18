import React, { Component } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch/dom';
import CustomHits from './customHit';
import { Footer, Sidebar } from '../../../components/algolia';
import EmptyComponent from '../../../components/emptyComponent';
import { AlgoliaSearchConfig } from '../../../settings';
import AlgoliaSearchPageWrapper, { Button } from './algolia.style';
import { withUrlSync } from '../../../helpers/urlSync';

class Shop extends Component {
  render() {
    const { collapsed, changeCollapsed } = this.props;
    const className = collapsed ? '' : 'sidebarOpen';
    const btnText = collapsed ? 'Show Sidebar' : 'Apply Filter';
    return (
      <AlgoliaSearchPageWrapper className={`${className}`}>
        {AlgoliaSearchConfig.appId ? (
          <InstantSearch
            indexName="default_search"
            {...AlgoliaSearchConfig}
            {...this.props}
          >
            <Configure hitsPerPage={12} />
            <div>
              <Button
                onClick={() => {
                  changeCollapsed(!collapsed);
                }}
              >
                {btnText}
              </Button>
              <div className="algoliaMainWrapper">
                <Sidebar {...this.props} />
                <CustomHits {...this.props} />
              </div>
              <Footer />
            </div>
          </InstantSearch>
        ) : (
          <EmptyComponent value="Please include algolia appId" />
        )}
      </AlgoliaSearchPageWrapper>
    );
  }
}
export default withUrlSync(Shop);

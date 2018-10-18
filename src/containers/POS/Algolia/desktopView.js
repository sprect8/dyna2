import React, { Component } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch/dom';
import CustomHits from './customHit';
import { Footer, Sidebar } from '../../../components/algolia';
import EmptyComponent from '../../../components/emptyComponent';
import { AlgoliaSearchConfig } from '../../../settings';
import AlgoliaSearchPageWrapper from './algolia.style';
import { withUrlSync } from '../../../helpers/urlSync';

class Shop extends Component {
  render() {
    return (
      <AlgoliaSearchPageWrapper>
        {AlgoliaSearchConfig.appId ? (
          <InstantSearch
            indexName="default_search"
            {...AlgoliaSearchConfig}
            {...this.props}
          >
            <Configure hitsPerPage={12} />
            <div className="algoliaMainWrapper">
              <Sidebar {...this.props} />
              <CustomHits {...this.props} />
            </div>
            <Footer />
          </InstantSearch>
        ) : (
          <EmptyComponent value="Please include algolia appId" />
        )}
      </AlgoliaSearchPageWrapper>
    );
  }
}
export default withUrlSync(Shop);

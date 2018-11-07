import React, { Component } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch/dom';
import CustomHits from './customHit';
import { Footer, Sidebar } from '../../../components/algolia';
import EmptyComponent from '../../../components/emptyComponent';
import { AlgoliaSearchConfig } from '../../../settings';
import AlgoliaSearchPageWrapper from './algolia.style';
import { withUrlSync } from '../../../helpers/urlSync';

const customSearchClient = {
  search(requests) {
    return fetch('/api/product-search', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    }).then(res => res.json());
  },
  searchForFacetValues(requests) {
    return fetch('/api/product-sffv', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    }).then(res => res.json());
  }
};

class Shop extends Component {
  render() {
    return (
      <AlgoliaSearchPageWrapper>
        <InstantSearch
            indexName="default_search"
            searchClient={customSearchClient}
            {...this.props}
          >
            <Configure hitsPerPage={12} />
            <div className="algoliaMainWrapper">
              <Sidebar {...this.props} />
              <CustomHits {...this.props} />
            </div>
          </InstantSearch>        
      </AlgoliaSearchPageWrapper>
    );
  }
}
export default withUrlSync(Shop);

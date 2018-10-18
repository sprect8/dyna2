import React from 'react';
import { connectInfiniteHits } from 'react-instantsearch/connectors';
import { Topbar } from '../../../components/algolia';
import { ContentWrapper } from '../../../components/algolia/algoliaComponent.style';
import Hit from './hit';
import Button from '../../../components/uielements/button';
import { LoaderElement } from '../../../components/algolia/algoliaComponent.style';
import EmptyComponent from '../../../components/emptyComponent';

const CustomHits = props => {
  const { hits, hasMore, searchState, refine } = props;
  if (hits.length === 0 && !hasMore && Object.keys(searchState).length === 0) {
    return (
      <LoaderElement className="isoContentLoader">
        <div className="loaderElement" />
      </LoaderElement>
    );
  }
  return (
    <ContentWrapper>
      <Topbar {...props} />
      <main id="hits">
        {hits.map(hit => <Hit key={hit.objectID} hit={hit} {...props} />)}
      </main>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {hits.length > 0 ? (
          <Button
            onClick={() => {
              if (hasMore) {
                refine();
              }
            }}
            disabled={!hasMore}
            label="Load More"
            color="primary"
          >
            Load More
          </Button>
        ) : (
          <EmptyComponent value="No results for these filtering" />
        )}
      </div>
    </ContentWrapper>
  );
};
export default connectInfiniteHits(CustomHits);

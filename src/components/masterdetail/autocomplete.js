import React from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import AsyncTypeahead from 'react-bootstrap-typeahead';

export class Async extends React.Component {
    state = {
      allowNew: false,
      isLoading: false,
      multiple: false,
      options: [],
    };

    componentWillReceiveProps = (props) => {
        console.log(props);
    }
  
    render() {
      return (
          <AsyncTypeahead
            {...this.state}
            labelKey="multiselect"
            minLength={3}
            onSearch={this._handleSearch}
            placeholder="Search for Values..."            
          />
      );
    }
  
    _handleSearch = (query) => {
      this.setState({isLoading: true});
      makeAndHandleRequest(query)
        .then(({options}) => {
          this.setState({
            isLoading: false,
            options,
          });
        });
    }
  }
  
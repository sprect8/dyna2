import React from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

export default class Async extends React.Component {
    state = {
        allowNew: false,
        isLoading: false,
        multiple: false,
        options: [],
        selected: []
    };

    componentDidMount() {
        this._handleSearch("*")
    }

    componentWillMount() {
        if (this.props.value !== "") {
            this.setState({selected: [this.props.value]});
        }
    }

    componentWillReceiveProps = (props) => {
        console.log(props);

        if (this.props.value !== props.value) {
            this.setState({ selected: [props.value ? props.value : ""] })
        }

        if (this.props.error !== props.error) {
            this.setState({ error: props.error })
        }
    }

    render() {
        console.log(this.state);

        return (
            <div>
                {this.props.label}
                <AsyncTypeahead
                    className={this.state.error ? "has-error" : ""}
                    {...this.state}
                    minLength={2}
                    filterBy={() => { return true }}
                    onSearch={this._handleSearch}
                    selected={this.state.selected}
                    placeholder={"Search for " + (this.props.config)}
                    onInputChange={this._handleChanged}
                    onChange={this._handleSelected}
                />
            </div>
        );
    }

    _handleSelected = (input) => {
        console.log("Selected", input);
        if (input.length > 0) {
            this.props.onChange({ target: { value: input[0].label } })
        }
    }

    _handleChanged = (input) => {
        console.log("Changed", input);

        this.setState({ selected: [input] })
    }

    _handleSearch = (query) => {
        this.setState({ isLoading: true });
        fetch("/api/lov/" + this.props.config.toLowerCase() + "/" + query)
            .then(op => {
                op.json().then(r => {
                    this.setState({
                        isLoading: false,
                        options: r
                    })
                })
            })
    }
}

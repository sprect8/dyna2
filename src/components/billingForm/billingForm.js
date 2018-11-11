import React from 'react';
import PropTypes from 'prop-types';
import { Form, TextField } from './billingForm.style';

class BillingForm extends React.Component {
  state = {
    name: '',
    email: '',
    multiline: 'Controlled',
  };

  handleChange = name => event => {
    console.log(this.props.notifyChange);
    if (this.props.notifyChange) {
      this.props.notifyChange(name, event.target.value);
    }
  };

  render() {
    return (
      <Form noValidate autoComplete="off">
        <TextField
          required
          fullWidth
          id="fullName"
          className="firstNameField billingFormField"
          label="Full Name"
          margin="normal"
          value={this.state.name}
          onChange={(e) => {
            this.setState({name:e.target.value});
            
            this.handleChange("recp_customer")(e);
          }}
        />
        <br/>
        <TextField
          required
          fullWidth
          id="email"
          className="emailField billingFormField"
          label="Email Address"
          type="email"
          margin="normal"
          value={this.state.email}
          onChange={(e) => {
            this.setState({email:e.target.value});
            this.handleChange("recp_customer_email")(e);
          }}
        />
      </Form>
    );
  }
}

BillingForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default BillingForm;

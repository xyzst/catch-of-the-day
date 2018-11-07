import React, { Fragment } from 'react';
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  // constructor() {
  //   super();
  //   console.log('Creating a new component');
  //   this.goToStore = this.goToStore.bind(this);
  // }

  userInput = React.createRef();

  goToStore = event => { // Creating new property on the class, do not have to use goToStore.bind(this) in the constructor
    event.preventDefault();
    const storeName = this.userInput.current.value;
    // redirect to /store/:userInput
    this.props.history.push(`/store/${storeName}`)
  };

  componentDidMount() {
    console.log("Component StorePicker successfully mounted!");
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type = "text"
          ref = {this.userInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store!</button>
      </form>
    );
  }
}

export default StorePicker;
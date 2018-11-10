import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {

    },
    order: {

    }
  };

  /* life cycle events */
  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
    console.log('Updated successfully!');
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };

    fishes[key] = updatedFish;

    this.setState({
      fishes
    });
  };

  deleteFish = (key) => {
    const fishes = { ...this.state.fishes };

    fishes[key] = null; // necessary for firebase to delete the item

    this.setState({
      fishes
    });
  };

  removeFromOrder = (key) => {
    const order = { ...this.state.order };

    delete order[key];

    this.setState({order});
  };

  addFish = (fish) => {
    // Take copy of existing state, should never modify/mutate state directly
    const fishes = {...this.state.fishes}; // `...` is js obj spread

    // Add fish to fishes
    fishes[`fish${Date.now()}`] = fish;

    this.setState({
      fishes // equivalent to fishes: fishes if the L value == R value name
    });
  };

  loadSamplesFishes = () => {
    this.setState({
      fishes: sampleFishes
    })
  };

  addToOrder = (key) => {
    // take a copy of state
    const order = { ...this.state.order };
    // either add to the order or update the number in our order
    order[key] = order[key] + 1 || 1;
    // call set state to update state obj
    this.setState({
      order
    })
  };

  render() {
    return (
      <div className = "catch-of-the-day">
        <div className = "menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(k => <Fish
                  key={k}
                  index={k}
                  details={this.state.fishes[k]}
                  addToOrder={this.addToOrder}
                />)
            }
          </ul>
        </div>
        <Order // could use the spread operator here as well (...this.state) but is frowned upon, will always add new objects if state is updated
          fishes = {this.state.fishes}
          order = {this.state.order}
          removeFromOrder = {this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSamplesFishes}
          fish = {this.state.fishes}
        />
      </div>
    )
  }
}

export default App;
import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
  state = {
    fishes: {

    },
    order: {

    }
  };

  /* life cycle events */
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
        <Order/>
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSamplesFishes}
        />
      </div>
    )
  }
}

export default App;
import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  state = {
    fishes: {

    },
    order: {

    }
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

  render() {
    return (
      <div className = "catch-of-the-day">
        <div className = "menu">
        <Header tagline="Fresh Seafood Market"/>
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
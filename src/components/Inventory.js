import React from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends React.Component {
  render() {
    return (
      <div className = "inventory">
        <h2>Inventory</h2>
        {
          Object
          .keys(this.props.fish)
          .map(fish =>
            <EditFishForm
              fish={this.props.fish[fish]} key={fish} updateFish={this.props.updateFish} index={fish}/>)
        }
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes} >
          Load Sample Fishes
        </button>
      </div>
    )
  }
}

export default Inventory;
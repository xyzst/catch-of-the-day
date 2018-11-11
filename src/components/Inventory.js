import React from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm'
import PropTypes from 'prop-types';

class Inventory extends React.Component {
  static propTypes = {
    fish: PropTypes.object, // TODO: use PropTypes.shape({})
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
  loadSampleFishes: PropTypes.func
  };
  render() {
    return (
      <div className = "inventory">
        <h2>Inventory</h2>
        {
          Object
          .keys(this.props.fish)
          .map(fish =>
            <EditFishForm
              fish={this.props.fish[fish]} key={fish} updateFish={this.props.updateFish} index={fish} deleteFish={this.props.deleteFish}/>)
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
import React from 'react';
import { ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap';

class Buttons extends React.Component {
  
    handleSelect = (e) => {
      this.props.gridSize(e);
    }
  
    render() {
      return (
        <div className="center">
          <ButtonToolbar>
            <button className="a1 btn btn-default" onClick={this.props.playButton}>
              Play
            </button>
            <button className="a2 btn btn-default" onClick={this.props.pauseButton}>
              Pause
            </button>
            <button className="a3 btn btn-default" onClick={this.props.clear}>
              Clear
            </button>
            <button className="a4 btn btn-default" onClick={this.props.slow}>
              Slow
            </button>
            <button className="a5 btn btn-default" onClick={this.props.fast}>
              Fast
            </button>
            <button className="a6 btn btn-default" onClick={this.props.seed}>
              Seed
            </button>
            <DropdownButton
              title="Grid Size"
              id="size-menu"
              onSelect={this.handleSelect}
            >
              <Dropdown.Item eventKey="1">25x25</Dropdown.Item>
              <Dropdown.Item eventKey="2">50x30</Dropdown.Item>
              <Dropdown.Item eventKey="3">70x40</Dropdown.Item>
            </DropdownButton>
          </ButtonToolbar>
        </div>
      );
    }
  }

  export default Buttons;
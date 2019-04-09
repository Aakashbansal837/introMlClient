import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';


class MediaPlayer extends Component {

state = {
  modal: false
}

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

render() {
  return (
    <MDBContainer>
      <MDBBtn onClick={this.toggle}>Modal</MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader>
        <MDBModalBody>
          (...)
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  }
}

/*
	render () {
		return (
          <div className="playerDiv">
          	<video controls>
          		 <iframe width="420" height="315"
				src="https://www.youtube.com/embed/tgbNymZ7vqY">
				</iframe> 
          	</video>
          </div>
          );
	}
	
}
*/

export default MediaPlayer;
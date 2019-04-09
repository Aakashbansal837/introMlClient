import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
    mediaLink : ''
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    //console.log('e',e);
    //console.log('e.target',e.target);
    this.setState({ name : e.target.value });
  };
  onMediaChange = e => {
    //console.log('e',e);
    //console.log('e.target',e.target.value);
    this.setState({ mediaLink : e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      mediaLink : this.state.mediaLink
    };
    console.log(newItem);

    // Add item via addItem action
    this.props.addItem(newItem);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color='dark'
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        ) : (
          <h4 className='mb-3 ml-4'>Click to play and LogIn to Add Videos</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Media List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Add media item'
                  onChange={this.onChange}
                />
                <Label for='mediaLink'>Media Url</Label>
                <Input
                  type='text'
                  name='mediaLink'
                  id='mediaLink'
                  placeholder='Add media url'
                  onChange={this.onMediaChange}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);

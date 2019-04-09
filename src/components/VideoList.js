import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import '../App.css';


class VideoList extends Component {
  constructor (props) {
    super (props);
    this.state = {
    url : 'https://www.youtube.com/embed/tgbNymZ7vqY',
  };
  }
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };
  

  componentDidMount() {
    this.props.getItems();
  }

  onVideoBarClick = UrlData => {
    this.state.url = UrlData ;
    console.log(UrlData);
    document.getElementById('youtubeiframe').src = UrlData;

  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;
    // items.map(({_id,name})=> (
    //   console.log(_id,name,"=================");
    // ));
    return (
      <div>
        <div className='list-names col-sm-3 col-md-3 col-xs-3'>
          <Container>
          <ListGroup>
            <TransitionGroup className='video-list'>
              {items.map(({ _id, name, mediaLink }) => (
                <CSSTransition key={_id} timeout={500} classNames='fade'>
                  <ListGroupItem onDoubleClick={this.onVideoBarClick.bind(this, mediaLink)}>
                    {this.props.isAuthenticated ? (
                      <Button
                        className='remove-btn'
                        color='danger'
                        size='sm'
                        onClick={this.onDeleteClick.bind(this, _id)}
                      >
                        &times;
                      </Button>
                    ) : null}
                    {name}
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
          </Container>
        </div>
        <div className="list-video-player col-sm-9 col-md-9 col-xs-9">
          <iframe 
                width= "100%" 
                height="600" 
                src="https://www.youtube.com/embed/OGxgnH8y2NM"
                id="youtubeiframe"
                frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
          </iframe>
        </div>
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
  { getItems, deleteItem }
)(VideoList);

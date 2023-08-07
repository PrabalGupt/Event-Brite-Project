import './App.css'
import React, {Component} from 'react'
import Modal from './components/modal.js'
import axios from 'axios'
// contains the objects
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      // modal: false,
      viewCompleted: false,
      activeItem: {
        event_name: "",
        data: "",
        is_liked: false,
        time: new Date(),
        location: "", 
        // image: "",
        user_id: ""
      },
      eventList: []   
    };
  }
  // connects to the backend django
  componentDidMount() {
    this.refreshList();
  }
  //renders the events each time
  refreshList = () =>{
    axios
      .get("http://127.0.0.1:8000/api/events/")
      .then(res => this.setState({eventList: res.data}))
      .catch(err => console.log(err))
  };
  //toggle between the state of create event tab
  toggle = () => {
    this.setState({modal: !this.state.modal});
  };
  //submit the data entered and display it on the screen
  handleSubmit = item => {
    this.toggle();
    if(item.id){
      axios
        .put(`http://127.0.0.1:8000/api/events/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://127.0.0.1:8000/api/events/", item)
      .then(res => this.refreshList());
  };
  //delete an event
  handleDelete = item => {
    if(item.id){
      axios
        .delete(`http://127.0.0.1:8000/api/events/${item.id}/`)
        .then(res => this.refreshList())
    }
  }
  //create an event
  createItem = () => {
    const item = {event_name:"", data:"", is_liked: false, time: new Date(), location: ""};
    this.setState({activeItem: item, modal: !this.state.modal});
  };
  //edit an event
  editItem = item =>{
    this.setState({activeItem: item, modal: !this.state.modal});
  };

// contains if a task is completed
  displayCompleted = status => {
    if(status){
      return this.setState({viewCompleted: true});
    }
    return this.setState({viewCompleted: false});
  }
  //render the tags of events and liked event active my-5 tab-list
  renderTabList = () => {
    return (
      <div className='  navbar'>
        <span onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "space" : "space"}
        >
        Likes
        </span>
        <span onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : ""}
        >
        Events
        </span>
      </div>
    )
  }
// displays item to be displayed after checking if it is completed or not
  renderItems = () =>{
    const {viewCompleted} = this.state;
    let newItems = [{}]
    if(viewCompleted){
      newItems = this.state.eventList.filter(
        item => item.is_liked === viewCompleted
    );
    }else{
      newItems = this.state.eventList
    }
    return newItems.map(item => (
      <div className='item'>
        <div className='toolbar'>
          <div className='each-row-item'><h2>{item.event_name}</h2></div>
          <div className='each-row-item'><span>{item.data}</span></div>
          <div className='each-row-item'><span>{item.location}</span></div>
          <div className='each-row-item'><span>{item.time}</span></div>
          <div className='each-row-item'><span>{item.is_liked}</span></div>
          </div>
          <div className='delete-edit'>
            <div>
              <button className="btn btn-primary delete" onClick={() => this.handleDelete(item)}> Delete </button>
            </div>
            <div>
              <button className="btn btn-primary edit" onClick={() => this.editItem(item)}>Edit</button>        
            </div>
          </div>
        
      </div>
    ))
  };
  render(){
    return(
      <main>
        <div className='navbar'> 
          <h1 className='event-brite'>Event Brite</h1>
          <div className='navbar-right'>
            <button onClick={this.createItem} className="btn btn-primary create-event">Create Event</button>
            <div>
              {this.renderTabList()}
            </div>
          </div>
        </div>
        <div className='items'>
          {this.renderItems()}
        </div>
        {this.state.modal? (
        <Modal activeItem={this.state.activeItem} toggle={this.toggle} onSave={this.handleSubmit}/>
        ) : null}
      </main>
    )
  }
}
export default App;
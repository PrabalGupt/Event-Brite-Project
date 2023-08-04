import React, {Component} from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap'

class CustomModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }

    handleChange = e =>{
        let {name, value} = e.target;
        if(e.target.type === "checkbox"){
            value = e.target.checked;
        }
        const activeItem = {...this.state.activeItem, [name]: value};
        this.setState({activeItem});
    };

    render(){
        const {toggle, onSave} = this.props;
        return(
            <Modal isOpen={true} toggle={toggle} >
                <ModalHeader toggle={toggle}>Task Item</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                           <Label for="event_name">Event Name</Label>
                            <Input
                                type='text'
                                name='event_name'
                                value={this.state.activeItem.event_name}
                                onChange={this.handleChange}
                                placeholder='Enter event title'
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="data">Data</Label>
                            <Input
                                type='text'
                                name='data'
                                value={this.state.activeItem.data}
                                onChange={this.handleChange}
                                placeholder='Enter task description'
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="is_liked">Like</Label>
                            <Input
                                type='checkbox'
                                name='is_liked'
                                value={this.state.activeItem.is_liked}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="time">Time</Label>
                            <Input
                                type='datetime-local'
                                name='time'
                                value={this.state.activeItem.time}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="location">Location</Label>
                            <Input
                                type='text'
                                name='location'
                                value={this.state.activeItem.location}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>Save</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default CustomModal
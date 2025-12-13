/*==================================================
NewCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      redirect: false,
      redirectId: null,
      errors: {}
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Simple image URL validation
  isValidImageUrl = (url) => {
    try {
      new URL(url);
    } catch (_) {
      return false;
    }
    return /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i.test(url);
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!this.state.name.trim()) errors.name = "Name is required";
    if (!this.state.address.trim()) errors.address = "Address is required";
    if (this.state.imageUrl && !this.isValidImageUrl(this.state.imageUrl))
      errors.imageUrl = "Please enter a valid image URL";

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    const campus = {
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      imageUrl: this.state.imageUrl.trim() || "https://placehold.co/600x400.png",
    };

    const newCampus = await this.props.addCampus(campus);

    this.setState({
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      redirect: true,
      redirectId: newCampus.id,
      errors: {}
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/campus/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <Header />
        <NewCampusView
          formData={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  addCampus: (campus) => dispatch(addCampusThunk(campus)),
});

export default connect(null, mapDispatch)(NewCampusContainer);

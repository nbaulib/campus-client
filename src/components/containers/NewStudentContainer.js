/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      campusId: "",
      email: "",
      GPA: "",
      imageUrl: "",
      redirect: false,
      redirectId: null,
      errors: {}
    };
  }

  // Capture input data when it is entered
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  isValidGPA = (gpa) => {
    if (gpa === "") return true; // optional
    const num = parseFloat(gpa);
    return !isNaN(num) && num >= 0 && num <= 4;
  }

  isValidImageUrl = (url) => {
    if (!url) return true; // optional
    try {
      new URL(url);
      return /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i.test(url);
    } catch (_) {
      return false;
    }
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    const errors = {};
    if (!this.state.firstname.trim()) errors.firstname = "First name is required";
    if (!this.state.lastname.trim()) errors.lastname = "Last name is required";
    if (!this.state.email.trim()) errors.email = "Email is required";
    else if (!this.isValidEmail(this.state.email)) errors.email = "Invalid email format";
    if (!this.isValidGPA(this.state.GPA)) errors.GPA = "GPA must be between 0.0 and 4.0";
    if (!this.isValidImageUrl(this.state.imageUrl)) errors.imageUrl = "Invalid image URL";

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    const student = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      campusId: this.state.campusId || null,
      email: this.state.email,
      GPA: this.state.GPA ? parseFloat(this.state.GPA) : null,
      imageUrl: this.state.imageUrl,
    };

    // Add new student in back-end database
    const newStudent = await this.props.addStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "",
      lastname: "",
      campusId: "",
      email: "",
      GPA: "",
      imageUrl: "",
      redirect: true,
      redirectId: newStudent.id,
      errors: {}
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if (this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`} />)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView
          formData={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return ({
    addStudent: (student) => dispatch(addStudentThunk(student)),
  })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(NewStudentContainer);
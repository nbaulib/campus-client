/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { fetchStudentThunk, editStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      imageUrl: "",
      campusId: "",
      email: "",
      gpa: "", 
      redirect: false,
      redirectId: null,
      loaded: false,
      errors: {}
    };
  }

  async componentDidMount() {
    const studentId = this.props.match.params.id;

    // Fetch the student if not already in Redux state
    await this.props.fetchStudent(studentId);

    // Get student from Redux state (assuming it's now in props.student)
    this.populateForm();
  }

  componentDidUpdate(prevProps) {
    // Catches when student data actually arrives in props
    if (this.props.student && this.props.student !== prevProps.student) {
      this.populateForm();
    }
  }
  // pop with curr data
  populateForm = () => {
    const { student } = this.props;
    if (student && student.id) {
      this.setState({
        firstname: student.firstname || "",
        lastname: student.lastname || "",
        imageUrl: student.imageUrl || "",
        campusId: student.campusId || "",
        email: student.email || "",
        gpa: this.state.gpa === "" ? null : parseFloat(this.state.gpa),
        loaded: true
      });
    }
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  isValidImageUrl = (url) => {
    try {
      new URL(url);
    } catch (_) {
      return false;
    }
    return /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i.test(url);
  }

  isValidGPA = (gpa) => gpa === "" || (parseFloat(gpa) >= 0 && parseFloat(gpa) <= 4);

  isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

    const studentId = this.props.match.params.id;

    const student = {
      id: studentId,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      campusId: this.state.campusId,
      email: this.state.email,
      gpa: this.state.gpa,
      imageUrl: this.state.imageUrl
    };

    // Add edit student in back-end database
    const updatedStudent = await this.props.editStudent(student);

    // Update state, and trigger redirect to show the edit student
    this.setState({
      redirect: true,
      redirectId: updatedStudent.id
    });
  }

  // Render edit student input form
  render() {
    // Redirect to edit student's page after submit
    if (this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`} />)
    }

    if (!this.state.loaded) {
      return <div>Loading student...</div>;
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditStudentView
          // firstname={this.state.firstname}
          // lastname={this.state.lastname}
          // imageUrl={this.state.imageUrl}
          // campusId={this.state.campusId}
          // email={this.state.email}
          // gpa={this.state.gpa}
          formData={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    student: state.student
  };
}


// The following input argument is passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return ({
    editStudent: (student) => dispatch(editStudentThunk(student)),
    fetchStudent: (studentId) => dispatch(fetchStudentThunk(studentId))
  })
}

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);
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
      loaded: false
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

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

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
          firstname={this.state.firstname}
          lastname={this.state.lastname}
          imageUrl={this.state.imageUrl}
          campusId={this.state.campusId}
          email={this.state.email}
          gpa={this.state.gpa}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
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
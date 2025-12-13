/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      redirect: false,
      redirectId: null,
      loaded: false
    };
  }

  async componentDidMount() {
    const campusId = this.props.match.params.id;

    // Fetch the campus if not already in Redux state
    await this.props.fetchCampus(campusId);

    // Get campus from Redux state (assuming it's now in props.campus)
    this.populateForm();
  }

  componentDidUpdate(prevProps) {
    // Catches when campus data actually arrives in props
    if (this.props.campus && this.props.campus !== prevProps.campus) {
      this.populateForm();
    }
  }
  // pop with curr data
  populateForm = () => {
    const { campus } = this.props;
    if (campus && campus.id) {
      this.setState({
        name: campus.name || "",
        address: campus.address || "",
        description: campus.description || "",
        imageUrl: campus.imageUrl || "",
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

    const campusId = this.props.match.params.id;

    const campus = {
      id: campusId,
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      imageUrl: this.state.imageUrl
    };

    // Add edit campus in back-end database
    // let editCampus = await this.props.editCampus(campus);
    const updatedCampus = await this.props.editCampus(campus);

    // Update state, and trigger redirect to show the edit campus
    this.setState({
      redirect: true,
      redirectId: updatedCampus.id
    });
  }

  // Render edit campus input form
  render() {
    // Redirect to edit campus's page after submit
    if (this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`} />)
    }

    if (!this.state.loaded) {
      return <div>Loading campus...</div>;
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditCampusView
          name={this.state.name}
          address={this.state.address}
          description={this.state.description}
          imageUrl={this.state.imageUrl}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus
  };
}


// The following input argument is passed to the "connect" function used by "EditCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return ({
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
    fetchCampus: (campusId) => dispatch(fetchCampusThunk(campusId))
  })
}

// Export store-connected container by default
// EditCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);
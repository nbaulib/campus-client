/*==================================================
EditCampusContainer.js
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
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
    console.log("Fetching campus with ID:", campusId);
    
    await this.props.fetchCampus(campusId);
    
    console.log("Props after fetch:", this.props);
    console.log("Campus from props:", this.props.campus);
    
    this.populateForm();
  }

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate - current props:", this.props.campus);
    console.log("componentDidUpdate - prev props:", prevProps.campus);
    
    if (this.props.campus && this.props.campus !== prevProps.campus) {
      console.log("Campus changed, populating form");
      this.populateForm();
    }
  }

  populateForm = () => {
    const { campus } = this.props;
    console.log("populateForm called with campus:", campus);
    
    if (campus && campus.id) {
      console.log("Setting state with campus data");
      this.setState({
        name: campus.name || "",
        address: campus.address || "",
        description: campus.description || "",
        imageUrl: campus.imageUrl || "",
        loaded: true
      });
    } else {
      console.log("Campus is missing or has no ID");
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    const campusId = this.props.match.params.id;

    const campus = {
      id: campusId,
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      imageUrl: this.state.imageUrl
    };

    const updatedCampus = await this.props.editCampus(campus);

    this.setState({
      redirect: true,
      redirectId: updatedCampus.id
    });
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`} />)
    }

    if (!this.state.loaded) {
      return <div>Loading campus...</div>;
    }

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
  console.log("mapState - full Redux state:", state);
  return {
    campus: state.campus
  };
}

const mapDispatch = (dispatch) => {
  return ({
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
    fetchCampus: (campusId) => dispatch(fetchCampusThunk(campusId))
  })
}

export default connect(mapState, mapDispatch)(EditCampusContainer);
/*==================================================
HomePageContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
================================================== */

import { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import HomePageView from "../views/HomePageView";
import { fetchAllCampusesThunk, fetchAllStudentsThunk } from "../../store/thunks";

class HomePageContainer extends Component {
  componentDidMount() {
    this.props.fetchAllCampuses();
    this.props.fetchAllStudents();
  }

  render() {
    return (
      <div>
        <Header />
        <HomePageView
          totalCampuses={this.props.campuses.length}
          totalStudents={this.props.students.length}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campuses: state.allCampuses,
    students: state.allStudents
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    fetchAllStudents: () => dispatch(fetchAllStudentsThunk())
  };
};

export default connect(mapState, mapDispatch)(HomePageContainer);

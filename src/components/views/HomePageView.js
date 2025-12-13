/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import { Link } from "react-router-dom";

const HomePageView = ({ totalCampuses, totalStudents }) => {
  return (
    <div>
      <h1>Home Page</h1>

      <p>
        Manage campuses and students.
      </p>

      <p>Total Campuses: {totalCampuses}</p>
      <p>Total Students: {totalStudents}</p>

      <div>
        <Link to="/campuses">View All Campuses</Link>
        <br />
        <Link to="/students">View All Students</Link>
        <br />
        <Link to="/newcampus">Add New Campus</Link>
        <br />
        <Link to="/newstudent">Add New Student</Link>
      </div>
    </div>
  );
};

export default HomePageView;

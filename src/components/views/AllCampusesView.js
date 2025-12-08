/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const defaultImg = "https://media.istockphoto.com/id/1187802081/photo/new-york-city-skyline-with-central-park.webp?b=1&s=170667a&w=0&k=20&c=0RhKXsePfAC7qyWNZGiQu2jM45269kUhf6GtldLguq8=";

const AllCampusesView = (props) => {
  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return <div>There are no campuses.</div>;
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div className="container">
      <h1>All Campuses</h1>

      {props.allCampuses.map((campus) => (
        <div key={campus.id} class="card">
          <img
            src={campus.imageUrl || defaultImg}
            alt={campus.name}
          />
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          <h4>campus id: {campus.id}</h4>
          <p>{campus.address}</p>
          <p>{campus.description}</p>
        </div>
      ))}
      <br />
      <Link to={`/`}>
        <button>Add New Campus</button>
      </Link>
      <br /><br />
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
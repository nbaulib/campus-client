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
    return (
      <div className="empty-view">
        <p>There are no campuses.</p>
        <Link to={`/`}>
          <button>Add New Campus</button>
        </Link>
      </div>
    );
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div className="container">
      <h1>All Campuses</h1>

      <div className="card-grid">
        {props.allCampuses.map((campus) => (
          <Link
            key={campus.id}
            to={`/campus/${campus.id}`}
            className="card"
          >
            <img
              src={campus.imageUrl || defaultImg}
              alt={campus.name}
            />
            <h2>{campus.name}</h2>
            <h4>campus id: {campus.id}</h4>
            <p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  campus.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
                onClick={(e) => e.stopPropagation()} // prevents triggering the Link click
              >
                {campus.address}
              </a>
            </p>
            <p>{campus.description}</p>
          </Link>
        ))}
      </div>

      <Link to={`/`}>
        <button>Add New Campus</button>
      </Link>
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
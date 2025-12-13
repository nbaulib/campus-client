/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllCampusesView = (props) => {
  // If there is no campus, display a message.
  const { deleteCampus } = props;
  if (!props.allCampuses.length) {
    return (
      <div className="empty-view">
        <p>There are no campuses.</p>
        <Link to={`newcampus`}>
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
          <div key={campus.id} className="card">
            <Link to={`/campus/${campus.id}`} className="card-link">
              <img src={campus.imageUrl} alt={campus.name} />
              <h2>{campus.name}</h2>
              <h4>campus id: {campus.id}</h4>
            </Link>
            <p>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(campus.address)}`}
                target="_blank" rel="noopener noreferrer" className="map-link">
                {campus.address}
              </a>
            </p>
            <p>{campus.description}</p>
            <Link to={`editcampus/${campus.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => deleteCampus(campus.id)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>

      <Link to={`newcampus`}>
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
/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const { campus, deleteStudent } = props;

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <img
        src={campus.imageUrl}
        alt={campus.name}
      />
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <Link to={`/editcampus/${campus.id}`}>
        <button>Edit Campus Info</button>
      </Link>
      <h2>Roster</h2>
      {/* If there are no students, display a message. */}
      {!campus.students.length ? (
        <div className="empty-view">
          <p>There are no students enrolled at this campus.</p>
          <Link to={`/newstudent`}>
            <button>Add New Student</button>
          </Link>
        </div>
      ) : (
        campus.students.map(student => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>
              <button onClick={() => deleteStudent(student.id)}>Delete</button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CampusView;
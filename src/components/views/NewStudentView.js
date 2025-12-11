/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

// Styled components
const FormContainer = styled(Box)({
  width: "500px",
  backgroundColor: "#f0f0f5",
  borderRadius: "5px",
  margin: "auto",
  marginTop: "20px",
});

const FormTitle = styled(Box)({
  backgroundColor: "#c5c8d6",
  marginBottom: "15px",
  textAlign: "center",
  borderRadius: "5px 5px 0 0",
  padding: "8px",
});

const Label = styled("label")({
  color: "#11153e",
  fontWeight: "bold",
  display: "block",
  marginTop: "10px",
});

const Input = styled("input")({
  padding: "5px",
  width: "90%",
  marginTop: "5px",
  borderRadius: "3px",
  border: "1px solid #ccc",
});

const Form = styled("form")({
  textAlign: "center",
  padding: "10px",
});

const NewStudentView = ({ handleChange, handleSubmit }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center", marginTop: 2, marginBottom: 3 }}>
        New Student
      </Typography>

      <FormContainer>
        <FormTitle>
          <Typography
            sx={{ fontWeight: "bold", fontFamily: "Courier, sans-serif", fontSize: "20px", color: "#11153e" }}
          >
            Add a Student
          </Typography>
        </FormTitle>

        <Form onSubmit={handleSubmit}>
          <Label htmlFor="firstname">First Name:</Label>
          <Input type="text" name="firstname" onChange={handleChange} />

          <Label htmlFor="lastname">Last Name:</Label>
          <Input type="text" name="lastname" onChange={handleChange} />

          <Label htmlFor="campusId">Campus Id:</Label>
          <Input type="text" name="campusId" onChange={handleChange} />

          <Label htmlFor="email">Email:</Label>
          <Input type="text" name="email" onChange={handleChange} />

          <Label htmlFor="GPA">GPA:</Label>
          <Input type="text" name="GPA" onChange={handleChange} />

          <Label htmlFor="imageUrl">Image Url:</Label>
          <Input type="text" name="imageUrl" onChange={handleChange} />

          <Box sx={{ marginTop: 3 }}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </Form>
      </FormContainer>
    </Box>
  );
};

export default NewStudentView;
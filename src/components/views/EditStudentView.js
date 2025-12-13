/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

// Styled components
const FormContainer = styled(Box)({
  width: "500px",
  backgroundColor: "#f0f0f5",
  borderRadius: "5px",
  margin: "auto",
  marginTop: "20px",
  padding: "20px",
});

const FormTitle = styled(Box)({
  backgroundColor: "#c5c8d6",
  marginBottom: "15px",
  textAlign: "center",
  borderRadius: "5px 5px 0 0",
  padding: "8px",
});

const Form = styled("form")({
  textAlign: "center",
});

const EditStudentView = ({ formData, errors, handleChange, handleSubmit }) => {
  return (
    <Box>
      <Typography variant="h4" align="center" sx={{ mt: 3 }}>
        Edit Student
      </Typography>

      <FormContainer>
        <FormTitle>
          <Typography variant="h6">Edit a Student</Typography>
        </FormTitle>

        <Form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="firstname"
            value={formData.firstname || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.firstname}
            helperText={errors.firstname}
            required
          />

          <TextField
            label="Last Name"
            name="lastname"
            value={formData.lastname || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.lastname}
            helperText={errors.lastname}
            required
          />

          <TextField
            label="Campus ID"
            name="campusId"
            value={formData.campusId || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.campusId}
            helperText={errors.campusId}
            type="number"
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
            required
          />

          <TextField
            label="GPA"
            name="GPA"
            value={formData.GPA || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.GPA}
            helperText={errors.GPA}
            placeholder="0.0 - 4.0"
            type="number"
            inputProps={{ step: 0.01, min: 0, max: 4 }}
          />

          <TextField
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.imageUrl}
            helperText={errors.imageUrl}
          />

          <Box sx={{ marginTop: 3 }}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Box>
        </Form>
      </FormContainer>
    </Box>
  );
};

export default EditStudentView;
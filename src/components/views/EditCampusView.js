/*==================================================
EditCampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the edit campus page.
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
  padding: "10px",
});

const EditCampusView = ({ formData, handleChange, handleSubmit, errors }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center", marginTop: 3 }}>
        New Campus
      </Typography>

      <FormContainer>
        <FormTitle>
          <Typography>Add a Campus</Typography>
        </FormTitle>

        <Form onSubmit={handleSubmit}>

          <TextField
            label="Name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            error={!!errors.address}
            helperText={errors.address}
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
          />

          <TextField
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.imageUrl}
            helperText={errors.imageUrl}
          />

          <Box sx={{ marginTop: 3, textAlign: "center" }}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </Form>
      </FormContainer>
    </Box>
  );
};

export default EditCampusView;
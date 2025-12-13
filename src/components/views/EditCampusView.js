/*==================================================
EditCampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the edit campus page.
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

const EditCampusView = ({name, address, description, imageUrl, handleChange, handleSubmit }) => {
  return (
    <Box>
      <Typography variant="h4">
        Edit Campus
      </Typography>

      <FormContainer>
        <FormTitle>
          <Typography>
            Edit a Campus
          </Typography>
        </FormTitle>

        <Form onSubmit={handleSubmit}>
          <Label htmlFor="name">Name:</Label>
          <Input type="text" name="name" value={name} onChange={handleChange} required />

          <Label htmlFor="address">Address:</Label>
          <Input type="text" name="address" value={address} onChange={handleChange} required />

          <Label htmlFor="description">Description:</Label>
          <Input type="text" name="description" value={description} onChange={handleChange} />

          <Label htmlFor="imageUrl">Image Url:</Label>
          <Input type="text" name="imageUrl" value={imageUrl} onChange={handleChange} />

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

export default EditCampusView;
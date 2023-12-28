import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
  Box,
  Typography,
} from '@mui/material';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [newCourse, setNewCourse] = useState({ title: '', price: '', image: null });
  const [updateCourse, setUpdateCourse] = useState({ title: '', price: '', image: null });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('title', newCourse.title);
    formData.append('price', newCourse.price);
    formData.append('image', newCourse.image);

    try {
      const response = await axios.post('http://localhost:3001/courses', formData);
      setCourses([...courses, response.data]);
      handleCloseModal();
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('title', updateCourse.title);
    formData.append('price', updateCourse.price);
    formData.append('image', updateCourse.image);

    try {
      const response = await axios.put(`http://localhost:3001/courses/${selectedCourseId}`, formData);
      const updatedCourses = courses.map((course) =>
        course._id === selectedCourseId ? response.data : course
      );
      setCourses(updatedCourses);
      handleCloseModal();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/courses/${id}`);
      const updatedCourses = courses.filter((course) => course._id !== id);
      setCourses(updatedCourses);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleUpdateCourse = (id) => {
    setSelectedCourseId(id);
    setIsUpdateModalOpen(true);

    const selectedCourse = courses.find((course) => course._id === id);
    setUpdateCourse({ title: selectedCourse.title, price: selectedCourse.price, image: null });
  };

  const handleAddCourse = () => {
    setIsUpdateModalOpen(true);
    setNewCourse({ title: '', price: '', image: null });
  };

  const handleCloseModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedCourseId(null);
    setNewCourse({ title: '', price: '', image: null });
    setUpdateCourse({ title: '', price: '', image: null });
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Admin Dashboard 
      </Typography>
      <Button variant="contained" color="success" onClick={handleAddCourse} mb={2}>
        Add Course
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.price}</TableCell>
                <TableCell>
                  <img
                    src={`http://localhost:3001/${course.image}`}
                    alt={course.title}
                    style={{ width: '100px', height: 'auto' }}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleUpdateCourse(course._id)}>
                    Update
                  </Button>
                  <Button variant="outlined" onClick={() => handleDeleteCourse(course._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={isUpdateModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <Typography variant="h6">{selectedCourseId ? 'Update Course' : 'Add New Course'}</Typography>
          <form>
            <TextField
              label="Title"
              value={selectedCourseId ? updateCourse.title : newCourse.title}
              onChange={(e) =>
                selectedCourseId
                  ? setUpdateCourse({ ...updateCourse, title: e.target.value })
                  : setNewCourse({ ...newCourse, title: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              value={selectedCourseId ? updateCourse.price : newCourse.price}
              onChange={(e) =>
                selectedCourseId
                  ? setUpdateCourse({ ...updateCourse, price: e.target.value })
                  : setNewCourse({ ...newCourse, price: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <input
              type="file"
              onChange={(e) =>
                selectedCourseId
                  ? setUpdateCourse({ ...updateCourse, image: e.target.files[0] })
                  : setNewCourse({ ...newCourse, image: e.target.files[0] })
              }
            />
            <Button
              variant="contained"
              onClick={selectedCourseId ? handleUpdate : handleCreate}
              style={{ marginTop: '16px', marginRight: '8px' }}
            >
              {selectedCourseId ? 'Update' : 'Create'}
            </Button>
            <Button variant="outlined" onClick={handleCloseModal}>
              Close
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminCourses;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();  // Get task ID from URL if editing
  const navigate = useNavigate();

  // Fetch task details if editing
  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const token = localStorage.getItem('token') || sessionStorage.getItem('token');
          const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const { title, description, category } = response.data;
          setTitle(title);
          setDescription(description);
          setCategory(category);
        } catch (error) {
          setErrorMessage('Error fetching task details');
        }
      };

      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Clear previous messages
    setSuccessMessage('');
    setErrorMessage('');
  
    // Retrieve the token from localStorage or sessionStorage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (!token) {
      setErrorMessage("You're not authenticated. Please log in first.");
      return;
    }
  
    try {
      // Send the token as part of the Authorization header
      const response = await axios.post('http://localhost:5000/api/tasks', 
        {
          title,
          category,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`  // Ensure Bearer token format is correct
          }
        }
      );
  
      setSuccessMessage('Task added successfully!');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error adding/updating task. Please try again.');
    }
  };

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold pt-3 m-0">
          <span className="text-muted fw-light">Task Management System</span>
        </h4>
        <hr className="my-3" />
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <h5 className="card-header">{id ? 'Edit Task' : 'Add Task'}</h5>
              <div className="card-body">
                {/* Success and Error Messages */}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-sm-12 mb-3">
                      <label htmlFor="Title">Give Title</label>
                      <input
                        type="text"
                        className="form-control w-50"
                        placeholder="Give Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-12 mb-3">
                      <label htmlFor="category">Category</label>
                      <input
                        type="text"
                        className="form-control w-50"
                        placeholder="Give Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-12 mb-3">
                      <label htmlFor="description">Add Description</label>
                      <textarea
                        type="text"
                        className="form-control"
                        rows={3}
                        name="description"
                        value={description}
                        placeholder="This is a XYZ task"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <button type="submit" className="btn btn-primary me-2">
                        {id ? 'Update Task' : 'Add Task'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-backdrop fade" />
    </div>
  );
};

export default AddTask;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewTask = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            if (!token) {
                setError("You're not authenticated. Please log in.");
                return;
            }

            try {
                // Fetch tasks from the backend
                const response = await axios.get('http://localhost:5000/api/tasks', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTasks(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching tasks. Please try again.');
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleDelete = async (taskId) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        try {
            await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Remove deleted task from the state
            setTasks(tasks.filter((task) => task._id !== taskId));
        } catch (error) {
            setError('Error deleting task. Please try again.');
        }
    };

    if (loading) {
        return <p>Loading tasks...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold pt-3 m-0"><span className="text-muted fw-light">Task Management System</span></h4>
                <hr className="my-3" />
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <h5 className="card-header">View Tasks</h5>
                            <div className="card-body">
                                <div className="table-responsive text-nowrap">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th><h4>Title</h4></th>
                                                <th><h4>Category</h4></th>
                                                <th><h4>Task Description</h4></th>
                                                <th><h4>Task Activity</h4></th>
                                                <th><h4>Actions</h4></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tasks.map((task) => (
                                                <tr key={task._id}>
                                                    <td><strong>{task.title}</strong></td>
                                                    <td>{task.category}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <span className={`badge bg-label-${task.completed ? 'success' : 'primary'} me-1`}>
                                                            {task.completed ? 'Completed' : 'Active'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                <i className="bx bx-dots-vertical-rounded" />
                                                            </button>
                                                            <div className="dropdown-menu">
                                                                <a className="dropdown-item" href={`/editTask/${task._id}`}>
                                                                    <i className="bx bx-edit-alt me-1" /> Edit
                                                                </a>
                                                                <a className="dropdown-item" href="javascript:void(0);" onClick={() => handleDelete(task._id)}>
                                                                    <i className="bx bx-trash me-1" /> Delete
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-backdrop fade" />
        </div>
    );
};

export default ViewTask;

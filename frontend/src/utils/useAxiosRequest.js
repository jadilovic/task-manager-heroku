import axios from 'axios';
import { getUserToken } from '../auth/Authentication';

const useAxiosRequest = () => {
	const createUser = async (userCredentials) => {
		return axios({
			method: 'POST',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/signup`,
			data: {
				firstName: userCredentials.firstName,
				lastName: userCredentials.lastName,
				email: userCredentials.email,
				password: userCredentials.password,
			},
			headers: new Headers({ 'Content-Type': 'application/json' }),
		}).then((res) => {
			return res.data;
		});
	};

	const userLogin = async (userCredentials) => {
		return axios({
			method: 'POST',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/login`,
			data: {
				email: userCredentials.email,
				password: userCredentials.password,
			},
			headers: new Headers({ 'Content-Type': 'application/json' }),
		}).then((res) => {
			return res.data;
		});
	};

	const getAllTasks = async () => {
		return axios({
			method: 'GET',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks`,
			headers: {
				authorization: `Bearer ${getUserToken()}`,
			},
		}).then((res) => {
			return res.data.tasks;
		});
	};

	const createTask = async (newTask) => {
		await axios({
			method: 'POST',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks`,
			data: {
				newTask,
			},
			headers: {
				authorization: `Bearer ${getUserToken()}`,
			},
		}).then((res) => {
			console.log('task created: ', res.data);
		});
	};

	const getTask = async (taskId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		return axios
			.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/tasks/${taskId}`, {
				headers,
			})
			.then((res) => {
				return res.data;
			});
	};

	const updateTask = async (editedTask) => {
		const { _id, name, currentStatus, description, avatarColor, avatarIcon } =
			editedTask;
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		return axios
			.patch(
				`${process.env.REACT_APP_SERVER_URL}/api/v1/tasks/${_id}`,
				{ name, currentStatus, description, avatarColor, avatarIcon },
				{
					headers,
				}
			)
			.then((res) => {
				return res.data;
			});
	};

	const getTaskStatuses = async () => {
		try {
			return axios({
				method: 'GET',
				url: `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks/status`,
				headers: {
					authorization: `Bearer ${getUserToken()}`,
				},
			}).then((res) => {
				return res.data.statuses;
			});
		} catch (err) {
			console.log(err.response);
			return err.response.data.msg;
		}
	};

	const deleteTask = async (taskId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		try {
			await axios
				.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/tasks/${taskId}`, {
					headers,
				})
				.then((res) => {
					console.log('task deleted: ', res.data);
				});
		} catch (err) {
			console.log(err.response);
		}
	};

	const filterTasks = async (iconFilters, statusFilters) => {
		try {
			return axios({
				method: 'POST',
				url: `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks/filters`,
				data: {
					iconFilters,
					statusFilters,
				},
				headers: {
					authorization: `Bearer ${getUserToken()}`,
				},
			}).then((res) => {
				return res.data.filteredTasks;
			});
		} catch (err) {
			console.log(err.response);
			return err.response.data.msg;
		}
	};

	return {
		getTaskStatuses,
		deleteTask,
		getAllTasks,
		createTask,
		getTask,
		createUser,
		userLogin,
		updateTask,
		filterTasks,
	};
};

export default useAxiosRequest;

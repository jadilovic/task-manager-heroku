import axios from 'axios';
import { getUserToken } from '../auth/Authentication';

console.log('env ', process.env.REACT_APP_SERVER_URL);

const createUser = async (userCredentials) => {
	let userData = await axios({
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
	return userData;
};

const userLogin = async (userCredentials) => {
	let userData = await axios({
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
	return userData;
};

const useAxiosRequest = () => {
	const getAllTasks = async () => {
		const tasks = await axios({
			method: 'GET',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks`,
			headers: {
				authorization: `Bearer ${getUserToken()}`,
			},
		}).then((res) => {
			return res.data.tasks;
		});
		return tasks;
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

	// TO DO
	const getTask = async (taskName) => {};

	const getTaskStatuses = async () => {
		let taskStatuses = [];
		try {
			await axios({
				method: 'GET',
				url: `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks/status`,
				headers: {
					authorization: `Bearer ${getUserToken()}`,
				},
			}).then((res) => {
				console.log('task statuses axios', res.data.statuses);
				taskStatuses = res.data.statuses;
			});
		} catch (err) {
			console.log(err.response);
			return err.response.data.msg;
		}
		return taskStatuses;
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

	return {
		getTaskStatuses,
		deleteTask,
		getAllTasks,
		createTask,
		getTask,
		createUser,
		userLogin,
	};
};

export default useAxiosRequest;

import axios from 'axios';
import { getUserToken } from '../auth/Authentication';
const serverURL = 'http://localhost:5000';

const useAxiosRequest = () => {
	const getAllTasks = async () => {
		const tasks = await axios({
			method: 'GET',
			url: `${serverURL}/api/v1/tasks`,
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
			url: `${serverURL}/api/v1/tasks`,
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

	const getTaskStatuses = async () => {
		let taskStatuses = [];
		try {
			await axios({
				method: 'GET',
				url: `${serverURL}/api/v1/tasks/status`,
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
				.delete(`${serverURL}/api/v1/tasks/${taskId}`, {
					headers,
				})
				.then((res) => {
					console.log('task deleted: ', res.data);
				});
		} catch (err) {
			console.log(err.response);
		}
	};

	return { getTaskStatuses, deleteTask, getAllTasks, createTask };
};

export default useAxiosRequest;

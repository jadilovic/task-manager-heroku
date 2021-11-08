import React from 'react';

const useLocalStorageHook = () => {
	const getAllTasks = () => {
		return JSON.parse(localStorage.getItem('tasks') || '[]');
	};

	const saveCurrentTaskName = (taskName) => {
		localStorage.setItem('currentTaskName', taskName);
	};

	const saveCurrentTaskObject = (player) => {
		localStorage.setItem('currentTask', JSON.stringify(player));
	};

	const getCurrentTaskObject = () => {
		return JSON.parse(localStorage.getItem('currentTask'));
	};

	/*
  const getCurrentPlayer = () => {
    return JSON.parse(localStorage.getItem('currentPlayer'));
  };
*/
	const addNewTaskObjectToArrayAndSave = (newTask) => {
		const tasks = getAllTasks();
		tasks.unshift(newTask);
		localStorage.setItem('tasks', JSON.stringify(tasks));
	};

	const deleteTaskAndUpdateTasksList = (taskName) => {
		let tasksList = getAllTasks();
		tasksList = tasksList.filter((task) => task.name !== taskName);
		localStorage.setItem('tasks', JSON.stringify(tasksList));
	};

	/*
  const saveCurrentPlayerObject = (player) => {
    localStorage.setItem('currentPlayer', JSON.stringify(player));
  };

  const increaseCurrentPlayerLevelAndAddScoreAndUpdateDatabase = (
    scoreCount,
    level
  ) => {
    const currentPlayer = getCurrentPlayer();
    const updateCurrentPlayer = {
      ...currentPlayer,
      level: level,
      score: scoreCount,
    };
    localStorage.setItem('currentPlayer', JSON.stringify(updateCurrentPlayer));
    const players = getAllPlayers();
    const currentPlayerIndex = players.findIndex(
      (player) => player.name == currentPlayer.name
    );
    players[currentPlayerIndex].level = level;
    players[currentPlayerIndex].score = scoreCount;
    localStorage.setItem('players', JSON.stringify(players));
  };

	const addUpdatedCurrentTaskToArrayAndSave = (currentTask) => {
		const tasks = getAllTasks();
		const currentTaskIndex = tasks.findIndex(
			(task) => task.name == currentTask.name
		);
		tasks[currentTaskIndex] = currentTask;
		localStorage.setItem('tasks', JSON.stringify(tasks));
	};

	const getCurrentTaskObject = (taskName) => {
		const tasks = getAllTasks();
		const currentTaskIndex = tasks.findIndex((task) => task.name == taskName);
		return tasks[currentTaskIndex];
	};

	
  const restartCurrentPlayerLevelAndScoreAndUpdateDatabase = (
    currentPlayer
  ) => {
    const updateCurrentPlayer = {
      ...currentPlayer,
      level: 0,
      score: 0,
    };
    localStorage.setItem('currentPlayer', JSON.stringify(updateCurrentPlayer));
    addUpdatedCurrentPlayerToArrayAndSave(updateCurrentPlayer);
  };
*/

	return {
		getAllTasks,
		addNewTaskObjectToArrayAndSave,
		deleteTaskAndUpdateTasksList,
		saveCurrentTaskName,
		getCurrentTaskObject,
		saveCurrentTaskObject,
	};
};

export default useLocalStorageHook;

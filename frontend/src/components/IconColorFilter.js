import React, { useState } from 'react';
import useAxiosRequest from '../utils/useAxiosRequest';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { Checkbox, Paper, Button, Grid, Container } from '@mui/material';
import colors from '../data/colors';
import icons from '../data/icons';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

export default function IconColorFilter(props) {
	const mongoDB = useAxiosRequest();
	const { tasks, setFilteredTasks } = props;
	const [selectedColors, setSelectedColors] = useState([]);
	const [selectedIcons, setSelectedIcons] = useState([]);

	const handleChange = (event) => {
		const {
			target: { value, name },
		} = event;
		if (name === 'color') {
			setSelectedColors(
				// On autofill we get a the stringified value.
				typeof value === 'string' ? value.split(',') : value
			);
		} else {
			setSelectedIcons(
				// On autofill we get a the stringified value.
				typeof value === 'string' ? value.split(',') : value
			);
		}
	};

	const handleFilter = async () => {
		const filteredTasks = await mongoDB.filterTasks(selectedColors);
		console.log(filteredTasks);
		// let filteredTasks = [...tasks];
		// if (selectedIcons.length > 0) {
		// 	let iconFilter = [];
		// 	selectedIcons.forEach((selectedIcon) => {
		// 		const filter = filteredTasks.filter(
		// 			(task) => task.avatarIcon === selectedIcon
		// 		);
		// 		iconFilter = iconFilter.concat(filter);
		// 	});
		// 	filteredTasks = iconFilter;
		// }
		// if (selectedColors.length > 0) {
		// 	let colorFilter = [];
		// 	selectedColors.forEach((selectedColor) => {
		// 		const filter = filteredTasks.filter(
		// 			(task) => task.avatarColor === selectedColor
		// 		);
		// 		colorFilter = colorFilter.concat(filter);
		// 	});
		// 	filteredTasks = colorFilter;
		// }
		setFilteredTasks(filteredTasks);
	};

	const clearFilter = () => {
		setSelectedColors([]);
		setSelectedIcons([]);
		setFilteredTasks(tasks);
	};

	return (
		<Paper
			component="form"
			sx={{
				p: '2px 4px',
				display: 'flex',
				alignItems: 'center',
				width: '100%',
			}}
		>
			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel id="demo-multiple-checkbox-label">Icons filter</InputLabel>
				<Select
					labelId="demo-multiple-checkbox-label"
					id="demo-multiple-checkbox"
					multiple
					name="icon"
					value={selectedIcons}
					onChange={handleChange}
					input={<OutlinedInput label="Icons filter" />}
					renderValue={(selected) => selected.join(', ')}
					MenuProps={MenuProps}
				>
					{icons.map((icon) => (
						<MenuItem key={icon.name} value={icon.name}>
							<Checkbox
								checked={selectedIcons.findIndex((i) => i === icon.name) > -1}
							/>
							{icon.icon}
							<ListItemText primary={icon.name} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel id="demo-multiple-checkbox-label">Colors filter</InputLabel>
				<Select
					labelId="demo-multiple-checkbox-label"
					id="demo-multiple-checkbox"
					multiple
					name="color"
					value={selectedColors}
					onChange={handleChange}
					input={<OutlinedInput label="Colors filter" />}
					renderValue={(selected) => selected.join(', ')}
					MenuProps={MenuProps}
				>
					{colors.map((color) => (
						<MenuItem
							key={color.hex}
							value={color.name}
							style={{ backgroundColor: color.hex, color: 'white' }}
						>
							<Checkbox
								checked={selectedColors.findIndex((c) => c === color.name) > -1}
							/>
							<ListItemText primary={color.name} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<Button variant="contained" onClick={() => handleFilter()}>
				Start filter
			</Button>
			<Button variant="contained" onClick={() => clearFilter()}>
				Clear filter
			</Button>
		</Paper>
	);
}

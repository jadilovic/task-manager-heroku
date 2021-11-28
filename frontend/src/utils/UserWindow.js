import React, { useState, useEffect } from 'react';

export default function UserWindow() {
	const [screenSize, getDimension] = useState({
		dynamicWidth: window.innerWidth,
		dynamicHeight: window.innerHeight,
	});

	const setDimension = () => {
		getDimension({
			dynamicWidth: window.innerWidth,
			dynamicHeight: window.innerHeight,
		});
	};

	useEffect(() => {
		window.addEventListener('resize', setDimension);

		return () => {
			window.removeEventListener('resize', setDimension);
		};
	}, [screenSize]);

	return screenSize;
}

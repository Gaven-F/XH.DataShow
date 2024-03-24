import React, { useState, useEffect, useRef } from "react";

const BallComponent: React.FC = () => {
	const [balls, setBalls] = useState<
		{
			id: number;
			x: number;
			y: number;
			size: number;
			speedX: number;
			speedY: number;
		}[]
	>([]);
	const animationRef = useRef<number | null>(null);

	useEffect(() => {
		// Generate random balls
		const generateRandomBalls = () => {
			const newBalls = [];
			const numBalls = 15; // Number of balls
			const minSize = 10;
			const maxSize = 30;
			const screenWidth = window.innerWidth;
			const screenHeight = window.innerHeight;

			for (let i = 0; i < numBalls; i++) {
				const size = Math.floor(
					Math.random() * (maxSize - minSize + 1) + minSize,
				);
				const x = Math.random() * (screenWidth - size * 2) + size; // Random x within screen width
				const y = Math.random() * (screenHeight - size * 2) + size; // Random y within screen height
				const speedX = Math.random() * 4 - 2; // Random speedX between -1 and 1
				const speedY = Math.random() * 4 - 2; // Random speedY between -1 and 1
				newBalls.push({ id: i, x, y, size, speedX, speedY });
			}

			setBalls(newBalls);
		};

		generateRandomBalls();

		// Move balls
		const moveBalls = () => {
			setBalls((prevBalls) => {
				return prevBalls.map((ball) => {
					let { x, y, speedX, speedY, size } = ball;
					const screenWidth = window.innerWidth;
					const screenHeight = window.innerHeight;

					// Update position
					x += speedX;
					y += speedY;

					// Check collision with screen edges
					if (x <= size || x >= screenWidth - size) {
						speedX *= -1; // Reverse speedX
					}
					if (y <= size || y >= screenHeight - size) {
						speedY *= -1; // Reverse speedY
					}

					return { ...ball, x, y, speedX, speedY };
				});
			});

			animationRef.current = requestAnimationFrame(moveBalls);
		};

		animationRef.current = requestAnimationFrame(moveBalls);

		// Cleanup
		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, []);

	return (
		<div className="absolute inset-0 flex justify-center items-center overflow-hidden">
			{balls.map((ball) => (
				<div
					key={ball.id}
					className="absolute rounded-full bg-gradient-to-b from-blue-400 to-purple-500 shadow-lg"
					style={{
						width: `${ball.size}px`,
						height: `${ball.size}px`,
						left: `${ball.x}px`,
						top: `${ball.y}px`,
					}}
				/>
			))}
		</div>
	);
};

export default BallComponent;

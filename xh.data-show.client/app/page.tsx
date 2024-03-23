"use client";

import { Button, Card, ConfigProvider, theme } from "antd";
import { DarkTheme } from "./ui/ant/dark";

export default function App() {
	return (
		<DarkTheme>
			<Card>
				<Button type="primary">Hello</Button>
				<Button type="default">Hello</Button>
				<Button type="dashed">Hello</Button>
				<Button type="link">Hello</Button>
				<Button type="text">Hello</Button>

				<Button
					danger
					type="primary">
					Hello
				</Button>
				<Button
					danger
					type="default">
					Hello
				</Button>
				<Button
					danger
					type="dashed">
					Hello
				</Button>
				<Button
					danger
					type="link">
					Hello
				</Button>
				<Button
					danger
					type="text">
					Hello
				</Button>
			</Card>
		</DarkTheme>
	);
}

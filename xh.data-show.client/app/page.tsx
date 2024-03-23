"use client";

import { DarkTheme } from "@/ui/ant/dark";
import { Header } from "@/ui/layout/header";
import { Card, Flex } from "antd";

export default function App() {
	return (
		<DarkTheme compact>
			<Flex
				className="h-full"
				vertical
				gap={16}>
				<Card styles={{ body: { height: "100%" } }}>
					<Header />
				</Card>

				<Card
					className="flex-1"
					styles={{ body: { height: "100%" } }}>
					<div className=" w-[600px] h-[700px] ">
						Hello
					</div>

				</Card>
			</Flex>
		</DarkTheme>
	);
}

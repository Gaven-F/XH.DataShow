"use client";

import { DarkTheme } from "@/ui/ant/dark";
import { Header } from "@/ui/layout/header";
import { Card, Col, Flex, Row, Table } from "antd";
import { CardProps } from "antd/lib/card";

const CARD_HEIGHT_FULL: CardProps["styles"] = {
	body: { height: "100%" },
};

export default function App() {
	return (
		<DarkTheme compact>
			<div className="absolute">HELLO</div>
			<Flex
				className="h-full backdrop-blur-sm backdrop-brightness-105 backdrop-contrast-125"
				vertical
				gap={16}>
				<Card styles={{ body: { height: "100%" } }}>
					<Header />
				</Card>

				<Card
					className="flex-1"
					styles={{ body: { height: "100%" } }}>
					<Row
						gutter={8}
						className="h-full">
						<Col span={6}>
							<div className="border_style_2 h-full">
								<Flex
									vertical
									gap={8}
									className="h-full">
									<div className="text-lg font-bold border-0 py-2 mr-4 border-b-2 border-b-color [border-style:groove]">
										实时数据监控
									</div>
									<Card
										className="h-full border-b-color"
										styles={CARD_HEIGHT_FULL}></Card>
									<Card
										className="h-full border-b-color"
										styles={CARD_HEIGHT_FULL}></Card>
									<Card
										className="h-full border-b-color"
										styles={CARD_HEIGHT_FULL}></Card>
								</Flex>
							</div>
						</Col>
						<Col span={12}>
							<Flex
								vertical
								gap={8}
								className="h-full">
								<Card
									className="flex-[3] shrink-0 border-8 border-b-color [border-style:inset]"
									styles={CARD_HEIGHT_FULL}>
									<Table className="h-full" />
								</Card>
								<div className="flex-[2] shrink-0 border-[16px] border-b-color bg-opacity-50 bg-slate-900 [border-style:inset]">
									<Card
										className="h-full"
										styles={CARD_HEIGHT_FULL}></Card>
								</div>
							</Flex>
						</Col>
						<Col span={6}>
							<Flex
								vertical
								className="h-full"
								gap={8}>
								<div className="border_style_2 h-full"></div>
								<div className="border_style_2 h-full"></div>
							</Flex>
						</Col>
					</Row>
				</Card>
			</Flex>
		</DarkTheme>
	);
}

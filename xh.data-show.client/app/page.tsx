"use client";

import { CustomTable } from "@/ui/ant/customTable";
import { DarkTheme } from "@/ui/ant/dark";
import { GFCard } from "@/ui/gfCard";
import { Header } from "@/ui/layout/header";
import { SystemStatus } from "@/ui/systemStatsu";
import { TAHChart } from "@/ui/tahChart";
import {
	HeatMapOutlined,
	PoweroffOutlined,
	ReloadOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, ConfigProvider, Flex, Row } from "antd";

export default function App() {
	return (
		<DarkTheme compact>
			<div className="h-full flex flex-col backdrop-blur-sm backdrop-brightness-105 backdrop-contrast-125">
				<div className="relative p-2">
					<Header />
				</div>

				<div className="basis-full h-0 p-2">
					<div className="h-full flex gap-4">
						<div className="h-full basis-1/4">
							<div className="border_style_2 h-full">
								<div className="h-full flex flex-col gap-2">
									<div className="text-lg font-bold border-0 py-2 mr-4 border-b-2 border-b-color">
										实时数据监控
									</div>
									<GFCard title="实验室温湿度状态">
										<TAHChart />
									</GFCard>
									<GFCard title="工程师在线状态">
										<CustomTable />
									</GFCard>
									<GFCard title="控制中心">
										<ConfigProvider componentSize="large">
											<Flex
												align="center"
												justify="space-between"
												wrap="wrap"
												gap={8}>
												<Button icon={<HeatMapOutlined />}>
													登录后台数据管理
												</Button>
												<Button icon={<ReloadOutlined />}>数据刷新</Button>
												<Button
													className="w-full"
													icon={<PoweroffOutlined />}
													danger>
													关闭系统
												</Button>
											</Flex>
										</ConfigProvider>
									</GFCard>
								</div>
							</div>
						</div>

						<div className="h-full w-0 basis-1/2">
							<div className="h-full w-full grid grid-rows-2">
								<div className="h-full w-full box-border border-8 border-b-color [border-style:inset]">
									<GFCard title={"订单中心"}>
										<CustomTable />
									</GFCard>
								</div>
								<div className="h-full w-full box-border border-[16px] border-b-color bg-opacity-50 bg-slate-900 [border-style:inset]">
									<GFCard title={"设备状态"}>
										<SystemStatus />
									</GFCard>
								</div>
							</div>
						</div>

						<div className="h-full basis-1/4">
							<Flex
								vertical
								className="h-full"
								gap={8}>
								<div className="border_style_2 h-full"></div>
								<div className="border_style_2 h-full"></div>
							</Flex>
						</div>
					</div>
				</div>
			</div>
		</DarkTheme>
	);
}

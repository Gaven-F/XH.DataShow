"use client";

import { OrderDataV2 } from "@/assets/json/data";
import { CustomTable } from "@/ui/ant/customTable";
import { DarkTheme } from "@/ui/ant/dark";
import { GFCard } from "@/ui/gfCard";
import BallComponent from "@/ui/layout/bg";
import { Header } from "@/ui/layout/header";
import { TAHChart } from "@/ui/tahChart";
import { UseTimeLine } from "@/ui/useTimeLine";
import { Tag } from "antd";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

const WorkerData = [
	{ name: "刘莉", workTime: 8, state: true, tel: "155****7210" },
	{ name: "覃华孟", workTime: 6, state: true, tel: "199****1744" },
	{ name: "何其松", workTime: 8, state: true, tel: "199****1733" },
	{ name: "林爽", workTime: 6, state: true, tel: "136****3832" },
	{ name: "贺志奇", workTime: 5, state: true, tel: "184****5795" },
	{ name: "范宇", workTime: 4, state: true, tel: "157****8954" },
	{ name: "杨浩", workTime: 7, state: true, tel: "187****4286" },
	{ name: "文召", workTime: 6, state: true, tel: "136****6007" },
	{ name: "徐研", workTime: 4, state: true, tel: "185****6283" },
].map((item, index) => ({ id: index, ...item }));

export default function App() {
	return (
		<DarkTheme compact>
			<BallComponent />
			<div className="h-full w-full flex flex-col backdrop-blur backdrop-brightness-105 backdrop-contrast-125">
				<div className="relative p-2">
					<Header />
				</div>

				<div className="basis-full flex-1 h-full p-2">
					<div className="h-full w-full flex flex-row gap-4">
						<div className="h-full basis-1/4 flex-1">
							<div className="border_style_2 h-full">
								<div className="h-full flex flex-col gap-2">
									<div className="text-lg font-bold border-0 py-2 mr-4 border-b-2 border-b-color">实时数据监控</div>
									<GFCard title="实验室温湿度状态">
										<TAHChart />
									</GFCard>
									<GFCard title="设备租用时长统计">
										<UseTimeLine />
									</GFCard>
								</div>
							</div>
						</div>

						<div className="h-full w-0 basis-1/2 flex-1">
							<div className="h-full flex flex-col">
								<div className="h-0 basis-full box-border border-8 border-b-color [border-style:inset]">
									<GFCard title={"共享设备清单"}>
										<CustomTable
											columns={[
												{
													title: "序号",
													width: 50,
													render: (_v, _r, i) => <div suppressHydrationWarning>{i + 1}</div>,
												},
												{
													title: "设备名称",
													dataIndex: "name",
													render: (v) => <div suppressHydrationWarning>{v}</div>,
												},
												{
													title: "型号",
													dataIndex: "num",
													render: (v) => <div suppressHydrationWarning>{v}</div>,
												},
												{
													title: "状态",
													dataIndex: "state",
													render: (v) => (
														<>
															{(v && (
																<Tag
																	color="volcano"
																	suppressContentEditableWarning>
																	在库
																</Tag>
															)) || (
																<Tag
																	color="geekblue"
																	suppressContentEditableWarning>
																	租借中
																</Tag>
															)}
														</>
													),
												},
												{
													title: "使用方",
													dataIndex: "user",
													width: 280,
													render: (v) => <div suppressHydrationWarning>{v}</div>,
												},
												{
													title: "出库时间",
													dataIndex: "time",
													render: (v) => <div suppressHydrationWarning>{v}</div>,
												},
											]}
											dataSource={OrderDataV2}
										/>
									</GFCard>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DarkTheme>
	);
}

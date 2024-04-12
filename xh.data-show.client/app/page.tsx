"use client";

import { CustomTable } from "@/ui/ant/customTable";
import { DarkTheme } from "@/ui/ant/dark";
import { GFCard } from "@/ui/gfCard";
import BallComponent from "@/ui/layout/bg";
import { Header } from "@/ui/layout/header";
import { OrderOriginCart } from "@/ui/orderOrigin";
import { TAHChart } from "@/ui/tahChart";
import { UseTimeLine } from "@/ui/useTimeLine";
import {
	HeatMapOutlined,
	PoweroffOutlined,
	ReloadOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Flex, Tag } from "antd";
import dayjs from "dayjs";
import { padStart, random, sample, times } from "lodash";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
									<div className="text-lg font-bold border-0 py-2 mr-4 border-b-2 border-b-color">
										实时数据监控
									</div>
									<GFCard title="实验室温湿度状态">
										<TAHChart />
									</GFCard>
									<GFCard title="工程师在线状态">
										<CustomTable
											columns={[
												{
													title: "序号",
													width: 60,
													render: (_v, _r, i) => (
														<div suppressHydrationWarning>{i + 1}</div>
													),
												},
												{
													title: "名字",
													dataIndex: "id",
													render: (v) => (
														<div suppressHydrationWarning>{v}</div>
													),
												},
												{
													title: "打卡时间",
													dataIndex: "unit",
													render: (v) => (
														<div suppressHydrationWarning>{v}</div>
													),
												},
												{
													title: "状态",
													render: () => (
														<Tag color="geekblue" suppressHydrationWarning>
															在线
														</Tag>
													),
												},
											]}
											dataSource={times(3, (i) => ({
												id:
													sample([
														"张",
														"周",
														"李",
														"吴",
														"赵",
														"钱",
														"孙",
														"郑",
													]) + "XX",
												unit: dayjs()
													.add(-random(1), "hour")
													.add(-random(60), "minute")
													.format("HH:mm"),
											}))}
										/>
									</GFCard>
									<GFCard title="控制中心">
										<ConfigProvider componentSize="large">
											<Flex
												align="center"
												justify="space-between"
												wrap="wrap"
												gap={8}
											>
												<Button icon={<HeatMapOutlined />}>
													登录后台数据管理
												</Button>
												<Button icon={<ReloadOutlined />}>数据刷新</Button>
												<Button
													className="w-full"
													icon={<PoweroffOutlined />}
													danger
												>
													关闭系统
												</Button>
											</Flex>
										</ConfigProvider>
									</GFCard>
								</div>
							</div>
						</div>

						<div className="h-full w-0 basis-1/2 flex-1">
							<div className="h-full flex flex-col">
								<div className="h-0 basis-1/2 box-border border-8 border-b-color [border-style:inset]">
									<GFCard title={"订单中心"}>
										<CustomTable
											columns={[
												{
													title: "序号",
													render: (_v, _r, i) => (
														<div suppressHydrationWarning>{i + 1}</div>
													),
												},
												{
													title: "订单号",
													dataIndex: "id",
													render: (v) => (
														<div suppressHydrationWarning>{v}</div>
													),
												},
												{
													title: "发起公司",
													dataIndex: "unit",
													render: (v) => (
														<div suppressHydrationWarning>{v}</div>
													),
												},
												{
													title: "状态",
													render: () => (
														<Tag color="volcano" suppressContentEditableWarning>
															未完成
														</Tag>
													),
												},
											]}
											dataSource={times(100, (i) => ({
												id: padStart(random(99999999).toString(), 8, "1"),
												unit:
													sample(["四川", "重庆", "云南"]) +
													"XXX" +
													sample(["科技", "技术"]) +
													"有限公司",
											}))}
										/>
									</GFCard>
								</div>
								<div className="h-0 basis-1/2 box-border border-[16px] border-b-color bg-opacity-50 bg-slate-900 [border-style:inset]">
									<GFCard title={"设备状态"}>
										{/* <SystemStatus /> */}
										<Swiper
											className="h-full w-full"
											autoplay={{ delay: 5000 }}
											navigation
											spaceBetween={8}
											slidesPerView={1}
											virtual
											modules={[Virtual, Autoplay, Navigation]}
										>
											{times(100, (i) => (
												<SwiperSlide
													className="bg-sky-300 bg-opacity-25 !flex place-items-center place-content-center"
													virtualIndex={i}
													key={i}
												>
													<div>{i + 1}</div>
												</SwiperSlide>
											))}
										</Swiper>
									</GFCard>
								</div>
							</div>
						</div>

						<div className="h-full basis-1/4 flex-1">
							<Flex vertical className="h-full" gap={8}>
								<div className="border_style_2 h-full">
									<GFCard title="设备近三十日工作时长统计">
										<UseTimeLine />
									</GFCard>
								</div>
								<div className="border_style_2 h-full">
									<GFCard title="订单来源统计">
										<OrderOriginCart />
									</GFCard>
								</div>
							</Flex>
						</div>
					</div>
				</div>
			</div>
		</DarkTheme>
	);
}

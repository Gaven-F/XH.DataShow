"use client";

import { CustomTable } from "@/ui/ant/customTable";
import { DarkTheme } from "@/ui/ant/dark";
import { GFCard } from "@/ui/gfCard";
import BallComponent from "@/ui/layout/bg";
import { Header } from "@/ui/layout/header";
import { OrderOriginCart } from "@/ui/orderOrigin";
import { TAHChart } from "@/ui/tahChart";
import { UseTimeLine } from "@/ui/useTimeLine";
import { HeatMapOutlined, PoweroffOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Flex, Tag } from "antd";
import { times } from "lodash";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

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

export const OrderData = [
	{ number: "js0223002", unit: "高投芯未半导体有限公司", place: "四川省成都市", state: true },
	{ number: "js0223006", unit: "成都森未科技有限公司", place: "四川省成都市", state: true },
	{ number: "js0223015", unit: "电子科技大学", place: "四川省成都市", state: true },
	{ number: "js0223011", unit: "成都通量科技有限公司", place: "四川省成都市", state: true },
	{ number: "js0223008", unit: "成都复锦功率半导体技术发展有限公司", place: "四川省成都市", state: true },
	{ number: "js0223003", unit: "深圳市楠菲微电子有限公司 ", place: "广东省深圳市", state: true },
	{ number: "js0223013", unit: "成都奕成科技股份有限公司", place: "四川省成都市", state: true },
	{ number: "js0223012", unit: "成都探芯科技有限公司", place: "四川省成都市", state: true },
	{ number: "js0224005", unit: "西安紫光国芯半导体股份有限公司", place: "陕西省西安市", state: true },
	{ number: "js0224011", unit: "成都华微电子科技有限公司", place: "四川省成都市", state: true },
	{ number: "js0224008", unit: "晶艺半导体有限公司", place: "四川省成都市", state: true },
	{ number: "js0224009", unit: "重庆芯联半导体有限责任公司", place: "重庆市", state: true },
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
									<GFCard title="工程师在线状态">
										<CustomTable
											columns={[
												{
													title: "序号",
													width: 60,
													render: (_v, _r, i) => <div suppressHydrationWarning>{i + 1}</div>,
												},
												{
													title: "名字",
													dataIndex: "name",
													render: (v) => <div suppressHydrationWarning>{v}</div>,
												},
												{
													title: "工作时长",
													dataIndex: "workTime",
													render: (v) => <div suppressHydrationWarning>{v}H</div>,
												},
												{
													title: "状态",
													dataIndex: "state",
													render: (v) => (
														<>
															{(v && (
																<Tag
																	color="geekblue"
																	suppressHydrationWarning>
																	在线
																</Tag>
															)) || (
																<Tag
																	color="gold"
																	suppressHydrationWarning>
																	离线
																</Tag>
															)}
														</>
													),
												},
											]}
											dataSource={WorkerData}
										/>
									</GFCard>
									<GFCard title="控制中心">
										<ConfigProvider componentSize="large">
											<Flex
												align="center"
												justify="space-between"
												wrap="wrap"
												gap={8}>
												<Button icon={<HeatMapOutlined />}>登录后台数据管理</Button>
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

						<div className="h-full w-0 basis-1/2 flex-1">
							<div className="h-full flex flex-col">
								<div className="h-0 basis-1/2 box-border border-8 border-b-color [border-style:inset]">
									<GFCard title={"订单中心"}>
										<CustomTable
											columns={[
												{
													title: "序号",
													width: 50,
													render: (_v, _r, i) => <div suppressHydrationWarning>{i + 1}</div>,
												},
												{
													title: "订单号",
													dataIndex: "number",
													width: 100,
													render: (v) => <div suppressHydrationWarning>{v}</div>,
												},
												{
													title: "发起公司",
													dataIndex: "unit",
													render: (v) => <div suppressHydrationWarning>{v}</div>,
												},
												{
													title: "订单来源地",
													dataIndex: "place",
													width: 140,
													render: (v) => <div suppressHydrationWarning>{v}</div>,
												},
												{
													title: "状态",
													width: 80,
													dataIndex: "state",
													render: (v) => (
														<>
															{(v && (
																<Tag
																	color="geekblue"
																	suppressContentEditableWarning>
																	已完成
																</Tag>
															)) || (
																<Tag
																	color="volcano"
																	suppressContentEditableWarning>
																	未完成
																</Tag>
															)}
														</>
													),
												},
											]}
											dataSource={OrderData}
										/>
									</GFCard>
								</div>
								<div className="h-0 grow-0 basis-1/2 box-border border-[16px] border-b-color bg-opacity-50 bg-slate-900 [border-style:inset]">
									{/* <GFCard title={"设备状态"}> */}
									{/* <SystemStatus /> */}
									<Swiper
										className="!h-full w-full grow-0 "
										autoplay={{ delay: 3000 }}
										// navigation
										spaceBetween={8}
										slidesPerView={1}
										virtual
										modules={[Virtual, Autoplay, Navigation]}>
										{times(15, (i) => (
											<SwiperSlide
												className="bg-sky-300 !h-full w-full bg-opacity-25 !flex place-content-center place-items-center"
												virtualIndex={i}
												key={i}>
												<Image
													priority
													className="h-full w-full object-cover !max-h-[calc(40vh-40px)]"
													src={`/eqimg/eqimg${i + 1}.jpg`}
													width={1920}
													height={1}
													alt=""></Image>
											</SwiperSlide>
										))}
									</Swiper>
									{/* </GFCard> */}
								</div>
							</div>
						</div>

						<div className="h-full basis-1/4 flex-1">
							<Flex
								vertical
								className="h-full"
								gap={8}>
								<div className="border_style_2 h-full">
									<GFCard title="设备工作时长统计">
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

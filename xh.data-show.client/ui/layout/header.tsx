import { LoadingOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import "@/assets/font/index.css";

export function Header() {
	const [time, setTime] = useState<Dayjs>(dayjs());

	useEffect(() => {
		setInterval(() => {
			setTime(dayjs());
		}, 1000);
	}, []);

	return (
		<>
			<div className="text-3xl font-black absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-4 py-2 border_style_1">
				芯火实验室数据监控
			</div>

			<div className="flex justify-between items-center">
				<div className="flex place-content-center bg-primary bg-opacity-30 pr-3 pl-1 py-2 border_style_1 h-auto">
					<LoadingOutlined className="text-2xl -mr-2" />
					<LoadingOutlined className="text-2xl -mr-2" />
					<LoadingOutlined className="text-2xl -mr-2" />
					<LoadingOutlined className="text-2xl -mr-2" />
					<LoadingOutlined className="text-2xl -mr-2" />
					<LoadingOutlined className="text-2xl -mr-2" />
					<LoadingOutlined className="text-2xl -mr-2" />
					<LoadingOutlined className="text-2xl -mr-2" />
					<LoadingOutlined className="text-2xl -mr-2" />
					<LoadingOutlined className="text-2xl -mr-2" />
					<LoadingOutlined className="text-2xl -mr-2" />
					<LoadingOutlined className="text-2xl -mr-2" />
					<LoadingOutlined className="text-2xl -mr-2" />
					<LoadingOutlined className="text-2xl -mr-2" />
				</div>

				<div className="text-center text-base font-bold font-[DigifaceWide] border_style_1 px-2 py-1">
					<div suppressHydrationWarning>{time.format("YYYY MM DD")}</div>
					<div suppressHydrationWarning>{time.format("HH : mm : ss")}</div>
				</div>
			</div>
		</>
	);
}

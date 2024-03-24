import theme from "@/assets/json/echart_cyan.json";
import {
	BarSeriesOption,
	ComposeOption,
	DatasetComponentOption,
	GridComponentOption,
	LegendComponentOption,
	LineSeriesOption,
	TitleComponentOption,
} from "echarts";
import { BarChart, LineChart } from "echarts/charts";
import {
	DatasetComponent,
	GridComponent,
	LegendComponent,
	TitleComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { UniversalTransition } from "echarts/features";
import { SVGRenderer } from "echarts/renderers";
import { useEffect, useMemo, useRef } from "react";
import { ResizeObserver } from "@juggle/resize-observer";

interface Prop extends React.HTMLAttributes<HTMLDivElement> {}

export function TAHChart({ ...prop }: Prop) {
	const board = useRef<HTMLDivElement>(null);

	const observer = useMemo(() => {
		return new ResizeObserver((entries) => {
			echarts.getInstanceByDom(entries[0].target as HTMLElement)?.resize();
		});
	}, []);

	echarts.use([
		TitleComponent,
		BarChart,
		LineChart,
		GridComponent,
		LegendComponent,
		SVGRenderer,
		DatasetComponent,
		UniversalTransition,
	]);

	type Option = ComposeOption<
		| BarSeriesOption
		| LineSeriesOption
		| TitleComponentOption
		| GridComponentOption
		| DatasetComponentOption
		| LegendComponentOption
	>;

	const option = useMemo(
		() =>
			({
				xAxis: {},
				yAxis: { type: "category" },
				legend: {},
				series: [
					{ type: "bar", seriesLayoutBy: "row" },
					{ type: "bar", seriesLayoutBy: "row" },
				],
				dataset: {
					source: [
						[, "实验室一", "实验室二", "实验室三", "实验室四", "实验室五"],
						["温度", 12, 22, 12, 23, 23.2],
						["湿度", 45, 45, 23, 45, 23],
					],
				},
				grid: {
					left: "16%",
					top: "22%",
					bottom: "14%",
					right: "8%",
				},
			} as Option),
		[],
	);

	useEffect(() => {
		const chartDom = board.current;
		if (!chartDom) return;

		observer.observe(chartDom);

		const chart =
			echarts.getInstanceByDom(chartDom) || echarts.init(chartDom, theme);

		chart.setOption(option);
	}, [observer, option]);

	return (
		<div
			className={prop?.className + ` h-full`}
			ref={board}></div>
	);
}

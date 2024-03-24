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

interface Prop extends React.HTMLAttributes<HTMLDivElement> {}

export function BaseChart({ ...prop }: Prop) {
	const board = useRef<HTMLDivElement>(null);

	const observer = useMemo(
		() =>
			new ResizeObserver((entries) => {
				echarts.getInstanceByDom(entries[0].target as HTMLElement)?.resize();
			}),
		[],
	);

	echarts.use([
		TitleComponent,
		LineChart,
		BarChart,
		GridComponent,
		LegendComponent,
		SVGRenderer,
		DatasetComponent,
		UniversalTransition,
	]);

	type Option = ComposeOption<
		| LineSeriesOption
		| BarSeriesOption
		| TitleComponentOption
		| GridComponentOption
		| DatasetComponentOption
		| LegendComponentOption
	>;

	const option = useMemo(
		() =>
			({
				title: { text: "上周工作时间记录", right: "center" },
				xAxis: { type: "category" },
				yAxis: {},
				legend: { right: 0, top: "center", orient: "vertical" },
				series: [{ type: "line" }],
				dataset: {
					source: [
						{ name: "张三", 周一: 100, 周二: 120 },
						{ name: "李四", 周一: 300, 周二: 210 },
					],
				},
				grid: {
					left: "10%",
					top: "20%",
					bottom: "14%",
					right: "20%",
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

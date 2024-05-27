import { OrderData } from "@/app/page";
import theme from "@/assets/json/echart_cyan.json";
import { ResizeObserver } from "@juggle/resize-observer";
import {
	BarSeriesOption,
	ComposeOption,
	DataZoomComponentOption,
	DatasetComponentOption,
	GridComponentOption,
	LegendComponentOption,
	LineSeriesOption,
	TitleComponentOption,
} from "echarts";
import { BarChart, LineChart } from "echarts/charts";
import {
	DataZoomComponent,
	DatasetComponent,
	GridComponent,
	LegendComponent,
	TitleComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { UniversalTransition } from "echarts/features";
import { SVGRenderer } from "echarts/renderers";
import { groupBy } from "lodash";
import { useEffect, useMemo, useRef } from "react";

interface Prop extends React.HTMLAttributes<HTMLDivElement> {}

export function OrderOriginCart({ ...prop }: Prop) {
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
		BarChart,
		GridComponent,
		LegendComponent,
		SVGRenderer,
		DatasetComponent,
		DataZoomComponent,
		UniversalTransition,
	]);

	type Option = ComposeOption<
		| BarSeriesOption
		| DataZoomComponentOption
		| TitleComponentOption
		| GridComponentOption
		| DatasetComponentOption
		| LegendComponentOption
	>;

	const option = useMemo(
		() =>
			({
				xAxis: {},
				yAxis: { type: "category", axisLabel: { rotate: 40 } },
				series: [{ type: "bar", name: "订单量", label: { show: true } }],
				dataZoom: [
					{
						type: "inside",
						yAxisIndex: 0,
						minValueSpan: 6,
						maxValueSpan: 6,
						zoomLock: true,
					},
					{
						type: "slider",
						yAxisIndex: 0,
						minValueSpan: 6,
						maxValueSpan: 6,
						zoomLock: true,
						orient: "horizontal",
					},
				],
				dataset: {
					source: Object.entries(groupBy(OrderData, (it) => it.place)).map(([key, value]) => ({
						name: key,
						订单量: value.length,
					})),
				},
				grid: {
					left: "20%",
					top: "14%",
					bottom: "28%",
					right: "4%",
				},
			} as Option),
		[],
	);

	useEffect(() => {
		const chartDom = board.current;
		if (!chartDom) return;

		observer.observe(chartDom);

		const chart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom, theme);

		chart.setOption(option);
	}, [observer, option]);

	return (
		<div
			className={prop?.className + ` h-full`}
			ref={board}></div>
	);
}

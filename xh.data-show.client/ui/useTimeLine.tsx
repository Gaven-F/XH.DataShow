import theme from "@/assets/json/echart_cyan.json";
import { ResizeObserver } from "@juggle/resize-observer";
import dayjs from "dayjs";
import {
	BarSeriesOption,
	ComposeOption,
	DatasetComponentOption,
	GridComponentOption,
	LegendComponentOption,
	LineSeriesOption,
	TitleComponentOption,
} from "echarts";
import { BarChart, LineChart, ScatterChart, ScatterSeriesOption } from "echarts/charts";
import { DatasetComponent, GridComponent, LegendComponent, TitleComponent } from "echarts/components";
import * as echarts from "echarts/core";
import { UniversalTransition } from "echarts/features";
import { SVGRenderer } from "echarts/renderers";
import { concat, random, round, times } from "lodash";
import { useEffect, useMemo, useRef } from "react";

interface Prop extends React.HTMLAttributes<HTMLDivElement> {}

const XData = [
	"SPECTRAN V6 PLUS",
	"2612B",
	"TIVP02",
	"VNA5000A",
	"MSO58B 5-BW-2000",
	"2722",
	"16804A",
	"2430",
	"33250A",
	"34405A",
	"33220A",
];
const YData = [20, 120, 0, 60, 120, 0, 0, 0, 0, 0, 0];

export function UseTimeLine({ ...prop }: Prop) {
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
		LineChart,
		ScatterChart,
		GridComponent,
		LegendComponent,
		SVGRenderer,
		DatasetComponent,
		UniversalTransition,
	]);

	type Option = ComposeOption<
		| BarSeriesOption
		| LineSeriesOption
		| ScatterSeriesOption
		| TitleComponentOption
		| GridComponentOption
		| DatasetComponentOption
		| LegendComponentOption
	>;

	const dataCnt = { dateCnt: 30, systemCnt: 5 };

	const dateData = times(dataCnt.dateCnt, (i) =>
		dayjs()
			.add(-i - 1, "day")
			.format("MM-DD"),
	).reverse();

	const systemData = times(dataCnt.systemCnt, (i) => {
		return dateData.map((it) => [it, round(random(5) + random(4) + random(3) * random(1, 2, true) + random(2), 1)]);
	});

	const option = useMemo(
		() =>
			({
				xAxis: [
					{
						type: "category",
						data: XData,
						gridIndex: 0,
						minInterval: 1,
						axisLabel: { rotate: 45 },
					},
				],
				yAxis: [{ gridIndex: 0, max: 160 }],
				legend: { top: "10%", type: "scroll" },
				series: [
					{ data: YData, type: "bar" },
					{ data: YData, type: "line" },
				],
				grid: [
					{
						left: "12%",
						top: "16%",
						bottom: "40%",
						right: "4%",
					},
				],
			} as Option),
		[],
	);

	const options = useMemo(
		() =>
			({
				xAxis: [
					{
						type: "category",
						data: dateData,
						gridIndex: 0,
					},
					{
						type: "category",
						data: dateData,
						gridIndex: 1,
					},
				],
				yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
				legend: { top: "10%", type: "scroll" },
				series: concat(
					systemData.map(
						(it, i) =>
							({
								name: "设备" + String.fromCharCode(65 + i),
								type: "bar",
								data: it,
								// symbolSize: (v) => min([max([v[1] * 1.5, 5]), 30]),
							} as BarSeriesOption | LineSeriesOption),
					),
					systemData.map((it, i) => ({
						name: "设备" + String.fromCharCode(65 + i),
						type: "line",
						yAxisIndex: 1,
						xAxisIndex: 1,
						data: it,
					})),
				),
				grid: [
					{
						left: "10%",
						top: "20%",
						bottom: "55%",
						right: "4%",
					},
					{
						left: "10%",
						top: "55%",
						bottom: "20%",
						right: "4%",
					},
				],
			} as Option),
		[dateData, systemData],
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

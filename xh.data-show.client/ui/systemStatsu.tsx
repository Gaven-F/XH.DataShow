import theme from "@/assets/json/echart_cyan.json";
import {
	ComposeOption,
	DatasetComponentOption,
	GridComponentOption,
	LegendComponentOption,
	TitleComponentOption,
	TreemapSeriesOption,
} from "echarts";
import { TreemapChart } from "echarts/charts";
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

export function SystemStatus({ ...prop }: Prop) {
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
		TreemapChart,
		GridComponent,
		LegendComponent,
		SVGRenderer,
		DatasetComponent,
		UniversalTransition,
	]);

	type Option = ComposeOption<
		| TreemapSeriesOption
		| TitleComponentOption
		| GridComponentOption
		| DatasetComponentOption
		| LegendComponentOption
	>;

	const option = useMemo(() => {
		return {
			series: {
				visibleMin: 1,
				type: "treemap",
				data: [
					{
						name: "运行中设备",
						value: 12,
						color: ["#00ff04"],
						children: [
							{ name: "设备A", value: 1 },
							{ name: "设备B", value: 1 },
							{ name: "设备C", value: 1 },
							{ name: "设备D", value: 1 },
							{ name: "设备E", value: 1 },
							{ name: "设备F", value: 1 },
							{ name: "设备G", value: 1 },
							{ name: "设备H", value: 1 },
							{ name: "设备I", value: 1 },
							{ name: "设备J", value: 1 },
							{ name: "设备K", value: 1 },
							{ name: "设备L", value: 1 },
						],
					},
					{
						name: "故障设备",
						value: 3,
						color: ["#ff0d00"],
						children: [
							{ name: "设备M", value: 1 },
							{ name: "设备N", value: 1 },
							{ name: "设备O", value: 1 },
						],
					},
					{
						name: "待机设备",
						value: 6,
						color: ["#fbff00"],
						children: [
							{ name: "设备P", value: 1 },
							{ name: "设备Q", value: 1 },
							{ name: "设备R", value: 1 },
							{ name: "设备S", value: 1 },
							{ name: "设备T", value: 1 },
							{ name: "设备U", value: 1 },
						],
					},
				],
				leafDepth: 1,
				label: {
					show: true,
				},
				levels: [
					{
						itemStyle: {
							borderColor: "#0000",
							borderWidth: 0,
							borderRadius: 8,
							gapWidth: 4,
						},
						color: ["#00ff04", "#fbff00", "#ff0d00"],
						upperLabel: {
							show: false,
						},
					},
					{
						itemStyle: {
							borderColor: "#78a3ff",
							borderWidth: 5,
							borderRadius: 16,
							gapWidth: 16,
						},
						label: { color: "black", fontSize: 18 },
						upperLabel: {
							show: true,
						},
						emphasis: {
							itemStyle: {
								borderColor: "#80a492",
							},
						},
					},
					{
						colorSaturation: [0.1, 0.5],
						label: { color: "black", fontSize: 16 },
						itemStyle: {
							borderWidth: 5,
							borderRadius: 16,
							gapWidth: 4,
							borderColorSaturation: 0.9,
						},
					},
				],
			},
		} as Option;
	}, []);

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

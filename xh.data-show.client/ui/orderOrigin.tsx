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
				yAxis: { type: "category", axisLabel: { rotate: 45 } },
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
					source: [
						{ name: "四川省成都市", 订单量: 26 },
						{ name: "四川省绵阳市", 订单量: 18 },
						{ name: "四川省自贡市", 订单量: 15 },
						{ name: "四川省德阳市", 订单量: 22 },
						{ name: "四川省攀枝花市", 订单量: 30 },
						{ name: "四川省泸州市", 订单量: 20 },
						{ name: "四川省德阳市", 订单量: 28 },
						{ name: "四川省广元市", 订单量: 16 },
						{ name: "重庆市渝中区", 订单量: 23 },
						{ name: "重庆市大渡口区", 订单量: 31 },
						{ name: "重庆市江北区", 订单量: 39 },
						{ name: "重庆市沙坪坝区", 订单量: 24 },
						{ name: "重庆市九龙坡区", 订单量: 27 },
						{ name: "重庆市南岸区", 订单量: 11 },
						{ name: "重庆市云阳县", 订单量: 33 },
						{ name: "重庆市奉节县", 订单量: 39 },
						{ name: "重庆市巫山县", 订单量: 26 },
						{ name: "重庆市巫溪县", 订单量: 17 },
					],
				},
				grid: {
					left: "16%",
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

		const chart =
			echarts.getInstanceByDom(chartDom) || echarts.init(chartDom, theme);

		chart.setOption(option);
	}, [observer, option]);

	return <div className={prop?.className + ` h-full`} ref={board}></div>;
}

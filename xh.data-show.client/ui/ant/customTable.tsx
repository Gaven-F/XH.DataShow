import { ResizeObserver } from "@juggle/resize-observer";
import { Table, TableProps } from "antd";
import { TableRef } from "antd/es/table";
import React, { HTMLAttributes, useEffect, useMemo, useRef, useState } from "react";

interface Prop extends HTMLAttributes<HTMLDivElement> {
	columns?: TableProps["columns"];
	dataSource?: TableProps["dataSource"];
}

export function CustomTable({ columns, dataSource, ...props }: Prop) {
	const body = useRef<HTMLDivElement>(null);
	const table: Parameters<typeof Table>[0]["ref"] = React.useRef(null);

	const [config, setConfig] = useState<TableProps>(() => ({
		columns,
		dataSource,
		pagination: false,
		scroll: { y: 0 },
		rowKey: "id",
	}));

	const observer = useMemo(
		() =>
			new ResizeObserver((entries) => {
				setConfig((c) => {
					// 排除table的头高度
					c.scroll!.y = entries[0].target.clientHeight - 80;
					return c;
				});
			}),
		[],
	);

	useEffect(() => {
		let index = 1;
		// console.log("h:", table.current?.nativeElement.getElementsByTagName("table"));

		const height = table.current?.nativeElement.getElementsByTagName("table")[1].clientHeight;
		// console.log("h:", height);

		const interval = setInterval(() => {
			if (index >= height!) {
				index = 1;
			} else {
				index += 1;
			}

			table.current?.scrollTo({ top: index });
		}, 60);

		if (!body.current) return;
		setConfig((c) => {
			c.scroll!.y = body.current?.clientHeight;
			return c;
		});
		observer.observe(body.current);

		return () => {
			// observer.unobserve(body!.current!);
			clearInterval(interval);
		};
	}, [dataSource?.length, observer]);

	return (
		<div
			{...props}
			className={props.className + ` h-full`}
			ref={body}
			suppressHydrationWarning={true}>
			<Table
				{...config}
				ref={table}
			/>
		</div>
	);
}

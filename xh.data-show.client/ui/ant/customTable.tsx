import { Table, TableProps } from "antd";
import React, {
	HTMLAttributes,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

interface Prop extends HTMLAttributes<HTMLDivElement> {
	columns?: TableProps["columns"];
	dataSource?: TableProps["dataSource"];
}

export function CustomTable({ columns, dataSource, ...props }: Prop) {
	const body = useRef<HTMLDivElement>(null);

	const [config, setConfig] = useState<TableProps>(() => ({
		columns,
		dataSource,
		pagination: false,
		scroll: { y: 0 },
	}));

	const observer = useMemo(
		() =>
			new ResizeObserver((entries) => {
				setConfig((c) => {
					// 排除table的头高度
					c.scroll!.y = entries[0].target.clientHeight - 40;
					return c;
				});
			}),
		[],
	);

	useEffect(() => {
		if (!body.current) return;
		setConfig((c) => {
			c.scroll!.y = body.current?.clientHeight;
			return c;
		});
		observer.observe(body.current);
	}, [observer]);

	return (
		<div
			{...props}
			className={props.className + ` h-full`}
			ref={body}>
			<Table {...config} />
		</div>
	);
}

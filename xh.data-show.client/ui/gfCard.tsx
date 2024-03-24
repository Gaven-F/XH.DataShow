import { STATIC_DATA } from "@/common/static";
import { Card } from "antd";

export const GFCard = ({
	children,
	title,
}: {
	children?: React.ReactNode;
	title?: React.ReactNode;
}) => {
	return (
		<div className="h-full w-full border-b-color border box-border">
			<div className="flex flex-col h-full p-2 bg-bg-color bg-opacity-50">
				<div className="text-lg font-bold mb-2 text-center">{title}</div>
				<div className="flex-1 h-full">{children}</div>
			</div>
		</div>
	);
};

import { ConfigProvider, theme } from "antd";
import React from "react";

export function DarkTheme({
	children,
	compact = false,
}: {
	children?: React.ReactNode;
	compact?: boolean;
}) {
	return (
		<ConfigProvider
			theme={{
				algorithm: [theme.darkAlgorithm],
			}}>
			<ConfigProvider
				theme={{ algorithm: compact ? theme.compactAlgorithm : undefined }}>
				{children}
			</ConfigProvider>
		</ConfigProvider>
	);
}

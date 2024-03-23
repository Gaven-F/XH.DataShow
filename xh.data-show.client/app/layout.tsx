import cyan_theme from "@/assets/antd_cyan_dark.json";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_SC({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "XH DATA_SHOW",
	description: "",
	icons: "./icon.svg",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={noto.className}>
				<ConfigProvider
					theme={{
						...cyan_theme,
					}}>
					{children}
				</ConfigProvider>
			</body>
		</html>
	);
}

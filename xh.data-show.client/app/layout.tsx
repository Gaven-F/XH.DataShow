import cyan_theme from "@/assets/json/antd_cyan_dark.json";
import { ConfigProvider } from "antd";
import zh_CN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import "@/assets/font/index.css";

dayjs.locale("zh_CN");

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
		<html lang="zh-cn">
			<body className={noto.className}>
				<ConfigProvider
					locale={zh_CN}
					theme={{
						...cyan_theme,
					}}
				>
					{children}
				</ConfigProvider>
			</body>
		</html>
	);
}

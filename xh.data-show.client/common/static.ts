import { CardProps } from "antd";

/**
 * 一些静态的资源定义
 */
export namespace STATIC_DATA {
	/**
	 * Card Body 自动满高度
	 */
	export const C_B_HFULL: CardProps["styles"] = {
		body: { height: "100%" },
	};
}

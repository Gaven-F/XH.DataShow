export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly DEMO: string;
		}
	}
}

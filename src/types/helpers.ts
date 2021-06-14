export type RecursivePartial<T> = {
	[P in keyof T]?: T[P] extends Array<infer U> ? Array<RecursivePartial<U>> : T[P] extends Record<string, unknown> ? RecursivePartial<T[P]> : T[P];
};

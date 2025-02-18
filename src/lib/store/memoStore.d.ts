import type { memoType, studentCache } from "../types/memoTypes";
export declare const myCategory: import("svelte/store").Writable<categoryInterface[]>;
export declare const allCategories: import("svelte/store").Writable<categoryInterface[]>;
export interface categoryInterface {
    id: number;
    name: string;
    children: categoryInterface[];
    parentId: number | null;
    orderNum: number;
}
export declare const selectedCategory: import("svelte/store").Writable<number | null>;
export declare const viewMemoCard: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<memoType | null>, invalidate?: () => void) => import("svelte/store").Unsubscriber;
    set: (value: memoType | null) => void;
    update: (updater: (value: memoType | null) => memoType | null) => void;
    undo: () => void;
    redo: () => void;
    reset: () => void;
};
export declare let myStudent: import("svelte/store").Writable<studentCache[]>;
export declare const currentLine: import("svelte/store").Writable<string>;

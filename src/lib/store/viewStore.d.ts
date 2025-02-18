import { type Writable } from "svelte/store";
import type { monthYearWeekInterface, pageType } from "../types/viewTypes";
export declare const isSidebarOpened: Writable<boolean>;
export declare const view: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<pageType>, invalidate?: () => void) => import("svelte/store").Unsubscriber;
    set: (value: pageType) => void;
    update: (updater: (value: pageType) => pageType) => void;
    undo: () => void;
    redo: () => void;
    reset: () => void;
};
export declare const selectedCategoryId: Writable<number | null>;
export declare const viewCategoryId: Writable<number | null>;
export declare const viewCategoryName: Writable<string | null>;
export declare const viewPageNumber: Writable<number | null>;
export declare const viewMonthYearWeek: Writable<monthYearWeekInterface | null>;
export declare function moveToPage(page: pageType, pageNumber?: number): Promise<void>;
export declare const mainColor = "#2563EB";
export declare const selectedDate: Writable<Date | null>;

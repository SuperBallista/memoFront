import { writable, type Writable } from "svelte/store";
import { createUndoStore } from "./undoStore";
import type { monthYearWeekInterface, pageType } from "../types/viewTypes";


export const isSidebarOpened = writable<boolean>(false)
export const view = createUndoStore<pageType>("summary")
export const selectedCategoryId = writable<number | null>(null)
export const viewCategoryId = writable<number | null>(null)
export const viewCategoryName = writable<string | null>(null)
export const viewPageNumber = writable<number | null>(null)
export const viewMonthYearWeek = writable<monthYearWeekInterface | null>(null)


export async function moveToPage(page:pageType , pageNumber:number | null){
view.set(page)
viewPageNumber.set(pageNumber)
}

export const mainColor = "#2563EB"

export const selectedDate = writable<Date | null>(null)

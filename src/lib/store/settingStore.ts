import { writable, type Writable } from "svelte/store";

//한눈에 보기 섹션 상태 스토어
export interface sectionInterface {id:number, title: string, summary:string, checkAt:string}
export type kindType = string
export interface sectionListInterface {kind:kindType, list: sectionInterface[]}
export const section = writable<sectionInterface[]>([])
export const sectionList = writable<sectionListInterface[]>([])

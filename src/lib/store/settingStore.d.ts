import { type Writable } from "svelte/store";
export interface sectionInterface {
    id: number;
    title: string;
    summary: string;
    checkAt: string;
}
export type kindType = string;
export interface sectionListInterface {
    kind: kindType;
    list: sectionInterface[];
}
export declare const section: Writable<sectionInterface[]>;
export declare const sectionList: Writable<sectionListInterface[]>;

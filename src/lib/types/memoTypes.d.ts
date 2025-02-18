export type memoType = {
    id: number;
    title: string;
    content: string;
    category: number;
    orderNum: number;
    dateTimeLink: Date[];
    studentLink: number[];
    memoLink: number[];
    filesUrl?: string[] | undefined;
};
export type studentCache = {
    id: number;
    name: string;
    class: string;
};

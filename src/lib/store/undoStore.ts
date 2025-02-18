import { writable, type Writable } from "svelte/store";

// UndoStore 내부적으로만 사용 (export 하지 않음!)
interface UndoStore<T> extends Writable<T> {
    set: (value: T) => void;
    update: (updater: (value: T) => T) => void;
    undo: () => void;
    redo: () => void;
    reset: () => void;
}

// ✅ createUndoStore 함수만 export
export function createUndoStore<T>(initialValue: T) {
    const past: T[] = [];
    let present: T = initialValue;
    const future: T[] = [];

    const { subscribe, set } = writable<T>(present);

    return {
        subscribe,
        set: (value: T) => {
            past.push(present);
            present = value;
            future.length = 0;
            set(value);
        },
        update: (updater: (value: T) => T) => {
            past.push(present);
            present = updater(present);
            future.length = 0;
            set(present);
        },
        undo: () => {
            if (past.length === 0) return;
            future.push(present);
            present = past.pop() as T;
            set(present);
        },
        redo: () => {
            if (future.length === 0) return;
            past.push(present);
            present = future.pop() as T;
            set(present);
        },
        reset: () => {
            past.length = 0;
            future.length = 0;
            present = initialValue;
            set(initialValue);
        },
    };
}

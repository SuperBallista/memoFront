export declare function createUndoStore<T>(initialValue: T): {
    subscribe: (this: void, run: import("svelte/store").Subscriber<T>, invalidate?: () => void) => import("svelte/store").Unsubscriber;
    set: (value: T) => void;
    update: (updater: (value: T) => T) => void;
    undo: () => void;
    redo: () => void;
    reset: () => void;
};

import { memoize } from "lodash";

// Generate Fake Object Array
export const generateFakeObjectArray = memoize((count = 8) => {
    const indexes: Array<number> = [];
    for (let i = 0; i < count; i++) {
        indexes.push(i);
    }
    return indexes;
});

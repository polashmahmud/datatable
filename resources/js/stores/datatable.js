import { defineStore } from "pinia";

export const useDataTableStore = defineStore("dataTable", {
    state: () => ({
        data: [],
        columns: [],
    }),
    actions: {
        setData(data) {
            this.data = data;
        },
        setColumns(columns) {
            this.columns = columns;
        },
    },
});

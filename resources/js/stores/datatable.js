import { defineStore } from "pinia";

export const useDataTableStore = defineStore("dataTable", {
    state: () => ({
        data: [],
        links: {},
        meta: {},
        columns: [],
    }),
    actions: {
        setData(data) {
            this.data = data;
        },
        setLinks(links) {
            this.links = links;
        },
        setMeta(meta) {
            this.meta = meta;
        },
        setColumns(columns) {
            this.columns = columns;
        },
    },
});

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
        setTableData(tableData, columns) {
            // Set columns if provided
            if (columns) {
                this.setColumns(columns);
            }
            
            // Handle tableData (like users object from Laravel)
            if (tableData && tableData.data) {
                this.setData(tableData.data);
                this.setLinks(tableData.links || {});
                this.setMeta(tableData.meta || {});
            } else {
                this.setData([]);
                this.setLinks({});
                this.setMeta({});
            }
        },
    },
});

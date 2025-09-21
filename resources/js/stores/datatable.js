import { defineStore } from "pinia";

export const useDataTableStore = defineStore("dataTable", {
    state: () => ({
        data: [],
        links: {},
        meta: {},
        columns: [],
        selectedItems: [], // Array of selected item IDs
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
            
            // Clear selections when new data is loaded
            this.selectedItems = [];
        },
        // Selection actions
        toggleSelectItem(itemId) {
            const index = this.selectedItems.indexOf(itemId);
            
            if (index > -1) {
                this.selectedItems.splice(index, 1); // Remove if exists
            } else {
                this.selectedItems.push(itemId); // Add if not exists
            }
        },
        selectAll() {
            this.selectedItems = this.data.map(item => item.id);
        },
        deselectAll() {
            this.selectedItems = [];
        },
        isSelected(itemId) {
            return this.selectedItems.includes(itemId);
        },
        isAllSelected() {
            return this.data.length > 0 && this.selectedItems.length === this.data.length;
        },
        isSomeSelected() {
            return this.selectedItems.length > 0 && this.selectedItems.length < this.data.length;
        },
    },
});

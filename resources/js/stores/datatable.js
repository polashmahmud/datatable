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
            console.log('=== toggleSelectItem START ===');
            console.log('Input itemId:', itemId, 'Type:', typeof itemId);
            console.log('Current selectedItems BEFORE:', [...this.selectedItems]);
            
            const index = this.selectedItems.indexOf(itemId);
            console.log('Index found:', index);
            
            if (index > -1) {
                this.selectedItems.splice(index, 1); // Remove if exists
                console.log('REMOVED item');
            } else {
                this.selectedItems.push(itemId); // Add if not exists
                console.log('ADDED item');
            }
            
            console.log('Current selectedItems AFTER:', [...this.selectedItems]);
            console.log('=== toggleSelectItem END ===');
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

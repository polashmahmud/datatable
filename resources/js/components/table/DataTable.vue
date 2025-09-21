<script lang="ts" setup>
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from '@/components/ui/checkbox'
import DataTableHeader from "./DataTableHeader.vue";
import { useDataTableStore } from '@/stores/datatable.js';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import DataTableBodyRow from "./DataTableBodyRow.vue";
import DataTablePagination from "./DataTablePagination.vue";
import DataTableRowPerPage from "./DataTableRowPerPage.vue";

defineProps({
    columns: Array
})

const dataTableStore = useDataTableStore();
const { selectedItems } = storeToRefs(dataTableStore);

// Master checkbox computed properties
const isAllSelected = computed(() => dataTableStore.isAllSelected());
const isSomeSelected = computed(() => dataTableStore.isSomeSelected());

// Master checkbox handlers
const handleSelectAll = () => {
    if (isAllSelected.value) {
        dataTableStore.deselectAll();
    } else {
        dataTableStore.selectAll();
    }
};
</script>

<template>
    <div class="p-6 space-y-6">
        <div class="flex items-center justify-between">
            <div>Search</div>
            <div class="flex items-center gap-4">
                <div>Actions</div>
                <div>Filters</div>
                <div>Columns</div>
            </div>
        </div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-12">
                        <Checkbox :checked="isAllSelected" :indeterminate="isSomeSelected"
                            @update:checked="handleSelectAll" />
                    </TableHead>
                    <DataTableHeader />
                    <TableHead class="text-right">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <DataTableBodyRow />
            </TableBody>
        </Table>
        <div class="flex items-center justify-between">
            <div class="text-sm text-muted-foreground">
                {{ selectedItems.length > 0 ? `${selectedItems.length} rows selected.` : 'No rows selected.' }}
            </div>
            <div class="flex items-center gap-4">
                <div>
                    <DataTableRowPerPage />
                </div>
                <div>
                    <DataTablePagination />
                </div>
            </div>
        </div>
    </div>
</template>
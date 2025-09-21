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
import DataTableBodyRow from "./DataTableBodyRow.vue";
import DataTablePagination from "./DataTablePagination.vue";

defineProps({
    columns: Array
})


const dataTableStore = useDataTableStore();
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
                    <TableHead>
                        <Checkbox id="terms" />
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
            <div>No rows selected.</div>
            <div class="flex items-center gap-4">
                <div>Rows per page</div>
                <div>
                    <DataTablePagination />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from '@/components/ui/checkbox'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import DataTableHeader from "./DataTableHeader.vue";
import { useDataTableStore } from '@/stores/datatable.js';
import DataTableBodyRow from "./DataTableBodyRow.vue";

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
                    <Pagination v-slot="{ page }" :items-per-page="10" :total="30" :default-page="2">
                        <PaginationContent v-slot="{ items }">
                            <PaginationPrevious />

                            <template v-for="(item, index) in items" :key="index">
                                <PaginationItem v-if="item.type === 'page'" :value="item.value"
                                    :is-active="item.value === page">
                                    {{ item.value }}
                                </PaginationItem>
                            </template>

                            <PaginationEllipsis :index="4" />

                            <PaginationNext />
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    </div>
</template>
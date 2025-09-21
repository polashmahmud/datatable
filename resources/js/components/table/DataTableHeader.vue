<script lang="ts" setup>
import {
    TableHead,
} from "@/components/ui/table"
import { useDataTableStore } from '@/stores/datatable.js';

const dataTableStore = useDataTableStore();
</script>

<template>
    <TableHead v-for="column in dataTableStore.columns" :key="column.name">
        {{ column.name }}
    </TableHead>
</template>
<script lang="ts" setup>
import {
    TableHead,
} from "@/components/ui/table"

defineProps({
    columns: Array
})
</script>

<template>
    <TableHead v-for="column in columns" :key="column.name">
        {{ column.name }}
    </TableHead>
</template>
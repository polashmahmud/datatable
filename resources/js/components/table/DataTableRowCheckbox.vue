<script lang="ts" setup>
import {
    TableCell
} from "@/components/ui/table"
import { Checkbox } from '@/components/ui/checkbox'
import { useDataTableStore } from '@/stores/datatable.js';
import { computed } from 'vue';

const props = defineProps({
    id: Number
})

const dataTableStore = useDataTableStore();

// Create a reactive checkbox state
const checkboxState = computed({
    get() {
        return dataTableStore.isSelected(props.id);
    },
    set(newValue) {
        const currentlySelected = dataTableStore.isSelected(props.id);

        // Only toggle if the state is different
        if (currentlySelected !== newValue) {
            dataTableStore.toggleSelectItem(props.id);
        }
    }
});
</script>

<template>
    <TableCell class="w-12">
        <Checkbox v-model="checkboxState" />
    </TableCell>
</template>
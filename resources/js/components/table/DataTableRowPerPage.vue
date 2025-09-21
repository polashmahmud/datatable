<script lang="ts" setup>
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useDataTableStore } from '@/stores/datatable.js';
import { router } from '@inertiajs/vue3';
import { computed } from 'vue';

const dataTableStore = useDataTableStore();

const perPageOptions = [10, 15, 25, 50, 100];

const currentPerPage = computed(() => {
    return dataTableStore.meta.per_page || 15;
});

const handlePerPageChange = (value: string) => {
    console.log('Per page changed to:', value); // Debug log
    const newPerPage = parseInt(value);

    // Simple approach - just update URL parameters and visit
    const params = new URLSearchParams(window.location.search);
    params.set('per_page', newPerPage.toString());
    params.set('page', '1'); // Reset to first page

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    console.log('Navigating to:', newUrl); // Debug log

    router.visit(newUrl, {
        preserveState: false,
        preserveScroll: false
    });
};
</script>

<template>
    <div class="flex items-center space-x-2">
        <span class="text-sm text-muted-foreground whitespace-nowrap">Rows per page</span>
        <Select :value="currentPerPage.toString()" @update:value="handlePerPageChange">
            <SelectTrigger class="w-[70px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="option in perPageOptions" :key="option" :value="option.toString()">
                    {{ option }}
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>
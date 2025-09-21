<script lang="ts" setup>
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { computed } from 'vue';
import { usePage, router } from '@inertiajs/vue3'
import { useDataTableStore } from '@/stores/datatable.js';
import { storeToRefs } from 'pinia';

const dataTableStore = useDataTableStore();
const { meta } = storeToRefs(dataTableStore);
const options = [10, 15, 25, 50, 100];
const page = usePage();

// Reactive computed for current per page value
const currentPerPage = computed(() => {
    return meta.value.per_page || 15;
});

// Handle per page change manually to avoid loops
const handlePerPageChange = (newVal: any) => {
    if (!newVal) return;

    const perPageValue = newVal.toString();

    // Use Inertia page URL and modify query parameters
    const baseUrl = page.url.split('?')[0]; // Get base URL without query
    const params = new URLSearchParams(window.location.search);

    params.set('per_page', perPageValue);
    params.set('page', '1'); // Reset to first page

    const newUrl = baseUrl + '?' + params.toString();

    router.visit(newUrl, {
        preserveState: false,
        preserveScroll: false
    });
};
</script>

<template>
    <div class="flex items-center space-x-2">
        <span class="text-sm text-muted-foreground whitespace-nowrap">Rows per page</span>
        <Select :model-value="currentPerPage.toString()" @update:model-value="handlePerPageChange" class="w-[70px]">
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem v-for="option in options" :key="option" :value="option.toString()">
                        {{ option }}
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
</template>
<script lang="ts" setup>
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { useDataTableStore } from '@/stores/datatable.js';
import { router } from '@inertiajs/vue3';
import { computed } from 'vue';

const dataTableStore = useDataTableStore();

const goToPage = (url: string | null) => {
    if (url) {
        console.log('Navigating to:', url); // Debug log
        router.visit(url, {
            preserveState: false,
            preserveScroll: false
        });
    }
};

// Compact pagination logic - show only a few pages around current page
const visiblePages = computed(() => {
    if (!dataTableStore.meta.links) return [];

    const current = dataTableStore.meta.current_page;
    const total = dataTableStore.meta.last_page;
    const delta = 1; // Show only 1 page before and after current page

    let start = Math.max(1, current - delta);
    let end = Math.min(total, current + delta);

    const pages = [];

    // Add first page if not in range
    if (start > 1) {
        pages.push({ page: 1, url: dataTableStore.meta.links.find(l => l.label === '1')?.url, active: false });
        if (start > 2) {
            pages.push({ page: '...', url: null, active: false });
        }
    }

    // Add pages in range
    for (let i = start; i <= end; i++) {
        const link = dataTableStore.meta.links.find(l => l.label === i.toString());
        pages.push({
            page: i,
            url: link?.url || null,
            active: i === current
        });
    }

    // Add last page if not in range
    if (end < total) {
        if (end < total - 1) {
            pages.push({ page: '...', url: null, active: false });
        }
        pages.push({
            page: total,
            url: dataTableStore.meta.links.find(l => l.label === total.toString())?.url,
            active: false
        });
    }

    return pages;
});
</script>

<template>
    <div v-if="dataTableStore.meta && dataTableStore.meta.links"
        class="flex items-center justify-between space-x-2 py-4">
        <div class="text-sm text-muted-foreground whitespace-nowrap">
            {{ dataTableStore.meta.from }}-{{ dataTableStore.meta.to }} of {{ dataTableStore.meta.total }}
        </div>

        <Pagination :total="dataTableStore.meta.total || 0" :items-per-page="dataTableStore.meta.per_page || 15"
            :page="dataTableStore.meta.current_page || 1">
            <PaginationContent>
                <!-- Previous Button -->
                <PaginationPrevious v-if="dataTableStore.meta.links && dataTableStore.meta.links[0]"
                    :disabled="!dataTableStore.meta.links[0].url" @click="goToPage(dataTableStore.meta.links[0].url)" />

                <!-- Compact Page Numbers -->
                <template v-for="(page, index) in visiblePages" :key="index">
                    <PaginationItem v-if="page.page !== '...'" :value="typeof page.page === 'number' ? page.page : 1"
                        :is-active="page.active" @click="goToPage(page.url)">
                        {{ page.page }}
                    </PaginationItem>

                    <PaginationEllipsis v-if="page.page === '...'" />
                </template>

                <!-- Next Button -->
                <PaginationNext
                    v-if="dataTableStore.meta.links && dataTableStore.meta.links[dataTableStore.meta.links.length - 1]"
                    :disabled="!dataTableStore.meta.links[dataTableStore.meta.links.length - 1].url"
                    @click="goToPage(dataTableStore.meta.links[dataTableStore.meta.links.length - 1].url)" />
            </PaginationContent>
        </Pagination>
    </div>
</template>
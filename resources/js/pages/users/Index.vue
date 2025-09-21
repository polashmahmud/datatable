<script lang="ts" setup>
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
import { type BreadcrumbItem } from '@/types';
import DataTable from '@/components/table/DataTable.vue';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Users',
        href: '/users',
    },
];

defineProps({
    users: Object
})
</script>

<template>

    <Head title="Users" />
    <AppLayout :breadcrumbs="breadcrumbs">
        <DataTable :data="users" />
    </AppLayout>
</template>
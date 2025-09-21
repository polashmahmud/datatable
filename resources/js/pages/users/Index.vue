<script lang="ts" setup>
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
import { type BreadcrumbItem } from '@/types';
import DataTable from '@/components/table/DataTable.vue';
import { ref } from 'vue';


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

const columns = ref([
    { name: 'ID', field: 'id', sortable: true },
    { name: 'Name', field: 'name', sortable: true },
    { name: 'Email', field: 'email', sortable: true },
    { name: 'Created At', field: 'created_at', sortable: true },
]);
</script>

<template>

    <Head title="Users" />
    <AppLayout :breadcrumbs="breadcrumbs">
        <DataTable :data="users" :columns="columns" />
    </AppLayout>
</template>
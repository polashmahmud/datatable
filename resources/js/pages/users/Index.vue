<script lang="ts" setup>
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
import { type BreadcrumbItem } from '@/types';
import DataTable from '@/components/table/DataTable.vue';
import { useDataTableStore } from '@/stores/datatable.js';
import { onMounted } from 'vue';

const dataTableStore = useDataTableStore();

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

const props = defineProps({
    users: Object
})

const columns = [
    { name: 'ID', field: 'id', sortable: true },
    { name: 'Name', field: 'name', sortable: true },
    { name: 'Email', field: 'email', sortable: true },
    { name: 'Created At', field: 'created_at', sortable: true },
];

onMounted(() => {
    dataTableStore.setColumns(columns);
    if (props.users && props.users.data) {
        dataTableStore.setData(props.users.data);
        dataTableStore.setLinks(props.users.links);
        dataTableStore.setMeta(props.users.meta);
    } else {
        dataTableStore.setData([]);
        dataTableStore.setLinks({});
        dataTableStore.setMeta({});
    }
});
</script>

<template>

    <Head title="Users" />
    <AppLayout :breadcrumbs="breadcrumbs">
        <DataTable :columns="dataTableStore.columns" />
    </AppLayout>
</template>
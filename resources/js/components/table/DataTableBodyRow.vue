<script lang="ts" setup>
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Ellipsis } from "lucide-vue-next";
import { useDataTableStore } from '@/stores/datatable.js';
import { Checkbox } from '@/components/ui/checkbox'

const dataTableStore = useDataTableStore();
</script>

<template>
    <template v-if="dataTableStore.data.length > 0">
        <TableRow v-for="item in dataTableStore.data" :key="item.id">
            <TableCell>
                <Checkbox id="terms" />
            </TableCell>
            <TableCell class="font-medium">
                {{ item.id }}
            </TableCell>
            <TableCell>{{ item.name }}</TableCell>
            <TableCell>{{ item.email }}</TableCell>
            <TableCell>{{ item.created_at }}</TableCell>
            <TableCell class="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <button class="p-2 rounded-full hover:bg-muted">
                            <Ellipsis class="h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    </template>
    <template v-else>
        <TableRow>
            <TableCell :colspan="dataTableStore.columns.length + 2" class="h-24 text-center">
                No data available.
            </TableCell>
        </TableRow>
    </template>
</template>
<script lang="ts" setup>
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'
import { Ellipsis } from "lucide-vue-next";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

defineProps({
    data: Object
})
</script>

<template>
    <div class="p-6 space-y-6">
        <div class="flex items-center justify-between">
            <div>Search</div>
            <div class="flex items-center gap-4">
                <div>Actions</div>
                <div>Filters</div>
                <div>Columns</div>
            </div>
        </div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        <Checkbox id="terms" />
                    </TableHead>
                    <TableHead class="w-[100px]">
                        ID
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead class="text-right">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="user in data.data" :key="user.id">
                    <TableCell>
                        <Checkbox id="terms" />
                    </TableCell>
                    <TableCell class="font-medium">
                        {{ user.id }}
                    </TableCell>
                    <TableCell>{{ user.name }}</TableCell>
                    <TableCell>{{ user.email }}</TableCell>
                    <TableCell>{{ user.created_at }}</TableCell>
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
            </TableBody>
        </Table>
        <div class="flex items-center justify-between">
            <div>No rows selected.</div>
            <div class="flex items-center gap-4">
                <div>Rows per page</div>
                <div>
                    <Pagination v-slot="{ page }" :items-per-page="10" :total="30" :default-page="2">
                        <PaginationContent v-slot="{ items }">
                            <PaginationPrevious />

                            <template v-for="(item, index) in items" :key="index">
                                <PaginationItem v-if="item.type === 'page'" :value="item.value"
                                    :is-active="item.value === page">
                                    {{ item.value }}
                                </PaginationItem>
                            </template>

                            <PaginationEllipsis :index="4" />

                            <PaginationNext />
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    </div>
</template>
'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import {
	ArrowUpDown,
	Calendar,
	Earth,
	Eye,
	Heart,
	MessageSquare,
} from 'lucide-react'
import Image from 'next/image'

export type DatatType = {
	id: string
	thumbnail: string
	title: string
	description: string
	visibility: string
	createdAt: Date
	views: number
	comments: number
	likes: number
}

export const columns: ColumnDef<DatatType>[] = [
	{
		accessorKey: 'title',
		header: ({ column }) => (
			<Button
				variant='ghost'
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className='hover:bg-transparent'
			>
				Video
				<ArrowUpDown className='size-4' />
			</Button>
		),
		cell: ({ row }) => (
			<div className='flex gap-x-2'>
				<Image
					width={96}
					height={48}
					src={row.original.thumbnail}
					alt={row.original.title}
					className='object-cover rounded-md'
				/>

				<div className='flex flex-col space-y-0 flex-1 h-full'>
					<p className='line-clamp-1 font-space_grotesk font-semibold'>
						{row.original.title}
					</p>
					<p className='line-clamp-2 text-xs text-muted-foreground'>
						{row.original.description}
					</p>
				</div>
			</div>
		),
	},
	{
		accessorKey: 'visibility',
		header: 'Visibility',
		cell: ({ row }) => (
			<div className='flex gap-x-1 items-center'>
				<Earth className='size-4' />
				<span>{row.original.visibility}</span>
			</div>
		),
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
		cell: ({ row }) => (
			<div className='flex items-center gap-x-1'>
				<Calendar className='size-4' />
				<span>{format(new Date(row.original.createdAt), 'MMM dd, yyyy')}</span>
			</div>
		),
	},
	{
		accessorKey: 'views',
		header: () => <div className='text-right'>Views</div>,
		cell: ({ row }) => (
			<div className='flex items-center gap-x-1 justify-end'>
				<Eye className='size-4' />
				<span>{row.original.views}</span>
			</div>
		),
	},
	{
		accessorKey: 'comments',
		header: () => <div className='text-right'>Comments</div>,
		cell: ({ row }) => (
			<div className='flex items-center gap-x-1 justify-end'>
				<MessageSquare className='size-4' />
				<span>{row.original.comments}</span>
			</div>
		),
	},
	{
		accessorKey: 'likes',
		header: () => <div className='text-right'>Likes</div>,
		cell: ({ row }) => (
			<div className='flex items-center gap-x-1 justify-end'>
				<Heart className='size-4' />
				<span>{row.original.likes}</span>
			</div>
		),
	},
]

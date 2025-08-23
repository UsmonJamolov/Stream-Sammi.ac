import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { toast } from 'sonner'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function showToastError(response: any) {
	if (response?.serverError || response?.validationErrors || !response?.data) {
		return toast.error('Failed to update video')
	}
	if (response.data.failure) {
		return toast.error(response.data.failure)
	}
}

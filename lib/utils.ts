import { clsx, type ClassValue } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function showToastError(response: any) {
	if (response?.serverError || response?.validationErrors || !response?.data) {
		return toast.error('Something went wrong')
	}
	if (response.data.failure) {
		return toast.error(response.data.failure)
	}
}

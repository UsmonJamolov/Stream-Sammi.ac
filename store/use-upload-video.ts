import { create } from 'zustand'

type Store = {
	step: 1 | 2 | 3
	setStep: (step: 1 | 2 | 3) => void
	progress: number
	setProgress: (progress: number) => void
}

export const useUploadVideo = create<Store>()(set => ({
	step: 1,
	setStep: step => set({ step }),
	progress: 0,
	setProgress: progress => set({ progress }),
}))

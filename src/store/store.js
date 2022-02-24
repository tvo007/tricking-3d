import create from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create(
	devtools((set, api) => ({
		animationsArray: [],
		modelValue: true,
		isPlaying: true,
		setIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
		isPaused: false,
		setIsPaused: () => set((state) => ({ isPaused: !state.isPaused })),
		timescale: 1,
		setTimescale: (value) => set(() => ({ timescale: value })),
		loop: true,
		setLoop: () => set((state) => ({ loop: !state.loop })),
		bounce: true,
		setBounce: () => set((state) => ({ bounce: !state.bounce })),
		aI: 0,
		modelArray: [],
		updateAnimationArray: (value) =>
			set(() => ({
				animationsArray: [...value],
			})),
		addToAnimationArray: (value) =>
			set((state) => ({
				animationsArray: [...state.animationsArray, value],
			})),
		animationSelector: () =>
			set((state) => ({
				aI: (state.aI + 1) % state.animationsArray.length,
				isPlaying: true,
				isPaused: false,
			})),
		selectAnim: (value) =>
			set(() => ({
				currentAnim: value,
			})),
		currentAnim: "BTwist",
		modelSelector: () => set((state) => ({ modelValue: !state.modelValue })),
		position: [],
		setFredPosition: (value) => set(() => ({ position: [value] })),
		timeSlider: 1,
		start: 0,
		end: 1,
		setSlider: (value) => set(() => ({ timeSlider: value })),
		setSliderStart: (value) => set(() => ({ start: value })),
		setSliderEnd: (value) => set(() => ({ end: value })),
		setCurrentTime: (value) => set(() => ({ currentTime: value * 10 })),
		setClipDuration: (value) => set(() => ({ clipDuration: value * 10 })),
		currentTime: 0,
		clipDuration: 0,
		trimToggle: false,
		setTrimToggle: () => set((state) => ({ trimToggle: !state.trimToggle })),
	}))
);

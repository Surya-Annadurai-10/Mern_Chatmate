import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "coffee",
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
  setTheme : (theme) => {
    localStorage.setItem("theme" , theme)
    set({theme}) 
  } 
}))
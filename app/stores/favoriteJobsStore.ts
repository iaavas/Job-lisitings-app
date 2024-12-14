import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Job from "../types/job.type";

interface FavoriteJobsState {
  favoriteJobs: Job[];
  addFavoriteJob: (job: Job) => void;
  removeFavoriteJob: (jobId: string) => void;
  isFavorite: (jobId: string) => boolean;
}

const useFavoriteJobsStore = create<FavoriteJobsState>()(
  persist(
    (set, get) => ({
      favoriteJobs: [] as Job[],
      addFavoriteJob: (job) =>
        set((state) => ({
          favoriteJobs: [...state.favoriteJobs, job],
        })),
      removeFavoriteJob: (jobId) =>
        set((state) => ({
          favoriteJobs: state.favoriteJobs.filter((job) => job._id !== jobId),
        })),
      isFavorite: (jobId) =>
        get().favoriteJobs.some((job) => job._id === jobId),
    }),
    {
      name: "favorite-jobs-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useFavoriteJobsStore;

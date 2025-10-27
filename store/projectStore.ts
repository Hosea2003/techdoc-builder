import { Project } from "@/types/project";
import { create } from "zustand";

interface ProjectState {
    projects: Project[];
    addProjects:(projecst:Project[])=>void;
}

export const useProjectStore = create<ProjectState>((set)=>({
    projects:[],
    addProjects: (newProjects: Project[]) =>
    set((state) => {
      const filteredProjects = newProjects.filter(
        (p) => !state.projects.some((existing) => existing.id === p.id)
      );

      return {
        projects: [...state.projects, ...filteredProjects],
      };
    }),
}));
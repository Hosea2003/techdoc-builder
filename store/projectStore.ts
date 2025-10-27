import { Equipment, Project } from "@/types/project";
import { create } from "zustand";

interface ProjectState {
    projects: Project[];
    addProjects:(projecst:Project[])=>void;
    addEquipmentToProject: (projectId: number, equipments: Equipment[]) => void;
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
    addEquipmentToProject: (projectId, equipments) =>
        set((state) => ({
        projects: state.projects.map((proj) =>
            proj.id === projectId
            ? { ...proj, equipment: [...(proj.equipments || []), ...equipments] }
            : proj
        ),
    })),
}));
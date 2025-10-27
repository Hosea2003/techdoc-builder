import { Equipment, Project } from "@/types/project";
import { create } from "zustand";

interface ProjectState {
    projects: Project[];
    addProjects:(projecst:Project[], forceAdd?:boolean)=>void;
    addEquipmentToProject: (projectId: number, equipments: Equipment[]) => void;
}

export const useProjectStore = create<ProjectState>((set)=>({
    projects:[],
    addProjects: (newProjects: Project[], forceAdd = false) =>
        set((state) => {
        const updatedProjects = newProjects.map((newProj) => {
            const existing = state.projects.find((p) => p.id === newProj.id);
            if (existing) {
            if (forceAdd) {
                return { ...newProj, equipments: existing.equipments ?? [] };
            }
            return existing;
            }
            return newProj;
        });

        const remainingProjects = state.projects.filter(
            (p) => !newProjects.some((np) => np.id === p.id)
        );

        return { projects: [...remainingProjects, ...updatedProjects] };
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
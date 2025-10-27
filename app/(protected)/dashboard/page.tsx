import { fetchProjects } from "../_actions/project-actions";
import ProjectDashboard from "../_components/dashboard/ProjectDashboard";

export default async function Home() {
  const projects = await fetchProjects();
  return (
    <ProjectDashboard projects={projects}/>
  );
}

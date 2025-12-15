import type { ProjectTagProps } from "./projectTagProps.js";

export interface ProjectProps {
    photo: string; 
    video?: string; 
    header:string;
    depost_link?:string;
    github_link:string;
    short_desc: string;
    long_desc: string;
    tags: ProjectTagProps; 
}
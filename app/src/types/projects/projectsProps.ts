import type { ProjectTagProps } from "./projectTagProps.js";

export interface ProjectProps {
    cover_photo: string; 
    video?: string;
    photo?: string;
    header:string;
    depost_link?:string;
    github_link:string;
    short_desc: string;
    long_desc: string;
    tags: ProjectTagProps; 
}
import { Langugage } from "./languages.js"
import type { Tools } from "./tools.js";

export interface ProjectTagProps {
    lang: Langugage;
    tools: Tools;
    hackathon: string | null; 
}

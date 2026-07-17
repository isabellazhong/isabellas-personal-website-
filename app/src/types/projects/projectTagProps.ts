import { Language } from "./languages.js"
import type { Tools } from "./tools.js";

export interface ProjectTagProps {
    lang: Language[];
    tools: Tools[];
    hackathon: string | null; 
}

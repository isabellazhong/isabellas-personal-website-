import { Language } from "../../types/projects/languages.js";
import type { ProjectProps } from "../../types/projects/projectsProps.js";
import { Tools } from "../../types/projects/tools.js";

export const projects:ProjectProps[] = [
    {
        header: "marker",
        photo: "project_images/marker_photo.png",
        short_desc: "test",
        long_desc: "test",
        github_link: "https://github.com/Williamwu277/marker",
        tags: {lang: [Language.PYTHON, Language.HTML, Language.CSS],
            tools: [Tools.LANGCHAIN, Tools.NEXT_JS],
            hackathon: "Hack the 6ix"}
    }
]
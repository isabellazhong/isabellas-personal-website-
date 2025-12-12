import type { photoDescProps } from "./photoDescProps.js";

export type PhotoTag = "food" | "friends" | "art";


export interface photoProps {
    src: string,
    tag: PhotoTag,
    desc: photoDescProps
}

export interface PopupPhotoProps extends photoProps {
    src: string;
    tag: "food" | "friends" | "art";
    desc: photoDescProps;
    next_photo: PopupPhotoProps | null;
    prev_photo: PopupPhotoProps | null; 
}
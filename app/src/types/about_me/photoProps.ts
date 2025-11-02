export interface photoProps {
    src: string,
    tag: "food" | "friends" | "art",
    desc: string
}

export interface PopupPhotoProps extends photoProps {
    src: string;
    tag: "food" | "friends" | "art";
    desc: string;
    next_photo: PopupPhotoProps;
    prev_photo: PopupPhotoProps; 
    id: string; 
}
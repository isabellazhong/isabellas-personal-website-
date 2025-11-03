export interface photoProps {
    src: string,
    tag: "food" | "friends" | "art",
    desc: string
}

export interface PopupPhotoProps extends photoProps {
    src: string;
    tag: "food" | "friends" | "art";
    desc: string;
    next_photo: PopupPhotoProps | null;
    prev_photo: PopupPhotoProps | null; 
}
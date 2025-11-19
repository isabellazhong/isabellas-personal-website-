import type { PopupPhotoProps } from "../../types/about_me/photoProps.js";

let photos: PopupPhotoProps[] = [
    {
      src: "/images/friends/climbing.jpg",
      tag: "friends",
      desc: "First time rock climbing w/ friends!",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/friends/escape_room.jpg",
      tag: "friends",
      desc: "Winning an escape room because we're just like that (we used 2 hints)",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/friends/cottage.JPG",
      tag: "friends",
      desc: "Cottage retreat! Very fun :D",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/friends/karaoke.JPG",
      tag: "friends",
      desc: "Karaoke night for my birthday :)",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/friends/scaddabush.jpg",
      tag: "friends",
      desc: "Very rare hangout with my friends from church",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/food/macarons.jpg",
      tag: "food",
      desc: "Finally succeeded making macarons",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/food/mashed_potatoes.jpg",
      tag: "food",
      desc: "Somewhat fancier dinner during midterm season",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/food/resevoir_lounge.jpg",
      tag: "food",
      desc: "A really yummy and cool meal at the Resevoir Lounge",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/paintings/landscape_painting.jpg",
      tag: "art",
      desc: "Made during a painting and bubble tea night event at school!",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/paintings/fish_painting.JPG",
      tag: "art",
      desc: "Still hung up on my wall",
      prev_photo: null,
      next_photo: null,
    },
  ];

  for (let i = 0; i < photos.length; i++) {
    const current = photos[i];
    const prev = i === 0 ? photos[photos.length - 1] : photos[i - 1];
    const next = i === photos.length - 1 ? photos[0] : photos[i + 1];
    
    current.prev_photo = prev;
    current.next_photo = next;
}

export default photos;
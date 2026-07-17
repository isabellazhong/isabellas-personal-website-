import type { PopupPhotoProps } from "../../types/about_me/photoProps.js";

let photos: PopupPhotoProps[] = [
    {
      src: "/about_me_images/friends/climbing.jpg",
      tag: "friends",
      desc: {
        header: "ROCK CLIMBING",
        date: "2025-03-29",
        desc: "First time rock climbing w/ friends!",
      },
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/about_me_images/friends/escape_room.jpg",
      tag: "friends",
      desc: {
        header: "ESCAPE ROOM",
        date: "2025-04-04",
        desc:"Winning an escape room because we're just like that (we used 2 hints)"
      },
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/about_me_images/friends/cottage.JPG",
      tag: "friends",
      desc: {
        header: "COTTAGE RETREAT",
        date: "2025-05-10",
       desc:"Cottage retreat! Very fun :D"
      },
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/about_me_images/friends/karaoke.JPG",
      tag: "friends",
      desc: {
        header: "KARAOKE NIGHT",
        date: "2025-08-08",
        desc: "Karaoke night for my birthday :)"
      },
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/about_me_images/friends/scaddabush.jpg",
      tag: "friends",
      desc: {
        header: "CHURCH FRIENDS",
        date: "2025-01-03",
        desc:"Very rare hangout with my friends from church"
      },
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/about_me_images/food/macarons.jpg",
      tag: "food",
      desc: {
        header: "MACARONS",
        date: "2025-06-30",
        desc:"Finally succeeded making macarons"
      },
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/about_me_images/food/mashed_potatoes.jpg",
      tag: "food",
      desc: {
        header: "MASHED POTATOES",
        date: "2025-09-19",
        desc:"Somewhat fancier dinner during midterm season"
      },
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/about_me_images/food/resevoir_lounge.jpg",
      tag: "food",
      desc: {
        header: "RESEVOIR LOUNGE",
        date: "2025-09-20",
        desc:"A really yummy and cool meal at the Resevoir Lounge"
      },
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/about_me_images/paintings/landscape_painting.jpg",
      tag: "art",
      desc: {
        header: "LANDSCAPE PAINTING",
        date: "2025-01-29",
        desc:"Made during a painting and bubble tea night event at school!"
      },
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/about_me_images/paintings/fish_painting.JPG",
      tag: "art",
      desc: {
        header: "KOI FISH PAINTING",
        date: "2025-06-22",
        desc:"Still hung up on my wall"
      },
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
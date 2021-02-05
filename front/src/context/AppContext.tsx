import React, { createContext, useState } from "react";
import { useCarousel } from "../hooks/useCarousel";
import img1 from "../assets/imgs/TJasinski.jpg";
import img2 from "../assets/imgs/ABylinski.jpg";
import img3 from "../assets/imgs/JSzpreglewski.jpg";

import kid1 from "../assets/imgs/kidPainting.jpg";
import kid2 from "../assets/imgs/kidRope.jpg";
import kid3 from "../assets/imgs/kidsSchool.jpg";
import kid4 from "../assets/imgs/kidToy.jpg";

import first from "../assets/imgs/first-communion.jpg";
import conf from "../assets/imgs/conference.jpg";
import newspaper from "../assets/imgs/newspaper.jpg";

import kid from "../assets/imgs/bible-kid.jpg";
import cap from "../assets/imgs/love-neighbour.jpg";
import love from "../assets/imgs/bible-love.jpg";

export interface ISlide {
  img: string;
  label?: string;
}

interface IController {
  x: number;
  goRight: Function;
  goLeft: Function;
}

export interface ICustomPage {
  _id: string;
  date: string;
  type: "article" | "ad";
  image: string;
  title: string;
  description: string;
  content: string;
}

const contactArr: ISlide[] = [
  { img: img1, label: "ks. Tadeusz Jasiński" },
  { img: img2, label: "ks. Andrzej Byliński" },
  { img: img3, label: "oj. Jacek Szpręglewski" },
];

const kidsArr: ISlide[] = [
  { img: kid1 },
  { img: kid2 },
  { img: kid3 },
  { img: kid4 },
];

const adsArr: ICustomPage[] = [
  {
    _id: `1`,
    date: "",
    type: "article",
    image: first,
    title: "Grupa pierwsza komunijna 2020",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima accusamus accusantium et ipsam perferendis ipsa tenetur molestias quaerat a, laborum, voluptatem quos natus officiis iure sapiente fugit maiores, minus obcaecati?",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur <br/>adipisicing elit. Quasi dolores doloremque, cum autem illo quis aliquid <b> labore eligendi perferendis tenetur debitis</b>, explicabo magni maiores, rem voluptatibus recusandae aspernatur possimus totam.</p> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem illum commodi unde quam corporis quasi molestias dignissimos, doloribus labore tempora animi eveniet quas delectus, quibusdam ea officiis, libero <a href=`/` >home </a>earum? Quae? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto maiores quod eum minima magni quos fugit suscipit corrupti. Tempora vitae distinctio iste nam atque, laboriosam maxime commodi voluptates quos explicabo? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit voluptas perferendis repellendus. Saepe vero necessitatibus assumenda qui fugiat quod, placeat ipsam corporis consequatur unde error atque pariatur repudiandae ratione architecto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam minima in non incidunt cum delectus dicta quibusdam quod enim magni quidem est doloremque eaque, asperiores reiciendis officia sequi. Dolores, incidunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, magni omnis fugit tempora eius adipisci nam odio? Alias perspiciatis, esse repellendus illo ad atque repellat sunt labore pariatur, impedit hic!</p>",
  },
  {
    _id: `2`,
    date: "",
    type: "article",
    image: newspaper,
    title: "Ogłoszenia parafialne",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima accusamus accusantium et ipsam perferendis ipsa tenetur molestias quaerat a, laborum, voluptatem quos natus officiis iure sapiente fugit maiores, minus obcaecati?",
    content:
      "<p><b>1-ego maja/poniedziałek: </b> nsectetur adipisicing elit. Minima accusamus</p><p><b>2-ego maja/wtorek: </b> nsectetur adipisicing elit. Minima accusamus</p><p><b>3-ego maja/środa: </b> nsectetur adipisicing elit. Minima accusamus</p><p><b>4-ego maja/czwartek: </b> nsectetur adipisicing elit. Minima accusamus</p><p><b>5-ego maja/piątek: </b> nsectetur adipisicing elit. Minima accusamus</p><p><b>6-ego maja/sobota: </b> nsectetur adipisicing elit. Minima accusamus</p><p><b>7-ego maja/niedziela: </b> nsectetur adipisicing elit. Minima accusamus</p>",
  },
  {
    _id: `3`,
    date: "",
    type: "article",
    image: conf,
    title: "Rekolekcje Parafialne",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima accusamus accusantium et ipsam perferendis ipsa tenetur molestias quaerat a, laborum, voluptatem quos natus officiis iure sapiente fugit maiores, minus obcaecati?",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur <br/>adipisicing elit. Quasi dolores doloremque, cum autem illo quis aliquid <b> labore eligendi perferendis tenetur debitis</b>, explicabo magni maiores, rem voluptatibus recusandae aspernatur possimus totam.</p> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem illum commodi unde quam corporis quasi molestias dignissimos, doloribus labore tempora animi eveniet quas delectus, quibusdam ea officiis, libero <a href=`/` >home </a>earum? Quae? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto maiores quod eum minima magni quos fugit suscipit corrupti. Tempora vitae distinctio iste nam atque, laboriosam maxime commodi voluptates quos explicabo? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit voluptas perferendis repellendus. Saepe vero necessitatibus assumenda qui fugiat quod, placeat ipsam corporis consequatur unde error atque pariatur repudiandae ratione architecto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam minima in non incidunt cum delectus dicta quibusdam quod enim magni quidem est doloremque eaque, asperiores reiciendis officia sequi. Dolores, incidunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, magni omnis fugit tempora eius adipisci nam odio? Alias perspiciatis, esse repellendus illo ad atque repellat sunt labore pariatur, impedit hic!</p>",
  },
  {
    _id: `4`,
    date: "",
    type: "article",
    image: conf,
    title: "Rekolekcje Parafialne",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima accusamus accusantium et ipsam perferendis ipsa tenetur molestias quaerat a, laborum, voluptatem quos natus officiis iure sapiente fugit maiores, minus obcaecati?",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur <br/>adipisicing elit. Quasi dolores doloremque, cum autem illo quis aliquid <b> labore eligendi perferendis tenetur debitis</b>, explicabo magni maiores, rem voluptatibus recusandae aspernatur possimus totam.</p> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem illum commodi unde quam corporis quasi molestias dignissimos, doloribus labore tempora animi eveniet quas delectus, quibusdam ea officiis, libero <a href=`/` >home </a>earum? Quae? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto maiores quod eum minima magni quos fugit suscipit corrupti. Tempora vitae distinctio iste nam atque, laboriosam maxime commodi voluptates quos explicabo? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit voluptas perferendis repellendus. Saepe vero necessitatibus assumenda qui fugiat quod, placeat ipsam corporis consequatur unde error atque pariatur repudiandae ratione architecto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam minima in non incidunt cum delectus dicta quibusdam quod enim magni quidem est doloremque eaque, asperiores reiciendis officia sequi. Dolores, incidunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, magni omnis fugit tempora eius adipisci nam odio? Alias perspiciatis, esse repellendus illo ad atque repellat sunt labore pariatur, impedit hic!</p>",
  },
  {
    _id: `5`,
    date: "",
    type: "article",
    image: conf,
    title: "Rekolekcje Parafialne",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima accusamus accusantium et ipsam perferendis ipsa tenetur molestias quaerat a, laborum, voluptatem quos natus officiis iure sapiente fugit maiores, minus obcaecati?",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur <br/>adipisicing elit. Quasi dolores doloremque, cum autem illo quis aliquid <b> labore eligendi perferendis tenetur debitis</b>, explicabo magni maiores, rem voluptatibus recusandae aspernatur possimus totam.</p> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem illum commodi unde quam corporis quasi molestias dignissimos, doloribus labore tempora animi eveniet quas delectus, quibusdam ea officiis, libero <a href=`/` >home </a>earum? Quae? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto maiores quod eum minima magni quos fugit suscipit corrupti. Tempora vitae distinctio iste nam atque, laboriosam maxime commodi voluptates quos explicabo? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit voluptas perferendis repellendus. Saepe vero necessitatibus assumenda qui fugiat quod, placeat ipsam corporis consequatur unde error atque pariatur repudiandae ratione architecto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam minima in non incidunt cum delectus dicta quibusdam quod enim magni quidem est doloremque eaque, asperiores reiciendis officia sequi. Dolores, incidunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, magni omnis fugit tempora eius adipisci nam odio? Alias perspiciatis, esse repellendus illo ad atque repellat sunt labore pariatur, impedit hic!</p>",
  },
];

const articlesArr: ICustomPage[] = [
  {
    _id: `11`,
    date: "",
    type: "article",
    image: kid,
    title: "Jak czytać Pismo Święte",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima accusamus accusantium et ipsam perferendis ipsa tenetur molestias quaerat a, laborum, voluptatem quos natus officiis iure sapiente fugit maiores, minus obcaecati?",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur <br/>adipisicing elit. Quasi dolores doloremque, cum autem illo quis aliquid <b> labore eligendi perferendis tenetur debitis</b>, explicabo magni maiores, rem voluptatibus recusandae aspernatur possimus totam.</p> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem illum commodi unde quam corporis quasi molestias dignissimos, doloribus labore tempora animi eveniet quas delectus, quibusdam ea officiis, libero <a href=`/` >home </a>earum? Quae? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto maiores quod eum minima magni quos fugit suscipit corrupti. Tempora vitae distinctio iste nam atque, laboriosam maxime commodi voluptates quos explicabo? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit voluptas perferendis repellendus. Saepe vero necessitatibus assumenda qui fugiat quod, placeat ipsam corporis consequatur unde error atque pariatur repudiandae ratione architecto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam minima in non incidunt cum delectus dicta quibusdam quod enim magni quidem est doloremque eaque, asperiores reiciendis officia sequi. Dolores, incidunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, magni omnis fugit tempora eius adipisci nam odio? Alias perspiciatis, esse repellendus illo ad atque repellat sunt labore pariatur, impedit hic!</p>",
  },
  {
    _id: `22`,
    date: "",
    type: "article",
    image: cap,
    title: "Kochaj bliźniego swego jak siebie samego",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima accusamus accusantium et ipsam perferendis ipsa tenetur molestias quaerat a, laborum, voluptatem quos natus officiis iure sapiente fugit maiores, minus obcaecati?",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur <br/>adipisicing elit. Quasi dolores doloremque, cum autem illo quis aliquid <b> labore eligendi perferendis tenetur debitis</b>, explicabo magni maiores, rem voluptatibus recusandae aspernatur possimus totam.</p> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem illum commodi unde quam corporis quasi molestias dignissimos, doloribus labore tempora animi eveniet quas delectus, quibusdam ea officiis, libero <a href=`/` >home </a>earum? Quae? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto maiores quod eum minima magni quos fugit suscipit corrupti. Tempora vitae distinctio iste nam atque, laboriosam maxime commodi voluptates quos explicabo? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit voluptas perferendis repellendus. Saepe vero necessitatibus assumenda qui fugiat quod, placeat ipsam corporis consequatur unde error atque pariatur repudiandae ratione architecto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam minima in non incidunt cum delectus dicta quibusdam quod enim magni quidem est doloremque eaque, asperiores reiciendis officia sequi. Dolores, incidunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, magni omnis fugit tempora eius adipisci nam odio? Alias perspiciatis, esse repellendus illo ad atque repellat sunt labore pariatur, impedit hic!</p>",
  },
  {
    _id: `33`,
    date: "",
    type: "article",
    image: love,
    title: "Dlaczego kochać jest ciężko?",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima accusamus accusantium et ipsam perferendis ipsa tenetur molestias quaerat a, laborum, voluptatem quos natus officiis iure sapiente fugit maiores, minus obcaecati?",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur <br/>adipisicing elit. Quasi dolores doloremque, cum autem illo quis aliquid <b> labore eligendi perferendis tenetur debitis</b>, explicabo magni maiores, rem voluptatibus recusandae aspernatur possimus totam.</p> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem illum commodi unde quam corporis quasi molestias dignissimos, doloribus labore tempora animi eveniet quas delectus, quibusdam ea officiis, libero <a href=`/` >home </a>earum? Quae? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto maiores quod eum minima magni quos fugit suscipit corrupti. Tempora vitae distinctio iste nam atque, laboriosam maxime commodi voluptates quos explicabo? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit voluptas perferendis repellendus. Saepe vero necessitatibus assumenda qui fugiat quod, placeat ipsam corporis consequatur unde error atque pariatur repudiandae ratione architecto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam minima in non incidunt cum delectus dicta quibusdam quod enim magni quidem est doloremque eaque, asperiores reiciendis officia sequi. Dolores, incidunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, magni omnis fugit tempora eius adipisci nam odio? Alias perspiciatis, esse repellendus illo ad atque repellat sunt labore pariatur, impedit hic!</p>",
  },
  {
    _id: `44`,
    date: "",
    type: "article",
    image: love,
    title: "Nowy wlog",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima accusamus accusantium et ipsam perferendis ipsa tenetur molestias quaerat a, laborum, voluptatem quos natus officiis iure sapiente fugit maiores, minus obcaecati?",
    content:
      "<p>Lorem ipsum dolor sit amet consectetur <br/>adipisicing elit. Quasi dolores doloremque, cum autem illo quis aliquid <b> labore eligendi perferendis tenetur debitis</b>, explicabo magni maiores, rem voluptatibus recusandae aspernatur possimus totam.</p> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem illum commodi unde quam corporis quasi molestias dignissimos, doloribus labore tempora animi eveniet quas delectus, quibusdam ea officiis, libero <a href=`/` >home </a>earum? Quae? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto maiores quod eum minima magni quos fugit suscipit corrupti. Tempora vitae distinctio iste nam atque, laboriosam maxime commodi voluptates quos explicabo? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit voluptas perferendis repellendus. Saepe vero necessitatibus assumenda qui fugiat quod, placeat ipsam corporis consequatur unde error atque pariatur repudiandae ratione architecto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam minima in non incidunt cum delectus dicta quibusdam quod enim magni quidem est doloremque eaque, asperiores reiciendis officia sequi. Dolores, incidunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, magni omnis fugit tempora eius adipisci nam odio? Alias perspiciatis, esse repellendus illo ad atque repellat sunt labore pariatur, impedit hic!</p>",
  },
  {
    _id: `55`,
    date: "",
    type: "article",
    image: love,
    title: "Dlaczego kochać jest ciężko?",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima accusamus accusantium et ipsam perferendis ipsa tenetur molestias quaerat a, laborum, voluptatem quos natus officiis iure sapiente fugit maiores, minus obcaecati?",
    content:
      '<ul><li><span style="font-size: 30px;font-family: Verdana;"><strong>H</strong></span><span style="color: rgb(250,197,28);font-size: 30px;font-family: Verdana;"><strong>ello here</strong></span><span style="color: rgb(250,197,28);font-family: Verdana;"><strong> </strong></span></li></ul><p>my name is pasha and thsi is <a href="https://github.com/pashaGhub" target="_blank">my GitHub</a>&nbsp;</p>',
  },
];

export const AppContext = createContext<any>(Boolean);

export function AppContextProvider(props: any): JSX.Element {
  const [mobNav, setMobNav] = useState<boolean>(false);
  const [editorContent, setEditorContent] = useState<string>("");
  const [resetEditorContent, setResetEditorContent] = useState<boolean>(false);
  const [location, setLocation] = useState<string>(""); //used to select right mobile navigation. 1.public 2.none 3.admin

  const handleLocation = (props: any) => {
    const currentLocation = props.pathname.split("/")[1];

    switch (currentLocation) {
      case "admin":
        return setLocation("admin");
      case "login":
      case "register":
        return setLocation("none");
      default:
        return setLocation("public");
    }
  };

  //Mobile nav toggle functionality
  const toggleMobNav = () => {
    setMobNav((currentState: boolean) => !currentState);
  };

  const closeMobNav = () => {
    setMobNav(false);
  };

  //Contact image carousel
  const contactController: IController = useCarousel();
  const kidsController: IController = useCarousel();

  return (
    <AppContext.Provider
      value={{
        toggleMobNav,
        closeMobNav,
        mobNav,
        contactArr,
        kidsArr,
        contactController,
        kidsController,
        adsArr,
        articlesArr,
        location,
        handleLocation,
        editorContent,
        setEditorContent,
        resetEditorContent,
        setResetEditorContent,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

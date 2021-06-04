interface IROUTES {
  home: string;
  singlepage: string;
  activitiesKids: string;
  activitiesChoirs: string;
  news: string;
  contacts: string;
  login: string;
  register: string;
  aMainPanel: string;
  aCustomPage: string;
}

export const ROUTES: IROUTES = {
  home: "/",
  singlepage: "/singlepage/:id",
  activitiesKids: "/activities/kids",
  activitiesChoirs: "/activities/choirs",
  news: "/news",
  contacts: "/contacts",
  login: "/login",
  register: "/register",
  aMainPanel: "/admin/",
  aCustomPage: "/admin/custom-page",
};

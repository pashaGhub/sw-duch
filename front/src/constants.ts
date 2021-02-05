interface IROUTES {
  home: string;
  activitiesKids: string;
  activitiesChoirs: string;
  newsAds: string;
  newsArticles: string;
  contacts: string;
  login: string;
  register: string;
  aMainPanel: string;
  aCustomPage: string;
}

export const ROUTES: IROUTES = {
  home: "/",
  activitiesKids: "/activities/kids",
  activitiesChoirs: "/activities/choirs",
  newsAds: "/news/ads",
  newsArticles: "/news/articles",
  contacts: "/contacts",
  login: "/login",
  register: "/register",
  aMainPanel: "/admin/",
  aCustomPage: "/admin/custom-page",
};

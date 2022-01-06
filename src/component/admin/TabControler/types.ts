export type TabControlerType<T> = {
  actualPage: T;
  tabs: Array<TabType<T>>;

  changePage: (page: T) => void;
  clickable?: boolean;
};

export type TabType<T> = {
  title: string;
  id: T;
  icons: { active: string; disable: string };
};

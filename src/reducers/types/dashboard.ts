export type ActionType = {
  getDashboardRequest: Function;
  getDashboardSuccess: Function;
  getDashboardError: Function;
};

export type SelectorType = {
  isFetching: Function;
  getDashboard: Function;
};

export type dashboardState = {
  fetching: boolean;
};

export type ActionDashboardType = {
    type:string;
    dashboard: object;
}

export type selectorsType = {
  isFetching: Function  
  getDashboard: Function  
}

export type selectorsTypesDashboard = {
  dashboard:{
      fetching:boolean,
      dashboard:object
  }
}
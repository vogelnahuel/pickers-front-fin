export type dashboardResponseDataType = {
  statusCode: number;
  result: DashboardType
};

export type dashboardResponseType = {
  data: dashboardResponseDataType;
  status: number;
};

export type DashboardType = {
  activeTransactions?: number;
  inAlertTransactions?: number;
  pendingTransactions?: number;
};

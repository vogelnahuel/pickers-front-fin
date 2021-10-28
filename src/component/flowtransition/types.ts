export type FlowTrasitionType = {
    pages: object[];
    currentPage: string;
}
export type FlowTrasitionParamsType = {
    next: Function;
    back: Function;
}
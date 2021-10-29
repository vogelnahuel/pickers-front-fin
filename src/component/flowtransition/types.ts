export type FlowTrasitionType = {
    pages: object[];
    firstPage: string[];
}
export type FlowTrasitionParamsType = {
    next: Function;
    back: Function;
}
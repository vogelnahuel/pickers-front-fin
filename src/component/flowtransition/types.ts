export type FlowTrasitionType = {
    pages: {[x: string]: (props: FlowTrasitionParamsType) => JSX.Element};
    firstPage: string;
}
export type FlowTrasitionParamsType = {
    next: Function;
    back: Function;
}
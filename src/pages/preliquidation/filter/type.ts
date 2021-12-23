export type PreliquidationFilterPropsType = {
  onSubmit: Function;
  filters: PreliquidationFiltersType;
  validationSchema: object;
};

export type PreliquidationFiltersType = {
    preliquidationNumber?: string;
    taxIdentifier?: string;
    date?: string;
    state?: Array<number>;
  };


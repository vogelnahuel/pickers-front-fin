import { Checkbox } from "@pickit/pickit-components";
import Table from "component/table/Table";
import i18next from "i18next";
import { preliquidationTableTitles } from "utils/constants";
import "./tablePreliquidation.scss";
import { TablePreliquidationProps } from "./types";
import TreePoints from "../../../assets/transaction/TreePoints.svg";
import { AppDispatch, RootState } from "store";
import {
  actions as preliActions,
  allPreliquidationsSelected,
  preliquidationSelector,
} from "reducers/preliquidation";
import { PreliquidationItem } from "sagas/types/preliquidation";
import { connect } from "react-redux";

const TablePreliquidation = ({
  items,
  preliquidationsSelected,
  toggleItem,
  isAllSelected,
  toggleAll,
}: TablePreliquidationProps) => {
  const isSelected = (itemId: number) =>
    preliquidationsSelected?.map((p) => p.id).includes(itemId);

  return (
    <Table className="preliquidation-table">
      <thead>
        <tr>
          <td></td>
          {preliquidationTableTitles.map((title) => (
            <td>{i18next.t(title)}</td>
          ))}
          <td>
            <Checkbox value={isAllSelected} onChange={() => toggleAll && toggleAll()} />
          </td>
        </tr>
      </thead>
      <tbody>
        {items?.map((item) => (
          <tr key={item.id}>
            <td>
              <img
                className="img-transaction"
                src={TreePoints}
                alt="TreePoints"
              />
            </td>
            <td>{item.id}</td>
            <td>{item.fiscalNumber}</td>
            <td>{item.genereted_at}</td>
            <td>{item.status?.name}</td>
            <td>${item.total}</td>
            <td>
              {item.status?.tag === "APPROVED" && (
                <Checkbox value={isSelected(item.id)} onChange={() => toggleItem && toggleItem(item)} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const mapStateToProps = (state: RootState) => ({
  preliquidationsSelected:
    preliquidationSelector(state).preliquidationsSelected,
  isAllSelected: allPreliquidationsSelected(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  toggleItem: (item: PreliquidationItem) => {
    dispatch(preliActions.toggleItem(item));
  },
  toggleAll: () => {
    dispatch(preliActions.toggleAll());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TablePreliquidation);

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
import { useHistory } from "react-router-dom";
import Checkbox from "component/checkbox/Checkbox";
import React from "react";

const TablePreliquidation = ({
  items,
  preliquidationsSelected,
  toggleItem,
  isAllSelected,
  toggleAll,
}: TablePreliquidationProps) => {
  const history = useHistory();
  
  const isSelected = (itemId: number) =>
    preliquidationsSelected?.map((p) => p.id).includes(itemId);

  const redirect = (id: number) => {
    console.log("Redirect");
    history.push(`/preliquidation/${id}`);
  }

  const onChangeItem = (e: React.ChangeEvent<HTMLInputElement>, item: PreliquidationItem) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Change");
    toggleItem && toggleItem(item)
  }

  return (
    <Table className="preliquidation-table">
      <thead>
        <tr>
          <td></td>
          {preliquidationTableTitles.map((title) => (
            <td key={title}>{i18next.t(title)}</td>
          ))}
          <td>
            <Checkbox
              checked={isAllSelected || false}
              onChange={() => toggleAll && toggleAll()}
            />
          </td>
        </tr>
      </thead>
      <tbody>
        {items?.map((item) => (
          <tr
            className="preliquidation-table-tr"
            key={item.id}
            onClick={() => redirect(item.id)}
          >
            <td>
              <img
                className="img-transaction"
                src={TreePoints}
                alt="TreePoints"
              />
            </td>
            <td>{item.id}</td>
            <td>{item.fiscalNumber}</td>
            <td>{item.generatedAt}</td>
            <td>{item.status?.name}</td>
            <td>${item.total}</td>
            <td>
              {item.status?.tag === "approved" && (
                <Checkbox
                  checked={!!isSelected(item.id)}
                  onChange={(e) => onChangeItem(e, item)}
                />
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
  isAllSelected: allPreliquidationsSelected(state),
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

import React from "react";
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
  existApprovedPreliquidation
} from "reducers/preliquidation";
import { PreliquidationItem } from "sagas/types/preliquidation";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ISO8601toDDMMYYYHHMM } from "utils/iso8601toDDMMYYHHMM";
import Checkbox from "component/checkbox/Checkbox";

const TablePreliquidation = ({
  items,
  preliquidationsSelected,
  toggleItem,
  isAllSelected,
  toggleAll,
  approved
}: TablePreliquidationProps) => {
  const history = useHistory();

  const isSelected = (itemId: number) =>
    preliquidationsSelected?.map((p) => p.id).includes(itemId);

  const redirect = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id: number
  ) => {
   
    const target = e?.target as HTMLElement;
    if (target?.localName !== "input"){
      history.push(`/presettlements/${id}`);
    }
  
  };



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
              disabled={!approved}
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
            onClick={(e) => redirect(e, item.id)}
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
            <td>{ISO8601toDDMMYYYHHMM(item.generatedAt).substring(0, 11)}</td>
            <td>{i18next.t(`preli:label.select.${item.status?.tag}`)}</td>
            <td>${item.total}</td>
            <td>
              {item.status?.tag === "approved" || item.status?.tag === "pending_accounting" && (
                <Checkbox
                  checked={!!isSelected(item.id)}
                  onChange={() => toggleItem && toggleItem(item)}
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
  approved:existApprovedPreliquidation(state),

});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  toggleItem: (item: PreliquidationItem) => {
    dispatch(preliActions.toggleItem(item));
  },
  toggleAll: () => {
    dispatch(preliActions.toggleAll());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TablePreliquidation);

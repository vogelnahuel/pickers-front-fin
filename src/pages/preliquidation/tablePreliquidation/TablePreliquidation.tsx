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
import { useHistory } from "react-router-dom";
import { ISO8601toDDMMYYYHHMM } from "utils/iso8601toDDMMYYHHMM";

const TablePreliquidation = ({
  items,
  preliquidationsSelected,
  toggleItem,
  isAllSelected,
  toggleAll,
}: TablePreliquidationProps) => {
  console.log(items)
  const history = useHistory();
  const redirect = (id: number) => history.push(`/preliquidation/${id}`);

  const isSelected = (itemId: number) =>
    preliquidationsSelected?.map((p) => p.id).includes(itemId);

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
              value={isAllSelected}
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
            <td>{ISO8601toDDMMYYYHHMM(item.generatedAt).substring(0,11)}</td>
            <td>{item.status?.description}</td>
            <td>${item.total}</td>
            <td>
              {item.status?.tag === "APPROVED" && (
                <Checkbox
                  value={isSelected(item.id)}
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

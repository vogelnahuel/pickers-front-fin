import { Checkbox } from "@pickit/pickit-components";
import Table from "component/table/Table";
import i18next from "i18next";
import { preliquidationTableTitles } from "utils/constants";
import "./tablePreliquidation.scss";
import { TablePreliquidationProps } from "./types";
import TreePoints from "../../../assets/transaction/TreePoints.svg";

const TablePreliquidation = ({ items }: TablePreliquidationProps) => {
  return (
    <Table className="preliquidation-table">
      <thead>
        <tr>
          <td></td>
          {preliquidationTableTitles.map((title) => (
            <td>{i18next.t(title)}</td>
          ))}
          <td>
            <Checkbox input={true} onChange={console.log} />
          </td>
        </tr>
      </thead>
      <tbody>
        {items?.map((item) => (
          <tr>
            <td>
              <img
                className="img-transaction"
                src={TreePoints}
                alt="TreePoints"
              />
            </td>
            <td>Nro de preliquidación</td>
            <td>IF</td>
            <td>F. Generación</td>
            <td>Estado</td>
            <td>Total</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablePreliquidation;

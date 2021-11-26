import { Input } from "component/inputs/Input";
import Table from "component/table/Table";
import "./tablePreliquidation.scss";
import { TablePreliquidationProps } from "./types";

const TablePreliquidation = ({ items }: TablePreliquidationProps) => {
  return (
    <Table>
      <thead className="container-table">
        <tr className="container-table-row">
          <td className="container-table-col-sm-2"></td>
          <td className="container-table-col-sm-5">Nro de preliquidación</td>
          <td className="container-table-col-sm-4">IF</td>
          <td className="container-table-col-sm-4">F. Generación</td>
          <td className="container-table-col-sm-5">Estado</td>
          <td className="container-table-col-sm-3">Total</td>
          <td className="container-table-col-sm-2"></td>
        </tr>
      </thead>
      <tbody>
        {items?.map((item) => (
          <tr className="container-table-row">
            <td className="container-table-col-sm-2"></td>
            <td className="container-table-col-sm-5">Nro de preliquidación</td>
            <td className="container-table-col-sm-4">IF</td>
            <td className="container-table-col-sm-4">F. Generación</td>
            <td className="container-table-col-sm-5">Estado</td>
            <td className="container-table-col-sm-3">Total</td>
            <td className="container-table-col-sm-2"></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablePreliquidation;

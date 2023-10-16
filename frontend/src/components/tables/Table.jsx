import { useState, useMemo } from "react";
import PropType from "prop-types";
import {
  Chip,
  Image,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ApplicationForm from "../forms/ApplicationForm";
import AdvertisementForm from "../forms/dashboardForms/AdvertisementForm";

const DataTable = ({ type, data }) => {
  const colTitles = Object.keys(data[0]);
  const [page, setPage] = useState(1);
  const pages = Math.ceil(data.length / 10);
  const items = useMemo(() => {
    const start = (page - 1) * 10;
    const end = start + 10;
    return data.slice(start, end);
  }, [page, data]);

  const tableHeader = () => {
    const addRecord = () => {
      switch (type) {
        case "user":
          return <p>Actions</p>;
        case "company":
          return <p>Actions</p>;
        case "advertisement":
          return <AdvertisementForm companyId={0}/>;
        case "application":
          return <ApplicationForm adId={0}/>;
      }
    };

    return (
      <TableHeader items={colTitles}>
        {colTitles.map((item) =>
          item.includes("_id") ? (
            <TableColumn align="center" key={colTitles.indexOf(item)}>
              id
            </TableColumn>
          ) : (
            <TableColumn align="center" key={colTitles.indexOf(item)}>
              {item}
            </TableColumn>
          )
        )}
        <TableColumn className="text-center" align="end" items={items}>
          {addRecord()}
        </TableColumn>
      </TableHeader>
    );
  };

  const tableBody = () => {
    switch (type) {
      case "users":
        return (
          <>
            <TableBody items={items}>
              {(item) => (
                <TableRow key={item.user_id}>
                  <TableCell align="center">{item.user_id}</TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">{item.role}</TableCell>
                  <TableCell align="center">{item.created_at}</TableCell>
                  <TableCell align="center">{item.updated_at}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </>
        );
      case "advertisement":
        return (
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.advertisement_id}>
                <TableCell align="center">{item.advertisement_id}</TableCell>
                <TableCell align="center">
                  <Tooltip content={item.description}>
                    <span>{item.description.slice(0, 10)}</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">{item.salary}</TableCell>
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center">{item.city}</TableCell>
                <TableCell align="center">
                  {item.isActive ? (
                    <Chip color="success" variant="flat">
                      Active
                    </Chip>
                  ) : (
                    <Chip color="danger" variant="flat">
                      Inactive
                    </Chip>
                  )}
                  {item.isActive}
                </TableCell>
                <TableCell align="center">{item.contract_type}</TableCell>
                <TableCell align="center">{item.environment}</TableCell>
                <TableCell align="center">{item.created_at}</TableCell>
                <TableCell align="center">{item.updated_at}</TableCell>
                <TableCell align="center">{item.company}</TableCell>
                <TableCell
                  align="center"
                  className="flex flex-row justify-center items-center gap-4"
                >
                  <Tooltip content="Edit">
                    <span className="text-xl">
                      <AiOutlineEdit />
                    </span>
                  </Tooltip>
                  <Tooltip content="Delete" color="danger">
                    <span className="text-xl text-danger">
                      <AiOutlineDelete />
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        );
      case "company":
        return (
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.company_id}>
                <TableCell align="center">{item.company_id}</TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.size}</TableCell>
                <TableCell align="center">
                  <Image height={40} width={40} src={item.logo} />
                </TableCell>
                <TableCell
                  align="center"
                  className="flex flex-row justify-center items-center gap-4"
                >
                  <Tooltip content="Edit">
                    <span className="text-xl">
                      <AiOutlineEdit />
                    </span>
                  </Tooltip>
                  <Tooltip content="Delete" color="danger">
                    <span className="text-xl text-danger">
                      <AiOutlineDelete />
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        );
      case "application":
        return (
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell align="center">{item.id}</TableCell>
                <TableCell align="center">{item.fullname}</TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">{item.phone}</TableCell>
                <TableCell align="center">{item.cv}</TableCell>
                <TableCell align="center">{item.message}</TableCell>
                <TableCell align="center">{item.advertisement}</TableCell>
                <TableCell
                  align="center"
                  className="flex flex-row justify-center items-center gap-4"
                >
                  <Tooltip content="Edit advertisement">
                    <span className="text-xl">
                      <AiOutlineEdit />
                    </span>
                  </Tooltip>
                  <Tooltip content="Delete advertisement" color="danger">
                    <span className="text-xl text-danger">
                      <AiOutlineDelete />
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        );
    }
  };

  return (
    <>
      <p className="text-3xl">{type}</p>
      <Table
        aria-label="table"
        bottomContent={
          <div className="flex  w-full justify-center">
            <Pagination
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        {tableHeader()}
        {tableBody()}
      </Table>
    </>
  );
};

export default DataTable;

DataTable.propTypes = {
  type: PropType.string.isRequired,
  data: PropType.array.isRequired,
  put: PropType.func.isRequired,
  del: PropType.func.isRequired,
};

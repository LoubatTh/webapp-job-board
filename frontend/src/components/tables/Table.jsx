import { useState, useMemo } from "react";
import PropType from "prop-types";
import {
  Button,
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
import { AiOutlineDelete } from "react-icons/ai";
import ApplicationForm from "../forms/ApplicationForm";
import AdvertisementForm from "../forms/AdvertisementForm";
import PutAdvertisementForm from "../forms/updateForms/PutAdvertisementForm";
import PutApplicationForm from "../forms/updateForms/PutApplicationForm";
import CompanyForm from "../forms/CompanyForm";
import PutCompanyForm from "../forms/updateForms/PutCompanyForm";

const DataTable = ({ type, data, del, refreshData }) => {
  const colTitles = Object.keys(data[0]);
  const [page, setPage] = useState(1);
  const pages = Math.ceil(data.length / 10);
  const items = useMemo(() => {
    const start = (page - 1) * 10;
    const end = start + 10;
    return data.slice(start, end);
  }, [page, data]);

  const deleteRecords = (id) => {
    del(id).then(() => refreshData(type));
  };

  const tableHeader = () => {
    const addRecord = () => {
      switch (type) {
        case "user":
          return <p>Actions</p>;
        case "company":
          return <CompanyForm refreshData={() => refreshData(type)} />;
        case "advertisement":
          return (
            <AdvertisementForm companyId={0} refreshData={() => refreshData(type)} />
          );
        case "application":
          return <ApplicationForm adId={0} refreshData={() => refreshData(type)} />;
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
                  <TableCell
                    align="center"
                    className="flex flex-row justify-center items-center"
                  >
                    <Button
                      color="danger"
                      variant="light"
                      onPress={() => deleteRecords(item.user_id)}
                    >
                      <span className="text-xl text-danger">
                        <AiOutlineDelete />
                      </span>
                    </Button>
                  </TableCell>
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
                  className="flex flex-row justify-center items-center"
                >
                  <PutAdvertisementForm
                    data={item}
                    refreshData={() => refreshData(type)}
                  />
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => deleteRecords(item.advertisement_id)}
                  >
                    <span className="text-xl text-danger">
                      <AiOutlineDelete />
                    </span>
                  </Button>
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
                  className="flex flex-row justify-center items-center"
                >
                  <PutCompanyForm item={item} refreshData={() => refreshData(type)} />
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => deleteRecords(item.company_id)}
                  >
                    <span className="text-xl text-danger">
                      <AiOutlineDelete />
                    </span>
                  </Button>
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
                  className="flex flex-row justify-center items-center"
                >
                  <PutApplicationForm item={item} refreshData={() => refreshData(type)}/>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => deleteRecords(item.id)}
                  >
                    <span className="text-xl text-danger">
                      <AiOutlineDelete />
                    </span>
                  </Button>
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
  del: PropType.func.isRequired,
  refreshData: PropType.func.isRequired,
  // refresh: PropType.array.isRequired,
  // setRefresh: PropType.func.isRequired,
};

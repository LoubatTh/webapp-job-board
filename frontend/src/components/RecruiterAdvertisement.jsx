import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import PutAdvertisementForm from "../components/forms/updateForms/PutAdvertisementForm";
import { AiOutlineDelete, AiOutlineLink } from "react-icons/ai";

const RecruiterAdvertisement = ({ data, applications, del, refresh }) => {
  const columns = [
    { key: "id", value: "id" },
    { key: "name", value: "name" },
    { key: "email", value: "email" },
    { key: "phone", value: "phone" },
    { key: "cv", value: "cv" },
    { key: "message", value: "message" },
  ];
  console.log("RecruiterAdvertisement", applications);

  return (
    <>
      <Card className="max-w-[300px] sm:max-w-[600px] sm:w-[600px]">
        <CardHeader className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-md">{data.title}</p>
            <p className="text-small text-default-500">{data.created_at}</p>
          </div>
          <div>
            <PutAdvertisementForm data={data} refreshData={refresh} />
            <Button
              color="danger"
              variant="light"
              onPress={() => del(data.advertisement_id)}
            >
              <span className="text-xl">
                <AiOutlineDelete />
              </span>
            </Button>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="pb-0 gap-3">
          <Accordion>
            <AccordionItem title="Infos">
              <ul>
                <li>Contract : {data.contract_type}</li>
                <li>Location : {data.city}</li>
                <li>Environment : {data.environment}</li>
                <li>Salary : {data.salary}€</li>
                <li>Posted : {data.created_at}</li>
              </ul>
              <p className="mt-6">{data.description}</p>
            </AccordionItem>
          </Accordion>
          <Table aria-label="application_table">
            <TableHeader items={columns}>
              {columns.map((column) => (
                <TableColumn align="center" key={column.key}>
                  {column.value}
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody items={applications}>
              {(item) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.fullname}</TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">{item.phone}</TableCell>
                  <TableCell align="center"><a href={item.cv} target="_blank" rel="noreferrer"><AiOutlineLink/></a></TableCell>
                  <TableCell align="center">
                    <Tooltip content={item.message}>
                      <span>{item.message.slice(0, 10)}</span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
        <CardFooter className="flex flex-row-reverse gap-3">...</CardFooter>
      </Card>
    </>
  );
};

export default RecruiterAdvertisement;

RecruiterAdvertisement.propTypes = {
  data: PropTypes.shape({
    advertisement_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    contract_type: PropTypes.string.isRequired,
    environment: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    company: PropTypes.number.isRequired,
  }).isRequired,
  del: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      fullname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      cv: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

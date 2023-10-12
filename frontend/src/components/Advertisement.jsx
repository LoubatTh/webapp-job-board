import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Accordion,
  AccordionItem,
  Image,
} from "@nextui-org/react";
import ApplicationForm from "./forms/ApplicationForm";

const Advertisement = (data) => {
  const offer = data.data;
  const shortDescription = offer.description.slice(0, 90);

  return (
    <Card className="max-w-[300px] sm:max-w-[600px]">
      <CardHeader className="flex gap-3">
        <Image src={offer.company.logo} height={40} width={40} skeleton />
        <div className="flex flex-col">
          <p className="text-md">{offer.title}</p>
          <p className="text-small text-default-500">{offer.company.name}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="pb-0">
        <p className="text-default-500">{shortDescription}...</p>
        <Accordion>
          <AccordionItem title="Learn more">
            <ul>
              <li>Contract : {offer.contract_type}</li>
              <li>Location : {offer.city}</li>
              <li>Environment : {offer.environment}</li>
              <li>Salary : {offer.salary}€</li>
            </ul>
            <p className="mt-6">{offer.description}</p>
          </AccordionItem>
        </Accordion>
      </CardBody>
      <CardFooter className="flex flex-row-reverse">
        <ApplicationForm adId={offer.advertisement_id} />
      </CardFooter>
    </Card>
  );
};

export default Advertisement;

Advertisement.propTypes = {
  data: PropTypes.shape({
    advertisement_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    contract_type: PropTypes.string.isRequired,
    environment: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      logo: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

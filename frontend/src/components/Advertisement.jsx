import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";

const Advertisement = (data) => {
  const offer = data.data;

  return (
    <Card className="max w-[300px] my-4">
      <CardHeader className="flex gap-3">
        <Image src={offer.company.logo} height={40} width={40} />
        <div className="flex flex-col">
          <p className="text-md">{offer.title}</p>
          <p className="text-small text-default-500">{offer.company.name}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{offer.description}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <p>
          {offer.contract_type} - {offer.environment} - {offer.city}{" "}
        </p>
      </CardFooter>
    </Card>
  );
};

export default Advertisement;

Advertisement.PropTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
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

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineEdit } from "react-icons/ai";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";

import { PutAdvertisement } from "../../../services/advertisement.service";
import { GetCompany } from "../../../services/company.service";

const PutAdvertisementForm = ({ data }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [description, setDescription] = useState(data.description);
  const [title, setTitle] = useState(data.title);
  const [city, setCity] = useState(data.city);
  const [salary, setSalary] = useState(data.salary);
  const [isActive, setIsActive] = useState(data.isActive);
  const [contractType, setContractType] = useState(data.contract_type);
  const [environment, setEnvironment] = useState(data.environment);
  const [company, setCompany] = useState();
  const [companyData, setCompanyData] = useState();

  useEffect(() => {
    GetCompany().then((res) => {
      setCompanyData(res.data);
      setCompany(
        res.data.find((item) => item.company_id === data.company).name
      );
    });
  }, [data]);

  const companyDropdownItems = companyData?.map((item) => {
    return <DropdownItem key={item.name}>{item.name}</DropdownItem>;
  });

  const handleSubmit = () => {
    const date = new Date();

    let formData = {
      title: title,
      city: city,
      salary: salary,
      isActive: isActive,
      description: description,
      contractType: contractType,
      environment:
        typeof environment === "object" ? environment.currentKey : environment,
      company: companyData?.find((item) => item.name === company.currentKey)
        ? companyData?.find((item) => item.name === company.currentKey)
            .company_id
        : data.company,
      created_at: data.created_at,
      updated_at: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
    };

    PutAdvertisement(data.advertisement_id, JSON.stringify(formData)).then(
      (res) => console.log(res)
    );
  };

  return (
    <>
      <Button color="primary" variant="light" onPress={onOpen}>
        <span className="text-xl">
          <AiOutlineEdit />
        </span>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Advertisement
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  isRequired
                  label="title"
                  aria-label="title"
                  placeholder="Enter a title"
                  variant="faded"
                  color="default"
                  type="text"
                  value={title}
                  onValueChange={setTitle}
                />
                <Input
                  autoFocus
                  isRequired
                  label="city"
                  aria-label="city"
                  placeholder="Enter a city"
                  variant="faded"
                  color="default"
                  type="text"
                  value={city}
                  onValueChange={setCity}
                />
                <Input
                  autoFocus
                  isRequired
                  label="salary"
                  aria-label="salary"
                  placeholder="Enter a salary"
                  variant="faded"
                  color="default"
                  type="text"
                  value={salary}
                  onValueChange={setSalary}
                />
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="faded">{contractType}</Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="contractType"
                    selectionMode="single"
                    selectedKeys={contractType}
                    onSelectionChange={(e) => setContractType(e.currentKey)}
                  >
                    <DropdownItem key="CDI">CDI</DropdownItem>
                    <DropdownItem key="CDD">CDD</DropdownItem>
                    <DropdownItem key="Alternance">Alternance</DropdownItem>
                    <DropdownItem key="Stage">Stage</DropdownItem>
                    <DropdownItem key="Freelance">Freelance</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="faded">{environment}</Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="environment"
                    selectionMode="single"
                    selectedKeys={environment}
                    onSelectionChange={setEnvironment}
                  >
                    <DropdownItem key="site">Site</DropdownItem>
                    <DropdownItem key="hybrid">Hybrid</DropdownItem>
                    <DropdownItem key="remote">Remote</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="faded">{company}</Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="company"
                    selectionMode="single"
                    selectedKeys={company}
                    onSelectionChange={setCompany}
                  >
                    {companyDropdownItems}
                  </DropdownMenu>
                </Dropdown>
                <Textarea
                  label="description"
                  value={description}
                  variant="faded"
                  onValueChange={setDescription}
                />
                <Checkbox isSelected={isActive} onValueChange={setIsActive}>
                  is Active
                </Checkbox>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleSubmit();
                    onClose;
                  }}
                >
                  Apply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PutAdvertisementForm;

PutAdvertisementForm.propTypes = {
  data: PropTypes.shape({
    advertisement_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    environment: PropTypes.string.isRequired,
    contract_type: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    company: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

import PropType from "prop-types";
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
import { useEffect, useState } from "react";
import { PostAdvertisement } from "../../services/advertisement.service";
import { GetCompany } from "../../services/company.service";

const AdvertisementForm = ({ companyId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [city, setCity] = useState();
  const [salary, setSalary] = useState();
  const [isActive, setIsActive] = useState();
  const [contractType, setContractType] = useState("Contract type");
  const [environment, setEnvironment] = useState("Environment");
  const [company, setCompany] = useState("Company");
  const [companyData, setCompanyData] = useState();

  useEffect(() => {
    GetCompany().then((res) => setCompanyData(res.data));
  }, []);

  const companyDropdownItems = companyData?.map((item) => {
    return <DropdownItem key={item.name}>{item.name}</DropdownItem>;
  });

  const handleSubmit = () => {
    const date = new Date();
    let data = {
      title: title,
      city: city,
      salary: salary,
      isActive: isActive,
      contractType: contractType.currentKey,
      environment: environment.currentKey,
      company: companyData?.find((item) => item.name === company.currentKey)
        .company_id,
      description: description,
      created_at: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
      updated_at: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
    };

    PostAdvertisement(JSON.stringify(data)).then((res) => res.status != 201 ? console.log(res) : null);
  };

  return (
    <>
      {companyId === 0 ? (
        <Button onPress={onOpen} variant="light" color="primary">
          Add advertisement
        </Button>
      ) : (
        <Button onPress={onOpen} color="primary">
          Add advertisement
        </Button>
      )}
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
                    onSelectionChange={setContractType}
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
                {companyId === 0 ? (
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
                ) : null}

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

export default AdvertisementForm;

AdvertisementForm.propTypes = {
  companyId: PropType.number.isRequired,
};

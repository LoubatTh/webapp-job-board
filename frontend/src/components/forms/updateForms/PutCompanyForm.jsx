import { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineEdit } from "react-icons/ai";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { PutCompany } from "../../../services/company.service";

const PutCompanyForm = ({ item }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState(item.name);
  const [size, setSize] = useState(item.size);
  const [logo, setLogo] = useState(item.logo);

  const handleSubmit = () => {
    let data = {
      name: name,
      size: size,
      logo: logo,
    };

    PutCompany(item.company_id, JSON.stringify(data)).then((res) =>
      console.log(res)
    );
    onOpenChange(false);
  };

  return (
    <>
      <Button onPress={onOpen} variant="light" color="primary" auto>
        <AiOutlineEdit />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="text-black"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Application
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  isRequired
                  label="name"
                  aria-label="name"
                  placeholder="Enter a name"
                  variant="faded"
                  color="default"
                  type="text"
                  value={name}
                  onValueChange={setName}
                />
                <Input
                  isRequired
                  label="size"
                  aria-label="size"
                  placeholder="Enter a size"
                  variant="faded"
                  color="default"
                  type="number"
                  value={size}
                  onValueChange={setSize}
                />
                <Input
                  isRequired
                  label="logo"
                  aria-label="logo"
                  placeholder="Enter the logo url"
                  variant="faded"
                  color="default"
                  type="text"
                  value={logo}
                  onValueChange={setLogo}
                />
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

export default PutCompanyForm;

PutCompanyForm.propTypes = {
  item: PropTypes.shape({
    company_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    logo: PropTypes.string.isRequired,
  }).isRequired,
};

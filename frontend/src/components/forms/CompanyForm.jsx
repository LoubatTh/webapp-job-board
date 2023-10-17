import { useState } from "react";
import { PostCompany } from "../../services/company.service";
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

const CompanyForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState();
  const [size, setSize] = useState();
  const [logo, setLogo] = useState();

  const handleSubmit = () => {
    let data = {
      name: name,
      size: size,
      logo: logo,
    };

    PostCompany(JSON.stringify(data)).then((res) => console.log(res));
    onOpenChange(false);
  };

  return (
    <>
      <Button onPress={onOpen} variant="light" color="primary" auto>
        Add company
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

export default CompanyForm;

import PropTypes from "prop-types";
import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";

import { PutApplication } from "../../../services/application.service";
import { AiOutlineEdit } from "react-icons/ai";

const PutApplicationForm = ({ item, refreshData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState(item.fullname);
  const [email, setEmail] = useState(item.email);
  const [phone, setPhone] = useState(item.phone);
  const [cv, setCv] = useState(item.cv);
  const [message, setMessage] = useState(item.message);
  const [advertisement, setAdvertisement] = useState(item.advertisement);

  const handleSubmit = () => {
    let data = {
      fullname: name,
      email: email,
      phone: phone,
      cv: cv,
      message: message,
      advertisement: advertisement,
    };

    try {
      PutApplication(item.id, JSON.stringify(data)).then(() => refreshData());
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button color="primary" variant="light" onPress={onOpen}>
        <span className="text-xl">
          <AiOutlineEdit />
        </span>
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
                  label="email"
                  aria-label="email"
                  placeholder="Enter a email"
                  variant="faded"
                  color="default"
                  type="email"
                  value={email}
                  onValueChange={setEmail}
                />
                <Input
                  isRequired
                  label="phone"
                  aria-label="phone"
                  placeholder="Enter a phone"
                  variant="faded"
                  color="default"
                  type="text"
                  value={phone}
                  onValueChange={setPhone}
                />
                <Input
                  isRequired
                  label="cv"
                  aria-label="cv"
                  placeholder="Enter the url of your cv"
                  variant="faded"
                  color="default"
                  type="text"
                  value={cv}
                  onValueChange={setCv}
                />
                <Textarea
                  label="message"
                  value={message}
                  variant="faded"
                  onValueChange={setMessage}
                />
                <Input
                  isRequired
                  label="advertisement"
                  aria-label="advertisement"
                  placeholder="Enter the id of your advertisement"
                  variant="faded"
                  color="default"
                  type="text"
                  value={advertisement}
                  onValueChange={setAdvertisement}
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

export default PutApplicationForm;

PutApplicationForm.propTypes = {
  item: PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      fullname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      cv: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      advertisement: PropTypes.number.isRequired,
    }.isRequired
  ),
  refreshData: PropTypes.func.isRequired,
};

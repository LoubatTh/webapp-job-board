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

import { PostApplication } from "../../services/application.service";

const ApplicationForm = ({ adId, refreshData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [cv, setCv] = useState();
  const [message, setMessage] = useState();
  const [advertisement, setAdvertisement] = useState();

  const handleSubmit = () => {
    let data = {
      fullname: name,
      email: email,
      phone: phone,
      cv: cv,
      message: message,
      advertisement: adId === 0 ? advertisement : adId,
    };

    try {
      PostApplication(JSON.stringify(data)).then(() =>
        refreshData ? refreshData() : null
      );
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {adId === 0 ? (
        <Button onPress={onOpen} color="primary" variant="light" auto>
          Apply
        </Button>
      ) : (
        <Button onPress={onOpen} color="primary" auto>
          Apply
        </Button>
      )}
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
                {adId === 0 ? (
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
                ) : null}
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

export default ApplicationForm;

ApplicationForm.propTypes = {
  adId: PropTypes.number.isRequired,
  refreshData: PropTypes.func,
};

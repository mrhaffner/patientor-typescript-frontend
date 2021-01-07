import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddOccupationalHealthcareEntryForm, { OccupationalHealthcareEntryFormValues } from './AddOccEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
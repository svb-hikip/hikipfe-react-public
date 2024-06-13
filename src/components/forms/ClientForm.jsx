import PropTypes from 'prop-types';
import ModalTransitionWrapper from '../utils/ModalTransitionWrapper';
import { TextFormField, PhoneFormField, EmailFormField, SwitchFormField, DropdownFormField, RepeatableField } from './components/FormComps';
import { useForm } from 'react-hook-form';
import { addNewClient, updateClient } from '../../apis/ClientAPIs'; // Assuming you have an updateClient API function
import { toast } from 'react-toastify';

function ClientForm({ isOpen, setIsOpen, clientData, setClientData }) {
  const isEditing = Boolean(clientData);

  const { handleSubmit, register, control, formState: { errors }, setError, reset } = useForm({
    defaultValues: clientData || {
      client_type: 'Adult',
      billing_type: 'Self Pay',
      contact: {
        contactphone_set: [
          {
            phone_number: '',
            type: 'Home',
            voice: true,
            text: true,
            contact: ''
          }
        ],
        contactemail_set: [
          {
            email: '',
            type: 'Home',
            permission: true,
            contact: ''
          }
        ],
        legal_first_name: '',
        legal_last_name: '',
        relationship: 'Self',
        client_portal_access: true,
        client: ''
      }
    }
  });

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        const response = await updateClient(data);
        clientData || setClientData(response.data);
        toast.success('Client updated successfully!');
      } else {
        const response = await addNewClient(data);
        clientData || setClientData(response.data);
        toast.success('Client added successfully!');
      }
      
      setIsOpen(false);
      reset(); // Reset form after submission
    } catch (error) {
      if (error.response && error.response.data) {
        const serverErrors = error.response.data;
        Object.keys(serverErrors).forEach((field) => {
          const message = serverErrors[field];
          setError(field, { type: 'server', message });
        });
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <ModalTransitionWrapper
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      actionButtons={[
        { label: isEditing ? 'Update' : 'Create', onClick: handleSubmit(onSubmit), className: 'rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50' },
      ]}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 p-4">
        <div className="mb-4">
          <h2 className="text-base font-semibold leading-7 text-gray-900">{isEditing ? 'Edit Client Information' : 'Client Information'}</h2>
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <DropdownFormField
                label="Client Type"
                name="client_type"
                control={control}
                options={[{ value: 'Adult', label: 'Adult' }, { value: 'Child', label: 'Child' }]}
              />
            </div>
            <div className="sm:col-span-3">
              <DropdownFormField
                label="Billing Type"
                name="billing_type"
                control={control}
                options={[{ value: 'Insurance', label: 'Insurance' }, { value: 'Self Pay', label: 'Self Pay' }]}
              />
            </div>
            <div className="sm:col-span-3">
              <TextFormField
                label="First Name"
                placeholder="Enter first name"
                register={register}
                name="contact.legal_first_name"
                error={errors?.contact?.legal_first_name}
              />
              {errors?.contact?.legal_first_name && <p className="text-red-500">First name is required.</p>}
            </div>
            <div className="sm:col-span-3">
              <TextFormField
                label="Last Name"
                placeholder="Enter last name"
                register={register}
                name="contact.legal_last_name"
                error={errors?.contact?.legal_last_name}
              />
              {errors?.contact?.legal_last_name && <p className="text-red-500">Last name is required.</p>}
            </div>
            <div className="col-span-full">
              <RepeatableField 
                control={control} 
                name="contact.contactphone_set" 
                renderField={({ control, index, errors, register }) => (
                  <PhoneFormField control={control} index={index} errors={errors} register={register} />
                )} 
                errors={errors} 
                register={register}
              />
            </div>
            <div className="col-span-full">
              <RepeatableField 
                control={control} 
                name="contact.contactemail_set" 
                renderField={({ control, index, errors, register }) => (
                  <EmailFormField control={control} index={index} errors={errors} register={register} />
                )} 
                errors={errors} 
                register={register}
              />
            </div>
            <div className="col-span-full">
              <SwitchFormField
                label="Portal access"
                description="The client will receive login credentials to fill intake form and schedule appointments"
                control={control}
                name="contact.client_portal_access"
              />
            </div>
          </div>
        </div>
      </form>
    </ModalTransitionWrapper>
  );
}

ClientForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setClientData: PropTypes.func,
  clientData: PropTypes.object, // Prop for existing client data, if any
};

export default ClientForm;

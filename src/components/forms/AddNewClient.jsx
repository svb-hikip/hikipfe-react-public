import PropTypes from 'prop-types';
import ModalTransitionWrapper from '../utils/ModalTransitionWrapper';
import { TextFormField, PhoneFormField, EmailFormField, SwitchFormField, DropdownFormField } from './components/FormComps';
import { useForm } from 'react-hook-form';
import { addNewClient } from '../../apis/ClientAPIs';
import { toast } from 'react-toastify';

function AddNewClient({ isOpen, setIsOpen }) {
  const { handleSubmit, register, control, formState: { errors }, setError } = useForm({
    defaultValues: {
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
      const response = await addNewClient(data);
      setIsOpen(false);
    } catch (error) {
      if (error.response && error.response.data) {
        const serverErrors = error.response.data;
        console.log(serverErrors, ":::");
        Object.keys(serverErrors).forEach((field) => {
          const message = serverErrors[field];
          setError(field, { type: 'server', message });
        });
      } else {
        console.log('An unexpected error occurred:', error.response);
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <ModalTransitionWrapper
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      actionButtons={[
        { label: 'Create', onClick: handleSubmit(onSubmit), className: 'rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50' },
      ]}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 p-4">
        <div className="mb-4">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Client Information</h2>
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
              <PhoneFormField control={control} register={register}  errors={errors} />
            </div>
            <div className="col-span-full">
              <EmailFormField control={control} register={register}  errors={errors} />
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

AddNewClient.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default AddNewClient;
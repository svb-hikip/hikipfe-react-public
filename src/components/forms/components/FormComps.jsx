import { Field, Label, Switch, Description } from '@headlessui/react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function TextFormField({ label, placeholder, register, name, error }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          {...register(name, { required: `${label} is required` })}
          type="text"
          id={name}
          className={classNames(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset",
            error ? "ring-red-500" : "ring-gray-300",
            "placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          )}
          placeholder={placeholder}
        />
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    </div>
  );
}

TextFormField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.object
};

export function DropdownFormField({ control, label, name, options }) {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <select
              {...field}
              id={name}
              className="mt-1 block w-full rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
      </div>
    </>
  );
}

DropdownFormField.propTypes = {
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
};

export function SwitchFormField({ control, label, name, description }) {
  return (
    <div>
      <Field as="div" className="flex items-center justify-right">
        <Label as="span" className="text-sm font-medium text-gray-700 pr-2" passive>
          {label}
        </Label>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Switch
              checked={value}
              onChange={onChange}
              className={classNames(
                value ? 'bg-green-200' : 'bg-red-200',
                'relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  value ? 'translate-x-5' : 'translate-x-0',
                  'inline-block w-5 h-5 transform rounded-full bg-white shadow ring-0 transition ease-in-out duration-200'
                )}
              />
            </Switch>
          )}
        />
      </Field>
      <Description as="span" className="text-sm text-gray-500">
        {description}
      </Description>
    </div>
  );
}

SwitchFormField.propTypes = {
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string
};

export function PhoneFormField({ control, register, errors }) {
  return (
    <div className="px-4 py-4 bg-white shadow sm:p-4">
      <fieldset>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="col-span-1 sm:col-span-7">
            <TextFormField 
              label="Phone" 
              register={register} 
              name="contact.contactphone_set[0].phone_number"
              error={errors?.contact?.contactphone_set?.[0]?.phone_number} // Pass the error object
            />
          </div>
          <div className="col-span-1 sm:col-span-5">
            <DropdownFormField 
              label="Type" 
              name="contact.contactphone_set[0].type" 
              control={control} 
              options={[{ value: "Home", label: "Home" }, { value: "Work", label: "Work" }]} 
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SwitchFormField 
            label="OK to call" 
            name="contact.contactphone_set[0].voice" 
            control={control} 
          />
          <SwitchFormField 
            label="OK to Text" 
            name="contact.contactphone_set[0].text" 
            control={control} 
          />
        </div>
      </fieldset>
    </div>
  );
}

PhoneFormField.propTypes = {
  control: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object, // Adjust this according to the shape of your errors object
};

PhoneFormField.defaultProps = {
  errors: {},
};

export function EmailFormField({ control, register, errors }) {
  return (
    <div className="px-4 py-4 bg-white shadow sm:p-4">
      <fieldset>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="col-span-1 sm:col-span-7">
            <TextFormField 
              label="Email ID" 
              register={register} 
              name="contact.contactemail_set[0].email"
              error={errors?.contact?.contactemail_set?.[0]?.email} // Pass the error object
            />
          </div>
          <div className="col-span-1 sm:col-span-5">
            <DropdownFormField 
              label="Type" 
              name="contact.contactemail_set[0].type" 
              control={control} 
              options={[{ value: "Home", label: "Home" }, { value: "Work", label: "Work" }]} 
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SwitchFormField 
            label="OK to Email" 
            name="contact.contactemail_set[0].permission" 
            control={control} 
          />
        </div>
      </fieldset>
    </div>
  );
}
EmailFormField.propTypes = {
  control: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object, // Adjust this according to the shape of your errors object
};

EmailFormField.defaultProps = {
  errors: {},
};
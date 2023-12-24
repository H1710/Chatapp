import React, { ChangeEvent, FormEvent } from 'react';
import CustomButton from '../Button/CustomButton';
import { IUserRegiter } from '../../models/auth.model';

interface FirstStepProps {
  loadingFirstStep: boolean;
  values: IUserRegiter;
  submitFirstStep: (e: FormEvent, values: IUserRegiter) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FirstStep: React.FC<FirstStepProps> = ({
  loadingFirstStep,
  values,
  submitFirstStep,
  handleChange,
}) => {
  const formInput = [
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'password', type: 'password', label: 'Password' },
    { name: 'confirmPassword', type: 'password', label: 'Confirm Password' },
  ];

  return (
    <form className="mt-4" onSubmit={e => submitFirstStep(e, values)}>
      {formInput.map((item, id) => (
        <div className="mt-4 text-sm" key={id}>
          <label htmlFor={item.name} className="block text-black">
            {item.label}
          </label>
          <input
            type={item.type}
            autoComplete="off"
            className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
            placeholder={item.label}
            name={item.name}
            value={values[item.name as keyof typeof values]}
            required
            onChange={e => handleChange(e)}
          />
        </div>
      ))}
      <div className="flex justify-end mb-4 text-xs text-gray-600">
        {/* <span style={{ cursor: 'pointer', color: '#3386ff' }}>
          Forget Password?
        </span> */}
      </div>

      <div className="flex gap-20">
        <CustomButton
          classContent={`flex-1 text-center text-white bg-[#3386ff] hover:bg-[#0068ff] p-3 duration-300 rounded-sm flex justify-center items-center gap-2`}
          text={'Next'}
          type="submit"
          isLoading={loadingFirstStep}
          handleSubmit={() => {}}
        />
      </div>
    </form>
  );
};

export default FirstStep;

import React, { ChangeEvent, FormEvent } from 'react';
import CustomButton from '../Button/CustomButton';
import { IUserRegiter } from '../../models/auth.model';

interface SetInfoProps {
  loadingSubmitInfo: boolean;
  values: IUserRegiter;
  submitUserInfo: (e: FormEvent, values: IUserRegiter) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SetInfo: React.FC<SetInfoProps> = ({
  loadingSubmitInfo,
  values,
  submitUserInfo,
  handleChange,
}) => {
  const formInput = [
    { name: 'firstname', type: 'text', label: 'First Name' },
    { name: 'lastname', type: 'text', label: 'Last Name' },
  ];

  return (
    <form className="mt-4" onSubmit={e => submitUserInfo(e, values)}>
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
            required
            value={values[item.name as keyof typeof values]}
            onChange={e => handleChange(e)}
          />
        </div>
      ))}

      <div className="flex mt-4">
        <CustomButton
          classContent={`flex-1 text-center text-white bg-[#3386ff] hover:bg-[#0068ff] p-3 duration-300 rounded-sm flex justify-center items-center gap-2`}
          text={'Submit'}
          type="submit"
          handleSubmit={() => {}}
          isLoading={loadingSubmitInfo}
        />
      </div>
    </form>
  );
};

export default SetInfo;

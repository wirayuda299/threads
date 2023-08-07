import type { UseFormRegister } from 'react-hook-form';

type FormInputProps = {
	register: UseFormRegister<{
		email: string;
		password: string;
		username: string;
	}>;
	isError: boolean;
	errorMessage: string;
	field: 'email' | 'password' | 'username';
	textLabel: string;
	placeholder: string;
};

export default function FormInput({
	register,
	isError,
	errorMessage,
	field,
	placeholder,
	textLabel,
}: FormInputProps) {
	return (
		<div className='w-full mb-5'>
			<label htmlFor={field} className='block text-xs text-gray-600 uppercase'>
				{textLabel}
			</label>
			<input
				id={field}
				type={field !== 'password' ? 'text' : 'password'}
				placeholder={placeholder}
				autoComplete='off'
				{...register(field, {
					required: true,
					minLength: 8,
					maxLength: 200,
				})}
				className='w-full py-2 rounded-lg px-3 focus:outline-none shadow-lg'
			/>

			{isError && <p className='text-red-500 text-xs pt-1'>{errorMessage}</p>}
		</div>
	);
}

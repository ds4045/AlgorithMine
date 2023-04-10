import { Dispatch, FC, FormEvent, SetStateAction } from 'react';
import { Input } from 'antd';
type FormType = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  email: string;
  password: string;
  buttonName: any;
};
const Form: FC<FormType> = ({
  handleSubmit,
  setPassword,
  setEmail,
  email,
  password,
  buttonName,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">{buttonName}</button>
    </form>
  );
};

export default Form;

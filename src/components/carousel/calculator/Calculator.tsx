import { Button, Input } from 'antd';
import styles from './calculator.module.css';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
const initialState = {
  th: '1',
  btc: '1',
  power: '1',
  cost: '0',
  pool: '0',
};
const Calculator = () => {
  const [value, setValue] = useState(initialState);
  const [res, setRes] = useState(0);
  const calc = () => {
    const cost = (Number(value.power) * Number(value.cost)) / 2;
    const res =
      Number(value.th) * (Number(value.btc) / 13500) -
      (Number(value.th) / 100) * Number(value.pool) -
      cost;
    setRes(() => (res > 0 ? Math.round(res) : 0));
    setValue(initialState);
  };
  return (
    <div className={styles.calc_wrapper}>
      <h2>
        <FormattedMessage id="calculator.title" />
      </h2>
      <Input
        value={value.th}
        onChange={(e) => {
          setValue((prev) => ({ ...prev, th: e.target.value }));
        }}
        addonBefore={<FormattedMessage id="calculator.th" />}
        type="number"
        min={1}
        placeholder="1000"
        className={styles.inp}
      />
      <Input
        onChange={(e) => {
          setValue((prev) => ({ ...prev, btc: e.target.value }));
        }}
        value={value.btc}
        addonBefore={<FormattedMessage id="calculator.btc" />}
        type="number"
        min={1}
        className={styles.inp}
      />
      <Input
        onChange={(e) => {
          setValue((prev) => ({ ...prev, power: e.target.value }));
        }}
        value={value.power}
        addonBefore={<FormattedMessage id="calculator.btc" />}
        type="number"
        min={1}
        className={styles.inp}
      />
      <Input
        onChange={(e) => {
          setValue((prev) => ({ ...prev, cost: e.target.value }));
        }}
        value={value.cost}
        addonBefore={<FormattedMessage id="calculator.cost" />}
        type="number"
        min={0}
        className={styles.inp}
      />
      <Input
        onChange={(e) => {
          setValue((prev) => ({ ...prev, pool: e.target.value }));
        }}
        value={value.pool}
        addonBefore={<FormattedMessage id="calculator.pool" />}
        type="number"
        min={0}
        max={100}
        className={styles.inp}
      />
      <Button className={styles.btn} type="primary" onClick={calc}>
        <FormattedMessage id="calculator.calc" />
      </Button>
      <h3>
        <FormattedMessage id="calculator.res" /> {res}$
      </h3>
    </div>
  );
};

export default Calculator;

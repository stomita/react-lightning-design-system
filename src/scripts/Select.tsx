import React, { Component } from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { uuid } from './util';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type SelectProps = {
  id?: string;
  className?: string;
  label?: string;
  required?: boolean;
  totalCols?: number;
  cols?: number;
  error?: FormElementProps['error'];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>, value: string) => void;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'>;

export type SelectState = {
  id: string;
};

export class Select extends Component<SelectProps, SelectState> {
  static isFormElement = true;

  constructor(props: Readonly<SelectProps>) {
    super(props);
    this.state = { id: `form-element-${uuid()}` };
  }

  onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  render() {
    const id = this.props.id || this.state.id;
    const { label, required, error, totalCols, cols, ...props } = this.props;
    if (label || required || error || totalCols || cols) {
      const formElemProps = { id, label, required, error, totalCols, cols };
      return (
        <FormElement {...formElemProps}>
          <Select {...{ ...props, id }} />
        </FormElement>
      );
    }
    const {
      className,
      children,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onChange,
      ...pprops
    } = props;
    const selectClassNames = classnames(className, 'slds-select');
    return (
      <select
        id={id}
        className={selectClassNames}
        onChange={this.onChange.bind(this)}
        {...pprops}
      >
        {children}
      </select>
    );
  }
}

export type OptionProps = {
  label?: string | number;
} & Omit<React.OptionHTMLAttributes<HTMLOptionElement>, 'label'>;

export const Option: React.FC<OptionProps> = (props) => {
  const { label, children, ...pprops } = props;
  return <option {...pprops}>{label || children}</option>;
};
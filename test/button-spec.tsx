import React from 'react';
import { shallow } from 'enzyme';

import {
  Button,
  ButtonIcon,
  ButtonIconAlign,
  ButtonIconSize,
} from '../src/scripts/Button';
import { Icon } from '../src/scripts/Icon';

describe('Button', () => {
  it('should render button with className', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.prop('className')).toEqual('slds-button');
  });

  it('should render button with children', () => {
    const children = <span>Test</span>;
    const wrapper = shallow(<Button>{children}</Button>);
    expect(wrapper.contains(children)).toBe(true);
  });

  it('should render button with specific className', () => {
    const className = 'test';
    const wrapper = shallow(<Button className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  it('should render button with label', () => {
    const label = 'Label';
    const wrapper = shallow(<Button label={label} />);
    expect(wrapper.text()).toEqual(label);
  });

  it('should render button with alt', () => {
    const alt = 'alt';
    const wrapper = shallow(<Button alt={alt} />);
    expect(wrapper.find('.slds-assistive-text').text()).toEqual(alt);
  });

  it('should render button based on a type', () => {
    const type = 'brand';
    const wrapper = shallow(<Button type={type} />);
    expect(wrapper.hasClass(`slds-button_${type}`)).toBe(true);
  });

  it('should render button based on htmlType', () => {
    const htmlType = 'button';
    const wrapper = shallow(<Button htmlType={htmlType} />);
    expect(wrapper.prop('type')).toEqual(htmlType);
  });

  it('should render disabled button', () => {
    const wrapper = shallow(<Button disabled />);
    expect(wrapper.prop('disabled')).toBe(true);
  });

  it('should render selected button', () => {
    const wrapper = shallow(<Button selected />);
    expect(wrapper.hasClass('slds-is-selected')).toBe(true);
  });

  it('should render button with icon based on size and align', () => {
    const props = {
      icon: 'download',
      iconAlign: 'left' as ButtonIconAlign,
      iconSize: 'small' as ButtonIconSize,
    };
    const expectedProps = {
      icon: props.icon,
      align: props.iconAlign,
      size: props.iconSize,
    };

    const label = 'Label';

    const wrapper = shallow(<Button {...props} label={label} />);
    expect(
      wrapper.contains(<ButtonIcon {...expectedProps} inverse={false} />)
    ).toBe(true);
    expect(wrapper.html().indexOf(`${label}</`)).not.toEqual(-1);
  });

  it('should render button with icon more', () => {
    const iconMore = 'down';
    const wrapper = shallow(<Button iconMore={iconMore} />);
    expect(
      wrapper.contains(
        <ButtonIcon icon={iconMore} align='right' size='small' />
      )
    ).toBe(true);
  });

  it('should render button with props', () => {
    const wrapper = shallow(<Button onClick={() => {}} />);
    expect(wrapper.prop('onClick')).toBeInstanceOf(Function);
  });
});

describe('ButtonIcon', () => {
  it('should render button icon with className', () => {
    const wrapper = shallow(<ButtonIcon icon='setting' />);
    expect(wrapper.prop('className')).toEqual('slds-button__icon');
  });

  it('should render button icon with specific className', () => {
    const className = 'test';
    const wrapper = shallow(
      <ButtonIcon className={className} icon='setting' />
    );
    expect(wrapper.hasClass(className)).toBe(true);
  });

  it('should render button icon based on align', () => {
    const align = 'right';
    const wrapper = shallow(<ButtonIcon align={align} icon='setting' />);
    expect(wrapper.hasClass(`slds-button__icon_${align}`)).toBe(true);
  });

  it('should render button icon based on size', () => {
    const size = 'medium';
    const wrapper = shallow(<ButtonIcon size={size} icon='setting' />);
    expect(wrapper.hasClass(`slds-button__icon_${size}`)).toBe(true);
  });

  it('should render button icon inversed', () => {
    const wrapper = shallow(<ButtonIcon inverse icon='setting' />);
    expect(wrapper.hasClass('slds-button__icon_inverse')).toBe(true);
  });

  it('should call Icon component with props', () => {
    const props = {
      icon: 'test',
      test: 'test',
    };

    const expectedProps = {
      icon: 'test',
      test: 'test',
      textColor: undefined,
      className: 'slds-button__icon',
    };

    const wrapper = shallow(<ButtonIcon {...props} />);
    expect(wrapper.matchesElement(<Icon {...expectedProps} />)).toBe(true);
  });
});

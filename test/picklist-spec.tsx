import React from 'react';
import { mount } from 'enzyme';

import { Picklist, PicklistItem } from '../src/scripts/Picklist';

describe('Picklist', () => {
  it('should render picklist with className', () => {
    const wrapper = mount(<Picklist />);
    expect(wrapper.find('.slds-picklist').length).toEqual(1);
  });

  it('should render with sub-items if defaultOpened is provided', () => {
    const wrapper = mount(
      <Picklist label='Pick List'>
        <PicklistItem value={1}>Item #1</PicklistItem>
        <PicklistItem value={2}>Item #2</PicklistItem>
      </Picklist>
    );
    expect(wrapper.find('.react-slds-menuitem').length).toEqual(0);

    const wrapper2 = mount(
      <Picklist label='Pick List' defaultOpened>
        <PicklistItem value={1}>Item #1</PicklistItem>
        <PicklistItem value={2}>Item #2</PicklistItem>
      </Picklist>
    );
    expect(wrapper2.find('.react-slds-menuitem').length).toEqual(2);
  });

  it('click should open/close sub-items', () => {
    const wrapper = mount(
      <Picklist label='Pick List'>
        <PicklistItem value={1}>Item #1</PicklistItem>
        <PicklistItem value={2}>Item #2</PicklistItem>
      </Picklist>
    );
    expect(wrapper.find('.react-slds-menuitem').length).toEqual(0);
    wrapper.find('.slds-picklist button').simulate('click');
    expect(wrapper.find('.react-slds-menuitem').length).toEqual(2);
  });

  it('click should trigger onValueChange with a single value', () => {
    const store = { value: 2 as any };
    const wrapper = mount(
      <Picklist
        label='Pick List'
        defaultOpened
        value={store.value}
        onValueChange={(v) => {
          store.value = v;
        }}
      >
        <PicklistItem value={1} className='value1'>
          Item #1
        </PicklistItem>
        <PicklistItem value={2} className='value2'>
          Item #2
        </PicklistItem>
      </Picklist>
    );
    wrapper.find('.slds-dropdown__item.value1 a').simulate('click');
    expect(store.value).toEqual(1);
  });

  it('click on multiselect should trigger onValueChange with a array value', () => {
    const store = { value: 2 as any };
    const wrapper = mount(
      <Picklist
        label='Pick List'
        defaultOpened
        multiSelect
        value={store.value}
        onValueChange={(v) => {
          store.value = v;
        }}
      >
        <PicklistItem value={1} className='value1'>
          Item #1
        </PicklistItem>
        <PicklistItem value={2} className='value2'>
          Item #2
        </PicklistItem>
      </Picklist>
    );
    wrapper.find('.slds-dropdown__item.value1 a').simulate('click');
    expect(store.value).toEqual([2, 1]);
  });
});

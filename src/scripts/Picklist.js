import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import uuid from 'uuid';
import FormElement from './FormElement';
import Icon from './Icon';
import Button from './Button';
import { default as DropdownMenu, DropdownMenuItem } from './DropdownMenu';


export default class Picklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: `form-element-${uuid()}`,
      opened: props.defaultOpened,
      value: props.defaultValue,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onValueChange && prevState.value !== this.state.value) {
      this.props.onValueChange(this.state.value, prevState.value);
    }
  }

  onClick() {
    this.setState({ opened: !this.state.opened });
    setTimeout(() => {
      this.focusToTargetItemEl();
    }, 10);
  }

  onPicklistItemClick(item, e) {
    this.setState({ value: item.value });
    if (this.props.onChange) {
      this.props.onChange(e, item.value);
    }
    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
    this.setState({ opened: false });
    if (this.props.onComplete) {
      this.props.onComplete();
    }
    const picklistButtonEl = this.picklistButton;
    if (picklistButtonEl) {
      picklistButtonEl.focus();
    }
    e.preventDefault();
    e.stopPropagation();
  }

  onPicklistClose() {
    const picklistButtonEl = this.picklistButton;
    picklistButtonEl.focus();
    this.setState({ opened: false });
  }

  onBlur() {
    this.setState({ opened: false });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    if (this.props.onComplete) {
      this.props.onComplete();
    }
  }

  onKeydown(e) {
    if (e.keyCode === 40) { // down
      e.preventDefault();
      e.stopPropagation();
      if (!this.state.opened) {
        this.setState({ opened: true });
        setTimeout(() => {
          this.focusToTargetItemEl();
        }, 10);
      } else {
        this.focusToTargetItemEl();
      }
    } else if (e.keyCode === 27) { // ESC
      e.preventDefault();
      e.stopPropagation();
      this.setState({ opened: false });
      if (this.props.onComplete) {
        this.props.onComplete();
      }
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  }

  getSelectedValue() {
    const { defaultValue, value } = this.props;
    return (
      typeof value !== 'undefined' ? value :
      typeof this.state.value !== 'undefined' ? this.state.value :
      defaultValue
    );
  }

  getSelectedItemLabel() {
    const selectedValue = this.getSelectedValue();
    let selected = null;
    React.Children.forEach(this.props.children, (item) => {
      if (item.props.value === selectedValue) {
        selected = item.props.label || item.props.children;
      }
    });
    return (selected || this.props.selectedText);
  }

  isFocusedInComponent() {
    const rootEl = this.node;
    let targetEl = document.activeElement;
    while (targetEl && targetEl !== rootEl) {
      targetEl = targetEl.parentNode;
    }
    return !!targetEl;
  }

  focusToTargetItemEl() {
    const dropdownEl = this.dropdown;
    const firstItemEl =
      dropdownEl.querySelector('.slds-is-selected > .react-slds-menuitem[tabIndex]') ||
      dropdownEl.querySelector('.react-slds-menuitem[tabIndex]');
    if (firstItemEl) {
      firstItemEl.focus();
    }
  }

  renderPicklist(props) {
    const { className, id, ...pprops } = props;
    const picklistClassNames = classnames(className, 'slds-picklist');
    delete pprops.onValueChange;
    return (
      <div className={ picklistClassNames } aria-expanded={ this.state.opened }>
        <Button
          id={ id }
          buttonRef={ node => (this.picklistButton = node) }
          className='slds-picklist__label'
          type='neutral'
          onClick={ this.onClick.bind(this) }
          onKeyDown={ this.onKeydown.bind(this) }
        >
          <span className='slds-truncate'>
            { this.getSelectedItemLabel() || <span>&nbsp;</span> }
          </span>
          <Icon icon='down' />
        </Button>
      </div>
    );
  }

  renderDropdown(menuSize) {
    const { children } = this.props;
    return (
      this.state.opened ?
        <DropdownMenu
          dropdownMenuRef={ node => (this.dropdown = node) }
          size={ menuSize }
          onMenuItemClick={ this.onPicklistItemClick.bind(this) }
          onMenuClose={ this.onPicklistClose.bind(this) }
          onComponentBlur={ this.onBlur.bind(this) }
        >
          { React.Children.map(children, this.renderPicklistItem.bind(this)) }
        </DropdownMenu> :
          <div ref={ node => (this.dropdown = node) } />
    );
  }

  renderPicklistItem(item) {
    const selected = item.props.value === this.getSelectedValue();
    const onBlur = this.onBlur.bind(this);
    return React.cloneElement(item, { selected, onBlur });
  }

  render() {
    const id = this.props.id || this.state.id;
    const { label, required, error, totalCols, cols, menuSize, ...props } = this.props;
    const dropdown = this.renderDropdown(menuSize);
    const formElemProps = { id, label, required, error, totalCols, cols, dropdown };
    return (
      <FormElement formElementRef={ node => (this.node = node) } { ...formElemProps }>
        { this.renderPicklist({ ...props, id }) }
      </FormElement>
    );
  }
}

Picklist.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: FormElement.propTypes.error,
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  defaultValue: PropTypes.string,
  selectedText: PropTypes.string,
  defaultOpened: PropTypes.bool,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onSelect: PropTypes.func,
  onComplete: PropTypes.func,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  menuSize: PropTypes.string,
  children: PropTypes.node,
};


Picklist.isFormElement = true;


export const PicklistItem = ({ label, selected, children, ...props }) => (
  <DropdownMenuItem
    icon={ selected ? 'check' : 'none' }
    role='menuitemradio' // eslint-disable-line
    selected={ selected }
    { ...props }
  >
    { label || children }
  </DropdownMenuItem>
);

PicklistItem.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  selected: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  children: PropTypes.node,
};

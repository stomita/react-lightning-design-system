import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { registerStyle } from './util';
import DropdownButton from './DropdownButton';
import { MenuItem } from './DropdownMenu';

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    const visibleTabs = [];
    const hiddenTabs = [];
    props.children.forEach((tab, index) => {
      if (index < props.maxVisibleTabs) {
        visibleTabs.push(tab);
      } else {
        hiddenTabs.push(tab);
      }
    });
    this.state = {
      visibleTabs,
      hiddenTabs,
    };

    registerStyle('tab-menu', [
      [
        '.slds-tabs__item.react-slds-tab-with-menu',
        '{ position: relative !important; overflow: visible !important; }',
      ],
      [
        '.slds-tabs__item.react-slds-tab-with-menu > .react-slds-tab-item-inner',
        '{ overflow: hidden }',
      ],
      [
        '.slds-tabs__item.react-slds-tab-with-menu > .react-slds-tab-item-inner > a',
        '{ padding-right: 2rem; }',
      ],
      [
        '.react-slds-tab-menu',
        '{ position: absolute; top: 0; right: 0; visibility: hidden }',
      ],
      [
        '.react-slds-tab-menu button',
        '{ height: 3rem; line-height: 3rem; width: 2rem; }',
      ],
      [
        '.slds-tabs__item.slds-active .react-slds-tab-menu',
        '.slds-tabs__item:hover .react-slds-tab-menu',
        '{ visibility: visible }',
      ],
    ]);
  }

  componentDidUpdate() {
    if (this.state.focusTab) {
      const el = ReactDOM.findDOMNode(this.refs.activeTab);
      if (el) {
        el.focus();
      }
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ focusTab: false });
    }
  }

  onTabClick(tabKey) {
    if (this.props.onSelect) {
      this.props.onSelect(tabKey);
    }
    // Uncontrolled
    this.setState({ activeKey: tabKey, focusTab: true });
  }

  onTabKeyDown(tabKey, e) {
    if (e.keyCode === 37 || e.keyCode === 39) { // left/right cursor key
      let idx = 0;
      const tabKeys = [];
      React.Children.forEach(this.props.children, (tab, i) => {
        tabKeys.push(tab.props.eventKey);
        if (tabKey === tab.props.eventKey) {
          idx = i;
        }
      });
      const dir = e.keyCode === 37 ? -1 : 1;
      const activeIdx = (idx + dir + tabKeys.length) % tabKeys.length;
      const activeKey = tabKeys[activeIdx];
      this.onTabClick(activeKey);
      e.preventDefault();
      e.stopPropagation();
    }
  }

  tabsType() {
    return this.props.type === 'scoped' ? 'scoped' : 'default';
  }

  renderController() {
    return (
      <DropdownButton
        type='Simple'
        label={'More'}
        style={{ marginTop: 7 }}
      >
        {
          this.state.hiddenTabs.map((tab) => (
            <MenuItem onClick={() => alert(tab.props.eventKey)}>{tab.props.title}</MenuItem>
          ))
        }
      </DropdownButton>
    );
  }

  renderTabNav() {
    const type = this.tabsType();
    const { children, activeKey, defaultActiveKey, maxVisibleTabs } = this.props;
    const currentActiveKey =
      typeof activeKey !== 'undefined' ? activeKey :
      typeof this.state.activeKey !== 'undefined' ? this.state.activeKey :
      defaultActiveKey;
    const tabNavClassName = `slds-tabs--${type}__nav`;
    return (
      <ul className={ tabNavClassName } role='tablist'>
      {
        this.state.visibleTabs.map((tab, index) => {
          const { title, eventKey, menu, menuIcon } = tab.props;
          let { menuItems } = tab.props;
          menuItems = menu ? menu.props.children : menuItems;
          const menuProps = menu ? menu.props : {};
          const isActive = eventKey === currentActiveKey;
          const tabItemClassName = classnames(
            'slds-tabs__item',
            `slds-tabs--${type}__item`,
            'slds-text-heading---label',
            { 'slds-active': isActive },
            { 'react-slds-tab-with-menu': menu || menuItems }
          );
          const tabLinkClassName = `slds-tabs--${type}__link`;
          return (
            <li className={ tabItemClassName } role='presentation' key={index}>
              <span className='react-slds-tab-item-inner'>
                <a
                  className={ tabLinkClassName }
                  onClick={ this.onTabClick.bind(this, eventKey) }
                  onKeyDown={ this.onTabKeyDown.bind(this, eventKey) }
                  role='tab'
                  ref={ isActive ? 'activeTab' : null }
                  tabIndex={ isActive ? 0 : -1 }
                  aria-selected={ isActive }
                >
                  { title }
                </a>
                { menuItems ? this.renderTabMenu(menuIcon, menuItems, menuProps) : null }
              </span>
            </li>
          );
        })
      }
      {
        maxVisibleTabs < children.length && this.renderController()
      }
      </ul>
    );
  }

  renderTabMenu(menuIcon = 'down', menuItems = [], menuProps = {}) {
    return (
      <DropdownButton
        className='react-slds-tab-menu'
        icon={ menuIcon }
        type='icon-bare'
        iconSize='small'
        nubbinTop
        { ...menuProps }
      >
        { menuItems }
      </DropdownButton>
    );
  }

  renderTabPanel() {
    return (
      this.props.children.slice(0, this.props.maxVisibleTabs).map((tab, index) => {
        const activeKey =
          this.props.activeKey ||
          this.state.activeKey ||
          this.props.defaultActiveKey;

        const { eventKey } = tab.props;
        const isActive = eventKey === activeKey;
        return React.cloneElement(tab, { active: isActive, key: index });
      })
    );
  }

  render() {
    const { className } = this.props;
    const tabsClassNames = classnames(className, `slds-tabs--${this.tabsType()}`);
    return (
      <div className={ tabsClassNames }>
        { this.renderTabNav() }
        { this.renderTabPanel() }
      </div>
    );
  }
}

const TAB_TYPES = ['default', 'scoped'];

Tabs.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(TAB_TYPES),
  defaultActiveKey: PropTypes.any,
  activeKey: PropTypes.any,
  onSelect: PropTypes.func,
  children: PropTypes.node,
  controller: PropTypes.node,
  maxVisibleTabs: PropTypes.number,
};

Tabs.defaultProps = {
  maxVisibleTabs: 10,
};

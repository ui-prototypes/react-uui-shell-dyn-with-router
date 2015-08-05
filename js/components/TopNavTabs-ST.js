var React = require('react');
var Router = require('react-router');  

var SubNavTabs = require('./SubNavTabs-ST');
var Tabs = require('./SimpleTabs');

var navData = require('./NavData.js');

var TopNavTabs;
module.exports = TopNavTabs = React.createClass(
{
    tabsComponent: null,

    mixins: [Router.Navigation],

    tabIndex: 1,

    propTypes: {
        tabIndex: React.PropTypes.number
    },

    getInitialState: function()
    {
        var index = 1;
        var idMap = { };
        var nameMap = { };
        for (var itemIdx in navData.items)
        {
            idMap[navData.items[itemIdx].id] = index;
            nameMap[index] = navData.items[itemIdx].id;
            index++;
        }
        var tabIndex = idMap[this.props.params.tabId]
        return { idMap: idMap, nameMap: nameMap, tabIndex: tabIndex ? tabIndex : 1 };
    },

    componentWillReceiveProps: function(nextProps) {
      var tabIndex = this.state.idMap[nextProps.params.tabId];
      this.setState( { tabIndex: tabIndex ? tabIndex : 0 } );
      if (this.refs.tabsComponent != null) // ST needs this, BS does not
      {
        this.refs.tabsComponent.setState( { tabActive: tabIndex ? tabIndex : 0 } );
      }
    },

    onBeforeChange: function(selectedIndex, $selectedPanel, $selectedTabMenu) {
        //console.log('before the tab ' + selectedIndex);
    },

    onAfterChange: function(selectedIndex, $selectedPanel, $selectedTabMenu) {
        //console.log('after the tab ' + selectedIndex);
        var goHere = '/navs/' + this.state.nameMap[selectedIndex];
    	this.transitionTo(goHere);
    },

    /*componentWillUnmount: function() { ; },*/

        render: function()
        {
            var thisComponent = this;
            var activeTabIndex = this.state.tabIndex;
            this.tabsComponent =
                <Tabs style={{ fontSize: '105%', paddingTop: '5px' }}
                      tabActive={activeTabIndex}
                      onBeforeChange={this.onBeforeChange}
                      onAfterChange={this.onAfterChange}
                      ref='tabsComponent' >
                    {
                        navData.items.reduce(
                            function(prev,child,index)
                            {
                                if (!child.content)
                                {
                                    prev.push(
                                        <Tabs.Panel key={index} title={child.title}>
                                            {child.title} content
                                        </Tabs.Panel>
                                    );
                                }
                                else if (child.content.type == "subtabs")
                                {
                                    if ((index + 1) == thisComponent.state.tabIndex)
                                    {
                                        prev.push(
                                            <Tabs.Panel key={index} title={child.title}>
                                                <SubNavTabs ref={"lowerTab" + index} navData={child.content}
                                                            subTabId={thisComponent.props.params.subTabId}
                                                            menuId={thisComponent.props.params.menuId}
                                                            parentData={child} index={index} />
                                            </Tabs.Panel>
                                        );
                                    }
                                    else
                                    {
                                        prev.push(
                                            <Tabs.Panel key={index} title={child.title}>
                                                <SubNavTabs ref={"lowerTab" + index} navData={child.content}
                                                            parentData={child} index={index} />
                                            </Tabs.Panel>
                                        );
                                    }
                                }
                                else
                                {
                                    var subItems = child.content.items;
                                    prev.push(
                                        <Tabs.Panel key={index} title={child.title}>
                                            Work area content might go here
                                        </Tabs.Panel>
                                    );
                                }
                                return prev;
                            },
                            []
                        )
                    }
                </Tabs>;
            return this.tabsComponent;
        }
});

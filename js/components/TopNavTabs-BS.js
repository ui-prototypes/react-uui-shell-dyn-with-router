var React = require('react');
var Router = require('react-router');  

var SubNavTabs = require('./SubNavTabs-BS');
var RB = require('react-bootstrap');
var TabbedArea = RB.TabbedArea;
var TabPane = RB.TabPane;

var navData = require('./NavData.js');

var TopNavTabs;
module.exports = TopNavTabs = React.createClass(
{
    tabsComponent: null,

    mixins: [Router.Navigation],

    tabIndex: 0,

    propTypes: {
        tabIndex: React.PropTypes.number
    },

    getInitialState: function()
    {
        var index = 0;
        var idMap = { };
        var nameMap = { };
        for (var itemIdx in navData.items)
        {
            idMap[navData.items[itemIdx].id] = index;
            nameMap[index] = navData.items[itemIdx].id;
            index++;
        }
        var tabIndex = idMap[this.props.params.tabId]
        return { idMap: idMap, nameMap: nameMap, tabIndex: tabIndex ? tabIndex : 0 };
    },

    componentWillReceiveProps: function(nextProps) {
        var tabIndex = this.state.idMap[nextProps.params.tabId];
        this.setState( { tabIndex: tabIndex ? tabIndex : 0 } );
    },

    onSelect: function(idx)
    {
        var goHere = '/navs/' + this.state.nameMap[idx];
    	this.transitionTo(goHere);
    },

    /*componentDidMount: function() { ; },*/

    /*componentWillUnmount: function() { ; },*/

        render: function()
        {
            var thisComponent = this;
            var activeTabIndex = this.state.tabIndex;
            this.tabsComponent =
                <TabbedArea style={{ fontSize: '105%', paddingTop: '5px' }}
                            defaultActiveKey={activeTabIndex}
                            activeKey={parseInt(activeTabIndex)}
                            activeTab={activeTabIndex}
                            onSelect={this.onSelect} animation={false}
                            ref='tabsComponent' >
                    {
                        navData.items.reduce(
                            function(prev,child,index)
                            {
                                if (!child.content)
                                {
                                    prev.push(
                                        <TabPane key={index} eventKey={index} tab={child.title}>
                                            {child.title} content
                                        </TabPane>
                                    );
                                }
                                else if (child.content.type == "subtabs")
                                {
                                    if (index == thisComponent.state.tabIndex)
                                    {
                                        prev.push(
                                            <TabPane key={index} eventKey={index} tab={child.title}>
                                                <SubNavTabs ref={"lowerTab" + index} navData={child.content}
                                                            subTabId={thisComponent.props.params.subTabId}
                                                            menuId={thisComponent.props.params.menuId}
                                                            parentData={child} index={index} />
                                            </TabPane>
                                        );
                                    }
                                    else
                                    {
                                        prev.push(
                                            <TabPane key={index} eventKey={index} tab={child.title}>
                                                <SubNavTabs ref={"lowerTab" + index} navData={child.content}
                                                            parentData={child} index={index} />
                                            </TabPane>
                                        );
                                    }
                                }
                                else
                                {
                                    var subItems = child.content.items;
                                    prev.push(
                                        <TabPane key={index} eventKey={index} tab={child.title}>
                                            Work area content might go here
                                        </TabPane>
                                    );
                                }
                                return prev;
                            },
                            []
                        )
                    }
                </TabbedArea>;
            return this.tabsComponent;
        }
});

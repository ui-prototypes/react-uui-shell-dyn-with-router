var React = require('react');
var Router = require('react-router');

var SideMenu = require('./SideMenu');
var Tabs = require('./SimpleTabs');

var SubNavTabs;
module.exports = SubNavTabs = React.createClass(
{
    tabbedArea: null,

    mixins: [Router.Navigation],

    tabIndex: 1,

    propTypes: {
        tabIndex: React.PropTypes.number
    },

    getInitialState: function()
    {
        this.parentTabId = this.props.parentData.id;
        // hack - since navData is not available in getDefaultProps,
        // we must wait until here to set up the hash maps
        var index = 1;
        var idMap = { };
        var nameMap = { };
        for (var itemIdx in this.props.navData.items)
        {
            idMap[this.props.navData.items[itemIdx].id] = index;
            nameMap[index] = this.props.navData.items[itemIdx].id;
            index++;
        }
        // hack
        // if subTabId is for a different upper tab, then it
        // will be undefined and tabIndex will revert to 1
        var tabIndex = idMap[this.props.subTabId];
        console.log('SubTabNavs-ST.getInitialState: parentTabId = ' + this.parentTabId + ', tabIndex = ' + tabIndex);
        // put the maps on state since props seem to act like class-global
        return { idMap: idMap, nameMap: nameMap, tabIndex: tabIndex ? tabIndex : 1 };
    },

    /*activate: function()
    {
        if (this.refs.sideMenu != null)
        {
            this.refs.sideMenu.activate();
        }
    },*/

    componentWillReceiveProps: function(nextProps) {
      var subTabId = nextProps.subTabId ? nextProps.subTabId : this.state.nameMap[0];
      var tabIndex = this.state.idMap[subTabId];
      this.setState( { tabIndex: tabIndex ? tabIndex : 1 } );
      console.log('SubTabNavs-ST.componentWillReceiveProps: parentTabId = ' + this.parentTabId + ', nextProps.subTabId = ' + nextProps.subTabId + ', tabIndex = ' + tabIndex);
      if ((this.refs['lowerTabsComponent' + this.props.index] != null) && (tabIndex !== undefined))
      {
        this.refs['lowerTabsComponent' + this.props.index].setState(
        {
            tabActive: tabIndex ? tabIndex : 1
        } );
      }
    },

    goToMenu: function(idx)
    {
        var goHere = '/navs/' + this.parentTabId + '/' + this.state.nameMap[idx];
        console.log('SubTabNavs-BS.onSelect: parentTabId = ' + this.parentTabId + ', idx = ' + idx + ', goHere = ' + goHere);
    	this.transitionTo(goHere);
    },

    onBeforeChange: function(selectedIndex, $selectedPanel, $selectedTabMenu) {
        //console.log('before the tab ' + selectedIndex);
    },

    onAfterChange: function(selectedIndex, $selectedPanel, $selectedTabMenu) {
        //console.log('after the tab ' + selectedIndex);
        //var goHere = '/navs/' + this.parentTabId + '/' + this.state.nameMap[selectedIndex];
        //console.log('SubTabNavs-ST.onAfterChange: parentTabId = ' + this.parentTabId + ', selectedIndex = ' + selectedIndex + ', goHere = ' + goHere);
    	//this.transitionTo(goHere);
    	this.goToMenu(selectedIndex);
    },

    /*componentWillUnmount: function() { ; },*/

        render: function()
        {
            var thisComponent = this;
            return (
                <Tabs style={{ fontSize: '95%', paddingTop: '5px' }}
                      tabActive={this.state.tabIndex}
                      onBeforeChange={this.onBeforeChange}
                      onAfterChange={this.onAfterChange}
                      ref={'lowerTabsComponent' + this.props.index} >
                    {
                        this.props.navData.items.reduce(
                            function(prev,child,index)
                            {
                                if (!child.content)
                                {
                                    prev.push(
                                        <Tabs.Panel key={index} title={child.title}>
                                            Sub Item {child.title} content
                                        </Tabs.Panel>
                                    );
                                }
                                else if (child.content.type == "subtabs")
                                {
                                    prev.push(
                                        <Tabs.Panel key={index} title={child.title}>
                                            Do you really want more tabs here?
                                        </Tabs.Panel>
                                    );
                                }
                                else
                                {
                                    var subItems = child.content.items;
                                    prev.push(
                                        <Tabs.Panel key={index} title={child.title}>
                                            <div className='side left'>
                                                <SideMenu items={subItems}
                                                          parentTabId={thisComponent.parentTabId}
                                                          subTabId={thisComponent.tabIndex}
                                                          menuId={thisComponent.props.menuId}
                                                          ref="sideMenu" />
                                            </div>
                                            <div className='content'>
                                                <Router.RouteHandler />
                                            </div>
                                            <div className='side right'>
                                                <div className='panel panel-info'>
                                                    <div className='panel-heading'>Demo summary</div>
                                                    <div className='panel-body'>
                                                        <ul>
                                                            <li>Fixed border layout using CSS</li>
                                                            <li>React based accordion menu</li>
                                                            <li>Kendo Grid Table with proper resizing</li>
                                                            <li>JQX Grid Table with proper resizing</li>
                                                            <li>Navigation and page management using React-router</li>
                                                            <li>Full URL mapping for every tab, menu and page using React-router</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </Tabs.Panel>
                                    );
                                }
                                return prev;
                            },
                            []
                        )
                    }
                </Tabs>
            );
        }
});

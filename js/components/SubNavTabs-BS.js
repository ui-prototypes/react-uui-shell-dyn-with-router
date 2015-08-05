var React = require('react');
var Router = require('react-router');  

var SideMenu = require('./SideMenu');
var RB = require('react-bootstrap');
var TabbedArea = RB.TabbedArea;
var TabPane = RB.TabPane;

var SubNavTabs;
module.exports = SubNavTabs = React.createClass(
{
    tabbedArea: null,

    mixins: [Router.Navigation],

    tabIndex: 0,

    propTypes: {
        tabIndex: React.PropTypes.number
    },

    getInitialState: function()
    {
        this.parentTabId = this.props.parentData.id;
        // hack - since navData is not available in getDefaultProps,
        // we must wait until here to set up the hash maps
        var index = 0;
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
        // will be undefined and tabIndex will revert to 0
        var tabIndex = idMap[this.props.subTabId];
        console.log('SubTabNavs-BS.getInitialState: parentTabId = ' + this.parentTabId + ', tabIndex = ' + tabIndex);
        // put the maps on state since props seem to act like class-global
        return { idMap: idMap, nameMap: nameMap, tabIndex: tabIndex ? tabIndex : 0 };
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
      this.setState( { tabIndex: tabIndex ? tabIndex : 0 } );
      console.log('SubTabNavs-BS.componentWillReceiveProps: parentTabId = ' + this.parentTabId + ', nextProps.subTabId = ' + nextProps.subTabId + ', tabIndex = ' + tabIndex);
      if ((this.refs['lowerTabsComponent' + this.props.index] != null) && (tabIndex !== undefined))
      {
        var thisComponent = this;
        this.refs['lowerTabsComponent' + this.props.index].setState(
        {
            tabActive: tabIndex ? tabIndex : 0,
        }, function()
        {
            // TabPane ref looks like this: lowerTabsComponent1-subTab0
            thisComponent.refs['lowerTabsComponent' + thisComponent.props.index + '-subTab' + (tabIndex ? tabIndex : 0)].forceUpdate();
        } );
      }
    },

    goToMenu: function(idx)
    {
        var goHere = '/navs/' + this.parentTabId + '/' + this.state.nameMap[idx];
        console.log('SubTabNavs-BS.onSelect: parentTabId = ' + this.parentTabId + ', idx = ' + idx + ', goHere = ' + goHere);
    	this.transitionTo(goHere);
    },

    onSelect: function(idx)
    {
        //var goHere = '/navs/' + this.parentTabId + '/' + this.state.nameMap[idx];
        //console.log('SubTabNavs-BS.onSelect: parentTabId = ' + this.parentTabId + ', idx = ' + idx + ', goHere = ' + goHere);
    	//this.transitionTo(goHere);
    	this.goToMenu(idx);
    },

    /*componentDidMount: function() { ; },*/

    /*componentWillUnmount: function() { ; },*/

        render: function()
        {
            var thisComponent = this;
            return (
                <TabbedArea style={{ fontSize: '95%', paddingTop: '5px' }}
                            defaultActiveKey={this.state.tabIndex}
                            activeKey={parseInt(this.state.tabIndex)}
                            activeTab={this.state.tabIndex}
                            onSelect={this.onSelect} animation={false}
                            ref={'lowerTabsComponent' + this.props.index} >
                    {
                        this.props.navData.items.reduce(
                            function(prev,child,index)
                            {
                                var subTabRef = 'lowerTabsComponent' +
                                    thisComponent.props.index +
                                    '-subTab' + index;
                                if (!child.content)
                                {
                                    prev.push(
                                        <TabPane key={index} eventKey={index} tab={child.title} ref={subTabRef}>Sub Item {child.title} content</TabPane>
                                    );
                                }
                                else if (child.content.type == "subtabs")
                                {
                                    prev.push(
                                        <TabPane key={index} eventKey={index} tab={child.title} ref={subTabRef}>Do you really want more tabs here?</TabPane>
                                    );
                                }
                                else
                                {
                                    if (index == thisComponent.state.tabIndex)
                                    {
                                        var subItems = child.content.items;
                                        prev.push(
                                            <TabPane key={index} eventKey={index} tab={child.title} ref={subTabRef}>
                                                <div className='side left'>
                                                    <SideMenu items={subItems}
                                                              parentTabId={thisComponent.parentTabId}
                                                              subTabId={child.id}
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
                                            </TabPane>
                                        );
                                    }
                                    else
                                    {
                                        prev.push(
                                            <TabPane key={index} eventKey={index} tab={child.title} ref={subTabRef} />
                                        );
                                    }
                                }
                                return prev;
                            },
                            []
                        )
                    }
                </TabbedArea>
            );
        }
});

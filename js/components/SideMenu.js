var React = require('react');
var Router = require('react-router');  

var Accordion = require('./AccordionMenu');

module.exports = React.createClass(
{
    displayName: 'SideMenu',

    /*activate: function()
    {
	if (this.refs.accordionMenu != null)
	{
            var accordionMenu = this.refs.accordionMenu.getDOMNode();
            $(accordionMenu).css("height", "98%");
            $(accordionMenu).css("height", "100%");
	    this.refs.accordionMenu.activate();
	}
    },*/

    render: function()
    {
        var thisComponent = this;
        return (<Accordion.Menu parentTabId={this.props.parentTabId}
                                subTabId={this.props.subTabId}
                                menuId={this.props.menuId}
                                items={this.props.items}
                                ref="accordionMenu">
        {
            this.props.items.reduce(
                function(prev,child,index)
                {
                    if (!child.content)
                    {
                        prev.push(<Accordion.Section key={index} title={child.title}><ul></ul></Accordion.Section>);
                        return prev;
                    }
                    var section = <Accordion.Section key={index} title={child.title}
                                                     parentTabId={thisComponent.props.parentTabId}
                                                     subTabId={thisComponent.props.subTabId}
                                                     menuId={thisComponent.props.menuId}><ul>
                    {
                        child.content.items.reduce(
                            function(subPrev,subChild,subIndex)
                            {
                                if (!subChild.content)
                                {
                                    subPrev.push(<li key={subIndex}>{subChild.title}</li>);
                                }
                                else
                                {
                                    { /* TODO: check if content is a string, and if not, do something else */ }
                                    subPrev.push(
                                        <li key={subIndex}>
                                            <Router.Link to={'/navs/' + thisComponent.props.parentTabId + 
                                                             '/' + thisComponent.props.subTabId +
                                                             '/' + thisComponent.props.menuId +
                                                             '/' + subChild.content}>
                                                {subChild.title}
                                            </Router.Link>
                                        </li>);
                                }
                                return subPrev;
                            },
                            []
                        )
                    }
                    </ul></Accordion.Section>;
                    prev.push(section);
                    return prev;
                },
                []
            )
        }
        </Accordion.Menu>);
    }
});

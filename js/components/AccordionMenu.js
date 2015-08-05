var React = require('react');
var Router = require('react-router');  

module.exports =
{
    Menu: React.createClass(
    {

        mixins: [Router.Navigation],

        getInitialState: function()
        {
            // hack - since items not available in getDefaultProps,
            // we must wait until here to set up the hash maps
            var index = 0;
            var idMap = { };
            var nameMap = { };
            for (var itemIdx in this.props.items)
            {
                idMap[this.props.items[itemIdx].id] = index;
                nameMap[index] = this.props.items[itemIdx].id;
                index++;
            }
            // hack
            var openIndex = idMap[this.props.menuId] ? idMap[this.props.menuId] : 0;
            return { idMap: idMap, nameMap: nameMap, openIndex: openIndex, openHeight: 0 };
        },

        /*activate: function()
        {
            this.forceUpdate();
            setTimeout(this.postFixHeight, 1);
        },*/

        postFixHeight: function()
        {
            // store a this ref, and
            var _this = this;
            // wait for a paint to do browser dom stuff
            window.requestAnimationFrame(function()
            {
                var node = _this.getDOMNode();
                if (node !== undefined)
                {
                    //setTimeout(_this.refreshLayout(), 100);
                    _this.refreshLayout();
                }
            });
        },

        componentDidMount: function()
        {
            this.resizeHandler = () => this.onResize();
            window.addEventListener('resize',this.resizeHandler,false);
            this.onResize();
            this.postFixHeight();
        },

        componentDidUpdate: function()
        {
            this.postFixHeight();
        },

        componentWillUnmount: function() { window.removeEventListener(this.resizeHandler,false); },

        onResize: function() { this.refreshLayout(); },

        refreshLayout: function()
        {
            if (this.refs.container === undefined) { return; }
            var container = this.refs.container.getDOMNode();
            var containerHeight = container.offsetHeight;
            //console.log("**** containerHeight = " + containerHeight);

            var headingHeights = Array.prototype.slice.call(container.children).reduce((prev,child)=>
            {
                return child.className.indexOf('accordion-title') === 0 ? (prev + child.offsetHeight) : prev;
            },0);

            // subtract the heights of all headings from the menu's container
            // will give us the height to use for the list content area
            var openHeight = containerHeight - headingHeights;
            openHeight = openHeight < 0 ? 0 : openHeight;
            if (this.state.openHeight !== openHeight) { this.setState( { openHeight: openHeight } ); }
        },

        onClickMenu: function(idx)
        {
            //if (this.state.openIndex !== idx) { this.setState( { openIndex: idx } ); }
            var goHere = '/navs/' + this.props.parentTabId + '/' + this.props.subTabId + '/' + this.state.nameMap[idx];
            console.log('AccordionMenu.Menu.onClickMenu: parentTabId = ' + this.props.parentTabId + 
                        ', subTabId = ' +this.props.subTabId + ', idx = ' + idx + ', goHere = ' + goHere);
            this.transitionTo(goHere);
        },

        render: function()
        {
            return (<div ref='container' className='accordion-menu'>
                {this.props.children.reduce((prev,child,index) =>
                {
                    // child.props.menuId has the requested menu id
                    //var selected = index === this.state.openIndex;
                    var selected = (this.state.nameMap[index] == this.props.menuId);
                    prev.push(
                        <div
                            className={'accordion-title'+(selected?' accordion-selected':'')}
                            key={'title'+index}
                            onClick={this.onClickMenu.bind(this,index)}>
                            <p><i className={'fa fa-caret-'+(selected?'down':'right')}></i>{child.props.title}</p>
                        </div>
                    );
                    prev.push(
                        <div
                            key={'body'+index}
                            style={{height:selected ? (this.state.openHeight+'px') : '0'}}
                            className={'accordion-section'+(selected?' accordion-selected':'')}>
                            {child}
                        </div>
                    );
                    return prev;
                },[])}
            </div>);
        }
    }),
    Section: React.createClass(
    {
        render: function()
        {
            return this.props.children.length ? (<div>{this.props.children.map((child) => child)}</div>) : this.props.children;
        }
    })
};

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var LoginHandler = require('./components/Login');
var TopNavTabsHandler = require('./components/TopNavTabs-BS');
var ContentHandler = require('./components/ContentArea');

var navData = require('./components/NavData.js');

let App = React.createClass({  

  displayName: 'ReactAppWithRouter',

  /*componentDidMount: function()
  {
      this.resizeHandler = () => this.onResize();
      window.addEventListener('resize',this.resizeHandler,false);
      this.onResize();
  },

  componentWillUnmount: function() { window.removeEventListener(this.resizeHandler,false); },

  onResize: function()
  {
      // get content child and resize it to fill the center area
      var container = this.getDOMNode();
      var contentWrapper = $(container).find('div.content');
      if (contentWrapper.length > 0)
      {
          var contentWrapperHeight = contentWrapper[0].clientHeight;
          if (contentWrapper.length > 0)
          {
              var content = contentWrapper[0].children[0];
              content.height = contentWrapperHeight; // not working
          }
      }
    },*/

  render() {
    return (
      <div className='wrapper'>
        <div className='top-and-center header'>
            <h1><span className='logo'>Brocade</span> 
            <small>Welcome to the UUI Shell - React edition</small></h1>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="app">Home</Link>&nbsp;&nbsp;&nbsp;
            <Link to="navs">Nav Tabs</Link>&nbsp;&nbsp;&nbsp;
            {
                navData.items.reduce(
                    function(prev,child,index)
                    {
                        prev.push(
                            <span key={index}>
                                <Link to="nav" params={{tabId: child.id}}>
                                    {child.title}
                                </Link>&nbsp;&nbsp;&nbsp;
                            </span>
                        );
                        return prev;
                    },
                    []
                )
            }
            <Link to="navSub" params={{tabId: 'configTopTab', subTabId: 'configSubTab2-network'}}>Config->Network</Link>&nbsp;&nbsp;&nbsp;
            <Link to="navMenu" params={{tabId: 'configTopTab', subTabId: 'configSubTab3-traffic', menuId: 'policies'}}>Config->Traffic->Policies</Link>&nbsp;&nbsp;&nbsp;
            <Link to="login">Login</Link>
            { /* class name 'upper-tabs-container' is not used anywhere at this time */ }
            <div className='upper-tabs-container' style={{ position: 'absolute', top: '64px', left: '10px', right: '10px', bottom: '44px' }} >
                {/* this is the important part */}
                <RouteHandler/>
            </div>
        </div>
        <div className='bottom footer'>
            <p>Copyright &copy; 2015 Brocade Communication systems.</p>
        </div>
      </div>
    );
  }
});

let routes = (  
  <Route name="app" path="/" handler={App}>
    <Route name="navs" path="/navs" handler={TopNavTabsHandler}/>
    <Route name="nav" path="/navs/:tabId" handler={TopNavTabsHandler}/>
    <Route name="navSub" path="/navs/:tabId/:subTabId" handler={TopNavTabsHandler}/>
    <Route name="navMenu" path="/navs/:tabId/:subTabId/:menuId" handler={TopNavTabsHandler}>
       <Route name="navMenuItem" path=":contentName" handler={ContentHandler}/>
    </Route>
    <Route name="login" path="/login" handler={LoginHandler}/>
  </Route>
);

/*function onRoute(r) {
    console.log('navData item 2 is ' + navData.items[2].id);
}*/

// passing in navData seems to not work
Router.run(routes, function (Handler) {
  //onRoute("onRoute called");
  React.render(<Handler navData={navData}/>, document.body);
});

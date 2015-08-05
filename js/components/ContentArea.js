var React = require('react');
//var Router = require('react-router');  

module.exports = React.createClass(
{
    displayName: 'ContentArea',

    contentName: null,

    propTypes: {
        contentName: React.PropTypes.string
    },

    getInitialState: function()
    {
        var contentName = this.props.params.contentName ? this.props.params.contentName : "";
        return { contentName: contentName };
    },

    componentWillReceiveProps: function(nextProps) {
      console.log('ContentArea.componentWillReceiveProps: nextProps.params.contentName = ' + nextProps.params.contentName);
      if (nextProps.params.contentName)
      {
          this.setState( { contentName: nextProps.params.contentName } );
      }
    },

    render: function()
    {
        try
        {
            var WorkAreaContent = require('./content/' + this.state.contentName);
            return (<div ref="contentArea"><WorkAreaContent /></div>);
        }
        catch (error)
        {
            return (<div ref="contentArea">No such content: {this.state.contentName}</div>);
        }
    }
});

var React = require('react');

module.exports = React.createClass({
    displayName: 'Form',
    render: function() {
        return (
            <div className='grid-wrapper'>
                <div className='content-header'>
                    <div className='pull-left'>
                        <h4>Generic Form example</h4>
                    </div>
                </div>
                <div className='grid-container'>
                </div>
            </div>
        );
    }
});

var React = require('react');

var Kendo = {};

Kendo.RadialGauge = React.createClass({

    getDefaultProps: function() {
        return {
            theme: "silver",
            minorUnit: 5,
            startAngle: -30,
            endAngle: 210,
            max: 180
        }
    },

    componentDidMount: function() {
        var props = this.props;
        $(this.getDOMNode()).kendoRadialGauge({
            theme: props.theme,
            pointer: {
                value: props.value
            },    
            scale: {
                minorUnit: props.minorUnit,
                startAngle: props.startAngle,
                endAngle: props.endAngle,
                max: props.max
            }
        });
    },
    
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.value !== this.props.value) {
            $(this.getDOMNode()).data("kendoRadialGauge").value(nextProps.value);            
        }
    },

    render: function() {
        return <div className="gauge" />;
    }
});

Kendo.Slider = React.createClass({

    getDefaultProps: function() {
        return {
            min: 0,
            max: 180,
            showButtons: false
        }
    },

    componentDidMount: function() {
        var props = this.props;
        $(this.getDOMNode()).kendoSlider({
            min: props.min,
            max: props.max,
            showButtons: props.showButtons,
            value: this.props.value,
            change: this.handleChange
        });
    },
    
    componentWillUnmount: function() {
        $(this.getDOMNode()).data("kendoSlider").destroy();
    },
    
    handleChange: function(e) {
        this.props.changeSpeed(e.value);
    },

    render: function() {
        return <div />
    }
});

var UnitOfMeasure = React.createClass({

    handleChange: function(e) {
        this.props.changeUnits($(this.getDOMNode()).val());
        //this.publish("change.uom", { uom: $(this.getDOMNode()).val() });
    },
    
    render: function() {
        return <select className="uom-select" onChange={this.handleChange}>
            <option>MPH</option>
            <option>KPH</option>
        </select>;
    }
});

var SpeedDisplay = React.createClass({    
    render: function() {
        return <div className="speed-display">{ this.props.speed + " " + this.props.uom }</div>;
    }
});

module.exports = React.createClass({
    
    getInitialState: function() {
        return {
            speed: 88,
            uom:"MPH"
        }
    },

    changeSpeed: function( value ) {
        this.setState( { speed: value, uom: this.state.uom } );
    },
    
	changeUnits: function( value ) {
		this.setState( { speed: this.state.speed, uom: value } );
	},

    componentWillMount: function() {
        //
    },
    
    componentWillUnmount: function() {
        //
    },

    render: function() {
        return <div>
            <div className="container">
                <Kendo.RadialGauge value={this.state.speed} />
                <Kendo.Slider value={this.state.speed} changeSpeed={this.changeSpeed} />
                <UnitOfMeasure changeUnits={this.changeUnits} />
            </div>
            <SpeedDisplay speed={this.state.speed} uom={this.state.uom} />
        </div>;
    }
});

var React = require('react');

var Grid = React.createClass(
{

        onSelectTable: function(selectedDataItems)
        {
            var msg = "Table select";
            for (var i = 0; i < selectedDataItems.length; i++)
            {
                var dataItem = selectedDataItems[i];
                var rowIndex = dataItem.rowIndex;
                var rowData = dataItem.rowData;
                msg += " - row " + rowIndex + " - row data: " + rowData.ContactName;
            }
            alert(msg);
        },

    componentDidMount: function()
    {
        var props = this.props;
        var kgrid = this;
        var domNode = this.getDOMNode();
        $(domNode).kendoGrid(
        {
            dataSource:
            {
                type: "odata",
                transport: { read: this.props.config.url },
                pageSize: 20
            },
            width: '100%',
            height: '100%',
            groupable: true,
            sortable: true,
            selectable: "multiple, row", // or true/false
            pageable:
            {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            columns: this.props.config.columns,
            change: function(e)
            {
                var selectedRows = this.select();
                var selectedDataItems = [];
                for (var i = 0; i < selectedRows.length; i++)
                {
                    var dataItem =
                    {
                        rowIndex: selectedRows[i].rowIndex,
                        rowData: this.dataItem(selectedRows[i])
                    };
                    selectedDataItems.push(dataItem);
                }
                kgrid.onSelectTable(selectedDataItems);
            }
        });
        $(domNode).resize(function(e)
        {
            //alert("Resize Grid to " + e.target.clientWidth + "x" + e.target.clientHeight);
            var kg = $(domNode).data("kendoGrid");
            if (kg)
            {
                $(domNode).data("kendoGrid").resize();
            }
        });
    },
    
    componentWillUnmount: function() { $(this.getDOMNode()).data("kendoGrid").destroy(); },
    
    render: function() { return <div style={{ width: '100%', height: '100%' }} /> }
});

module.exports = React.createClass(
{

    displayName: 'Kendo Grid Panel',

    getInitialState: function()
    {
        // not really stateful stuff, this should go into props
        var columns =
        [
                { field: "ContactName", title: "Contact Name", width: 200 },
                { field: "ContactTitle", title: "Contact Title" },
                { field: "CompanyName", title: "Company Name" },
                { field: "Country", width: 150 }
        ];

        return {
                columns: columns,
                url: 'http://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers'
        };
    },

    render: function()
    {
        return (
            <div className='grid-wrapper'>
                <div className='content-header' style={{ height: '32px' }} >
                    <div className='pull-left'>
                        <h4>Kendo Grid example</h4>
                    </div>
                    <div className='pull-right'>
                        <button className='btn btn-xs'>Add</button>
                        <button className='btn btn-xs'>Delete</button>
                        <a><i className='fa fa-refresh'></i></a>
                    </div>
                </div>
                <div className='grid-container' style={{ position: 'absolute', bottom: '8px', top: '32px', left: '5px', right: '8px' }} >
                    <Grid config={this.state} />
                </div>
            </div>
        );
    }
});

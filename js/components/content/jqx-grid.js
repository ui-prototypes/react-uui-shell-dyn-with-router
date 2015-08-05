var React = require('react');

var JqxGrid = React.createClass(
{

    onSelectTable: function(selectedDataItems)
    {
        var msg = "Table select";
        for (var i = 0; i < selectedDataItems.length; i++)
        {
            var dataItem = selectedDataItems[i];
            var rowIndex = dataItem.rowIndex;
            var rowData = dataItem.rowData;
            msg += " - row " + rowIndex + " - row data: " + rowData.FirstName + " " + rowData.LastName;
        }
        alert(msg);
    },

    componentDidMount: function()
    {
        var props = this.props;
        var jqxgrid = this;
        var domNode = this.getDOMNode();
        $(domNode).jqxTreeGrid(
        {
            width: '100%',
            height: '100%',
            source: this.props.config.dataAdapter,
            pageable: true,
            columnsResize: true,
            columns: this.props.config.columns
        });
        $(domNode).on('rowSelect', function(event)
        {
            // event arguments
            //var args = event.args;
            // row data
            //var rowData = args.row;
            // row key
            //var rowKey = args.key;
            var selectedRows = $(domNode).jqxTreeGrid('getSelection');
            var selectedDataItems = [];
            for (var i = 0; i < selectedRows.length; i++)
            {
                // get a selected row
                var selectedRow = selectedRows[i];
                var dataItem =
                {
                    rowIndex: selectedRow[jqxgrid.props.config.source.hierarchy.keyDataField.name],
                    rowData: selectedRow
                };
                selectedDataItems.push(dataItem);
            }
            jqxgrid.onSelectTable(selectedDataItems);
        });
    },
    
    componentWillUnmount: function() { $(this.getDOMNode()).jqxTreeGrid("destroy"); },
    
    render: function() { return <div style={{ width: '100%', height: '100%' }} /> }
});

module.exports = React.createClass(
{

    displayName: 'JQX Grid Panel',

    getInitialState: function()
    {

        // not really stateful stuff, this should go into props
        // prepare the data
        var fields =
        [
            { name: 'EmployeeKey', type: 'number' },
            { name: 'ParentEmployeeKey', type: 'number' },
            { name: 'FirstName', type: 'string' },
            { name: 'LastName', type: 'string' },
            { name: 'Title', type: 'string' },
            { name: 'HireDate', type: 'date' },
            { name: 'BirthDate', type: 'date' },
            { name: 'Phone', type: 'string' },
            { name: 'Gender', type: 'string' },
            { name: 'DepartmentName', type: 'string' }
        ];
        // eventually encapsulate this in a subclass constructor
        // to hide complexity and make the code here simpler
        var columns =
        [
            { text: 'FirstName', dataField: 'FirstName', minWidth: 100, width: 200 },
            { text: 'LastName',  dataField: 'LastName', width: 200 },
            { text: 'Department Name', dataField: 'DepartmentName', width: 150 },
            { text: 'Title', dataField: 'Title', width: 300 },
            { text: 'Birth Date', dataField: 'BirthDate', cellsFormat: 'd', width: 120 },
            { text: 'Hire Date', dataField: 'HireDate', cellsFormat: 'd', width: 120 },
            { text: 'Phone', dataField: 'Phone', cellsFormat: 'd', width: 120 }
        ];
        var source =
        {
            dataType: "csv", // abstract this later
            dataFields: fields,
            hierarchy:
            {
                keyDataField: { name: 'EmployeeKey'  },
                parentDataField: { name: 'ParentEmployeeKey' }
            },
            id: 'EmployeeKey',
            url: 'sampledata/employeesadv.csv'
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        return {
            fields: fields,
            columns: columns,
            source: source,
            dataAdapter: dataAdapter
        };
    },

    render: function()
    {
        return (
            <div className='grid-wrapper'>
                <div className='content-header' style={{ height: '32px' }} >
                    <div className='pull-left'>
                        <h4>JQX Grid example</h4>
                    </div>
                    <div className='pull-right'>
                        <button className='btn btn-xs'>Add</button>
                        <button className='btn btn-xs'>Delete</button>
                        <a><i className='fa fa-refresh'></i></a>
                    </div>
                </div>
                <div className='grid-container' style={{ position: 'absolute', bottom: '8px', top: '32px', left: '5px', right: '8px' }} >
                    <JqxGrid config={this.state} />
                </div>
            </div>
        );
    }
});

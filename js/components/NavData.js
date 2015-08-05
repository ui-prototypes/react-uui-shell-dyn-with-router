module.exports =
    {
	items:
	[
	    {
		id: "dashboardTopTab",
		title: "Dashboard",
		content:
		{
		    type: "subtabs",
		    items:
		    [
			{
			    id: "dashboardContent1",
			    title: "Dashboard 1"
			},
			{
			    id: "dashboardContent2",
			    title: "Dashboard 2"
			},
			{
			    id: "dashboardContent3",
			    title: "Dashboard 3"
			}
		    ]
		}
	    },
	    {
		id: "configTopTab",
		title: "Configuration",
		content:
		{
		    type: "subtabs",
		    items:
		    [
			{
			    id: "configSubTab1-system",
			    title: "System",
			    content:
			    {
				type: "accordion",
				items:
				[
				    {
				        id: "myServices",
					title: "My Services",
					content:
					{
					    items:
					    [
						{ title: "Generic Grid", content: "grid" },
						{ title: "Kendo Grid", content: "kendo-grid" },
						{ title: "Kendo Dial", content: "kendo-dial" },
						{ title: "My JQX Grid", content: "jqx-grid" },
						{ title: "Generic Form", content: "form" },
						{ title: "Function 1" },
						{ title: "Function 2" },
						{ title: "Function 3" },
						{ title: "Function 4" },
						{ title: "Function 5" },
						{ title: "Function 6" },
						{ title: "Function 7" },
						{ title: "Function 8" },
						{ title: "Function 9" },
						{ title: "Function 10" },
						{ title: "Function 11" },
						{ title: "Function 12" },
						{ title: "Function 13" },
						{ title: "Function 14" },
						{ title: "Function 15" },
						{ title: "Function 16" },
						{ title: "Function 17" },
						{ title: "Function 18" },
						{ title: "Function 19" },
						{ title: "Function 20" }
					    ]
					}
				    },
				    {
				        id: "resources",
					title: "Resources",
					content:
					{
					    items:
					    [
						{ title: "Generic Grid" },
						{ title: "Generic Form" },
						{ title: "Function 1" }
					    ]
					}
				    },
				    {
				        id: "emptiness",
					title: "Emptiness"
				    },
				    {
				        id: "organization",
					title: "Organization",
					content:
					{
					    items:
					    [
						{ title: "Generic Grid" },
						{ title: "Generic Form" },
						{ title: "Function 1" }
					    ]
					}
				    }
				]
			    }
			},
			{
			    id: "configSubTab2-network",
			    title: "Network",
			    content:
			    {
				type: "accordion",
				items:
				[
				    {
				        id: "netServices",
					title: "Net Services",
					content:
					{
					    items:
					    [
						{ title: "My JQX Grid", content: "jqx-grid" },
						{ title: "Generic Form", content: "form" },
						{ title: "Kendo Dial", content: "kendo-dial" },
						{ title: "Function 1" },
						{ title: "Function 2" },
						{ title: "Function 3" },
						{ title: "Function 4" },
						{ title: "Function 5" },
						{ title: "Function 6" },
						{ title: "Function 7" }
					    ]
					}
				    },
				    {
				        id: "netResources",
					title: "Net Resources",
					content:
					{
					    items:
					    [
						{ title: "Generic Grid" },
						{ title: "Generic Form" },
						{ title: "Function 1" },
						{ title: "Function 2" },
						{ title: "Function 3" },
						{ title: "Function 4" }
					    ]
					}
				    }
				]
			    }
			},
			{
			    id: "configSubTab3-traffic",
			    title: "Traffic",
			    content:
			    {
				type: "accordion",
				items:
				[
				    {
				        id: "servers",
					title: "Servers",
					content:
					{
					    items:
					    [
						{ title: "My JQX Grid", content: "jqx-grid" },
						{ title: "Function 1" },
						{ title: "Function 2" },
					    ]
					}
				    },
				    {
				        id: "policies",
					title: "Policies",
					content:
					{
					    items:
					    [
						{ title: "Generic Grid" },
						{ title: "Generic Form" },
						{ title: "Function 1" }
					    ]
					}
				    }
				]
			    }
			},
			{
			    id: "configSubTab4-security",
			    title: "Security"
			}
		    ]
		}
	    },
	    {
		id: "monitoringTopTab",
		title: "Monitoring",
		content:
		{
		    type: "subtabs",
		    items:
		    [
			{
			    id: "monitoringSubTab1",
			    title: "Monitoring 1"
			},
			{
			    id: "monitoringSubTab2",
			    title: "Monitoring 2"
			},
			{
			    id: "monitoringSubTab3",
			    title: "Monitoring 3"
			},
			{
			    id: "monitoringSubTab4",
			    title: "Monitoring 4"
			}
		    ]
		}
	    },
	    {
		id: "toolTopTab",
		title: "Tools",
		content:
		{
		    type: "subtabs",
		    items:
		    [
			{
			    id: "toolSubTabA",
			    title: "Tools A"
			},
			{
			    id: "toolSubTabB",
			    title: "Tools B"
			},
			{
			    id: "toolSubTabC",
			    title: "Tools C"
			}
		    ]
		}
	    }
	]
    };

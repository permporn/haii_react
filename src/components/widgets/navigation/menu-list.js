export const MENU_LIST =
    [{
        header: 'Monitoring',
        id: 1,
        type: 'MONITORING',
        iconClassName: 'ti-eye pad-right',
        children: [
            {
                name: 'GsMap',
                layer: 'GSMAP',
                link: '/'
            },
            {
                name: 'SST',
                layer: 'SST',
                id: 2,
                link: '/'
            },
            {
                name: 'Rainfall',
                layer: 'RAINFALL',
                id: 2,
                link: '/',
                showContextualMenu : true
            },
            {
                name: 'Water level',
                layer: 'WATERLEVEL',
                id: 2,
                link: '/',
                showContextualMenu : true
            }
        ]
    },
    {
        header: 'Forecast analytics',
        type: 'FORECAST',
        id: 2,
        iconClassName: 'ti-cloud pad-right',
        showContextualMenu : true,
        layer: 'FORECAST_LAYER'
    },
    {
        header: 'Simulation',
        id: 3,
        type: 'SIMULATION',
        iconClassName: 'ti-location-pin pad-right',
        children: [
            {
                name: 'Saved scenario 1',
                layer: 'NULL',
                showContextualMenu : true
            },
            {
                name: 'Saved scenario 2',
                layer: 'NULL',
                showContextualMenu : true
            }
        ]
    }

    ]


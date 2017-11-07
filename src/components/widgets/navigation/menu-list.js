export const MENU_LIST =
    [{
        header: 'Monitoring',
        id: 1,
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
                link: '/'
            },
            {
                name: 'Water level',
                layer: 'WATERLEVEL',
                id: 2,
                link: '/'
            }
        ]
    },
    {
        header: 'Forecast analytics',
        id: 2,
        iconClassName: 'ti-cloud pad-right',
        children: [
            {
                name: 'GSMAP match',
                layer: 'GSMAPMATCH'
            },
            {
                name: 'SST match',
                layer: 'SSTMATCH',
            },
            {
                name: 'Combined match',
                layer: 'COMBINEDMATCH',
            }
        ]
    }

    ]


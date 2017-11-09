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
                name: '80.0%  2014-10-07',
                layer: 'GSMAPMATCH'
            },
            {
                name: '70.0%  2015-11-11',
                layer: 'SSTMATCH',
            },
            {
                name: '60.0%  2012-09-01',
                layer: 'COMBINEDMATCH',
            },
            {
                name: '50.0%  2012-09-02',
                layer: 'COMBINEDMATCH2',
            }
        ]
    }

    ]


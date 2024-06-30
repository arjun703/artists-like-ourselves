const beepLevels = [
    {"id": 1, "label": "Level 1, 8.5 km/hr, 7 stages"},
    {"id": 2, "label": "Level 2, 9.0 km/hr, 8 stages"},
    {"id": 3, "label": "Level 3, 9.5 km/hr, 8 stages"},
    {"id": 4, "label": "Level 4, 10.0 km/hr, 9 stages"},
    {"id": 5, "label": "Level 5, 10.5 km/hr, 9 stages"},
    {"id": 6, "label": "Level 6, 11.0 km/hr, 10 stages"},
    {"id": 7, "label": "Level 7, 11.5 km/hr, 10 stages"},
    {"id": 8, "label": "Level 8, 12.0 km/hr, 11 stages"},
    {"id": 9, "label": "Level 9, 12.5 km/hr, 11 stages"},
    {"id": 10, "label": "Level 10, 13.0 km/hr, 11 stages"},
    {"id": 11, "label": "Level 11, 13.5 km/hr, 12 stages"},
    {"id": 12, "label": "Level 12, 14.0 km/hr, 12 stages"},
    {"id": 13, "label": "Level 13, 14.5 km/hr, 13 stages"},
    {"id": 14, "label": "Level 14, 15.0 km/hr, 13 stages"},
    {"id": 15, "label": "Level 15, 15.5 km/hr, 13 stages"},
    {"id": 16, "label": "Level 16, 16.0 km/hr, 14 stages"},
    {"id": 17, "label": "Level 17, 16.5 km/hr, 14 stages"},
    {"id": 18, "label": "Level 18, 17.0 km/hr, 15 stages"},
    {"id": 19, "label": "Level 19, 17.5 km/hr, 15 stages"},
    {"id": 20, "label": "Level 20, 18.0 km/hr, 16 stages"},
    {"id": 21, "label": "Level 21, 18.5 km/hr, 16 stages"}
]

export default{
    sports: [
        {
            label: 'Soccor',
            id: 'soccor'
        },
        {
            label: 'Field Hockey',
            id: 'field_hockey'
        }
    ],
    sports_settings: [
        {
            label: "Soccor",
            id: "soccor",
            settings: [
                {
                    label: 'Primary Position',
                    id: 'primary_position',
                    type: 'select',
                    value: '',
                    options: [
                        {
                            label: 'Attacking Midfielder',
                            id: 'attacking-midfielder'
                        },
                        {
                            label: 'Center Back',
                            id: 'center-back'
                        },
                        {
                            label: 'Defensive Midfielder',
                            id: 'defensive-midfielder'
                        },
                        {
                            label: 'Forward',
                            id: 'forward'
                        },
                        {
                            label: 'Goalkeeper',
                            id: 'goalkeeper'
                        },
                        {
                            label: 'Outside Back',
                            id: 'outside-back'
                        },
                        {
                            label: 'Outside Midfielder',
                            id: 'outside-midfielder'
                        }
                    ]
                },{
                    label: 'Dominant Foot',
                    id: 'dominant-foot',
                    value: '',
                    type: 'select',
                    options: [
                        {
                            label: 'Right',
                            id: 'right'
                        },
                        {
                            label: 'Left',
                            id: 'left'
                        },
                        {
                            label: 'Switch',
                            id: 'switch'
                        }
                    ]
                },
                {
                    label: 'Mile Time',
                    id: 'mile_time',
                    type: 'text',
                    valueL: '',
                    placeholder: 'e.g., 5 minutes 10 seconds'
                },
                {
                    label: '2 Mile Time',
                    id: '2_mile_time',
                    value: '',
                    type: 'text',
                    placeholder: 'e.g., 11 minutes 33 seconds'
                },
                {
                    label: 'Weight in kg',
                    id: 'weight',
                    value: '',
                    placeholder: '',
                    type: 'number'
                },{
                    label: 'Height in cm',
                    id: 'height',
                    value: '',
                    placeholder: '',
                    type: 'number'
                },
                {
                    label: 'Beep Level',
                    id: 'beep_level',
                    type: 'select',
                    value: '',
                    options: beepLevels
                }
            ]
        },
        {
            label: 'Field Hockey',
            id: 'field_hockey',
            settings: [
                {
                    label: 'Primary Position',
                    id: 'primary_position',
                    type: 'select',
                    value: '',
                    options: [
                        {
                            label: 'Defender',
                            id: 'defender'
                        },
                        {
                            label: 'Forwarder',
                            id: 'forwarder'
                        },
                        {
                            label: 'Goalkeeper',
                            id: 'goalkeeper'
                        },
                        {
                            label: 'Midfielder',
                            id: 'midfielder'
                        }
                    ]
                },
                {
                    label: 'Mile Time',
                    id: 'mile_time',
                    type: 'text',
                    placeholder: 'e.g., 5 minutes 10 seconds'
                },
                {
                    label: '2 Mile Time',
                    id: '2_mile_time',
                    value: '',
                    type: 'text',
                    placeholder: 'e.g., 11 minutes 33 seconds'
                },
                {
                    label: '40 Yard Dash',
                    id: '40_yard_dash',
                    value: '',
                    type: 'text',
                    placeholder: 'e.g., 4.9'
                },
                {
                    label: '40 Yard Dash Timing Method',
                    id: '40_yard_dash_timing_method',
                    value: '',
                    type: 'select',
                    options: [
                        {
                            label: 'Hand',
                            id: 'hand'
                        },
                        {
                            label: 'Laser',
                            id: 'laser'
                        },
                        {
                            label: 'FAT',
                            id: 'fat'
                        },
                        {
                            label: 'Digital',
                            id: 'digital'
                        }
                    ]
                },
                {
                    label: 'Dominant Hand',
                    id: 'dominant_hand',
                    value: '',
                    type: 'select',
                    options: [
                        {
                            label: 'Left',
                            id: 'left'
                        },
                        {
                            label: 'Right',
                            id: 'right'
                        },
                        {
                            label: 'Switch',
                            id: 'switch'
                        }
                    ]
                },                
                {
                    label: 'Weight in kg',
                    id: 'weight',
                    value: '',
                    placeholder: '',
                    type: 'number'
                },
                {
                    label: 'Height in cm',
                    id: 'height',
                    value: '',
                    placeholder: '',
                    type: 'number'
                },
                {
                    label: 'Beep Level',
                    id: 'beep_level',
                    type: 'select',
                    value: '',
                    options: beepLevels
                },
            ]
        }
    ]
}
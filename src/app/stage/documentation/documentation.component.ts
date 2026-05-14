import { Component } from '@angular/core';
import { AtomicComponent } from "../../component/atomic/atomic.component";
import { SearchBarComponent } from "../../component/search-bar/search-bar.component";
import { TitleComponent } from "../../component/title/title.component";
import { BadgeComponent } from "../../component/badge/badge.component";
import { SelectionComponent } from "../../component/selection/selection.component";
import { FigureDirectionComponent } from "../../component/figure/figure-direction/figure-direction.component";
import { FigureComponent } from "../../component/figure/figure.component";
import { ButtonComponent } from "../../component/button/button.component";
import { ListComponent } from "../../component/list/list.component";

@Component({
  selector: 'stage-documentation',
  standalone: true,
  imports: [
    AtomicComponent,
    SearchBarComponent,
    TitleComponent,
    BadgeComponent,
    SelectionComponent,
    FigureDirectionComponent,
    FigureComponent,
    ButtonComponent,
    ListComponent,
  ],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss',
})
export class DocumentationComponent {
  // listData = [
  //   {
  //     id: 24,
  //     name: 'Jurong East',
  //     code: 'NS1',
  //     isActive: true,
  //     interchange: [
  //       {
  //         id: 24,
  //         code: 'EW',
  //         color: 'green',
  //         isActive: true,
  //       },
  //       {
  //         id: 217,
  //         code: 'JE',
  //         color: 'cyan',
  //         isActive: false,
  //       },
  //     ],
  //   },
  //   {
  //     id: 36,
  //     name: 'Bukit Batok',
  //     code: 'NS2',
  //     isActive: true,
  //     interchange: [],
  //   },
  //   {
  //     id: 37,
  //     name: 'Bukit Gombak',
  //     code: 'NS3',
  //     isActive: true,
  //     interchange: [],
  //   },
  //   {
  //     id: 38,
  //     name: 'Brickland',
  //     code: 'NS3A',
  //     isActive: false,
  //     interchange: [],
  //   },
  //   {
  //     id: 39,
  //     name: 'Choa Chu Kang',
  //     code: 'NS4',
  //     isActive: true,
  //     interchange: [
  //       {
  //         id: 195,
  //         code: 'JW',
  //         color: 'cyan',
  //         isActive: false,
  //       },
  //       {
  //         id: 243,
  //         code: 'BP',
  //         color: 'grey',
  //         isActive: true,
  //       },
  //     ],
  //   },
  //   {
  //     id: 40,
  //     name: 'Yew Tee',
  //     code: 'NS5',
  //     isActive: true,
  //     interchange: [],
  //   },
  //   {
  //     id: 41,
  //     name: 'Sungei Kadut',
  //     code: 'NS6',
  //     isActive: false,
  //     interchange: [
  //       {
  //         id: 158,
  //         code: 'DT',
  //         color: 'blue',
  //         isActive: false,
  //       },
  //     ],
  //   },
  //   {
  //     id: 42,
  //     name: 'Kranji',
  //     code: 'NS7',
  //     isActive: true,
  //     interchange: [],
  //   },
  //   {
  //     id: 43,
  //     name: 'Marsiling',
  //     code: 'NS8',
  //     isActive: true,
  //     interchange: [],
  //   },
  //   {
  //     id: 44,
  //     name: 'Woodlands',
  //     code: 'NS9',
  //     isActive: true,
  //     interchange: [
  //       {
  //         id: 160,
  //         code: 'TE',
  //         color: 'brown',
  //         isActive: true,
  //       },
  //     ],
  //   },
  //   {
  //     id: 45,
  //     name: 'Admiralty',
  //     code: 'NS10',
  //     isActive: true,
  //     interchange: [],
  //   },
  //   {
  //     id: 46,
  //     name: 'Sembawang',
  //     code: 'NS11',
  //     isActive: true,
  //     interchange: [],
  //   },
  //   {
  //     id: 47,
  //     name: 'Canberra',
  //     code: 'NS12',
  //     isActive: true,
  //     interchange: [],
  //   },
  //   {
  //     id: 48,
  //     name: 'Yishun',
  //     code: 'NS13',
  //     isActive: true,
  //     interchange: [],
  //   },
  //   {
  //     id: 49,
  //     name: 'Khatib',
  //     code: 'NS14',
  //     isActive: true,
  //     interchange: [],
  //   },
  //   {
  //     id: 50,
  //     name: 'Yio Chu Kang',
  //     code: 'NS15',
  //     isActive: true,
  //     interchange: [],
  //   },
  //   {
  //     id: 51,
  //     name: 'Ang Mo Kio',
  //     code: 'NS16',
  //     isActive: true,
  //     interchange: [
  //       {
  //         id: 230,
  //         code: 'CR',
  //         color: 'lime',
  //         isActive: false,
  //       },
  //     ],
  //   },
  //   {
  //     id: 52,
  //     name: 'Bishan',
  //     code: 'NS17',
  //     isActive: true,
  //     interchange: [
  //       {
  //         id: 97,
  //         code: 'CC',
  //         color: 'yellow',
  //         isActive: true,
  //       },
  //     ],
  //   },
  //   {
  //     id: 53,
  //     name: 'Braddell',
  //     code: 'NS18',
  //     isActive: true,
  //     interchange: [],
  //   },
  //   {
  //     id: 54,
  //     name: 'Toa Payoh',
  //     code: 'NS19',
  //     isActive: true,
  //     interchange: [],
  //   },
  //   {
  //     id: 55,
  //     name: 'Novena',
  //     code: 'NS20',
  //     isActive: true,
  //     interchange: [],
  //   },
  //   {
  //     id: 56,
  //     name: 'Newton',
  //     code: 'NS21',
  //     isActive: true,
  //     interchange: [
  //       {
  //         id: 130,
  //         code: 'DT',
  //         color: 'blue',
  //         isActive: true,
  //       },
  //     ],
  //   },
  //   {
  //     id: 57,
  //     name: 'Orchard',
  //     code: 'NS22',
  //     isActive: true,
  //     interchange: [
  //       {
  //         id: 172,
  //         code: 'TE',
  //         color: 'brown',
  //         isActive: true,
  //       },
  //     ],
  //   },
  //   {
  //     id: 58,
  //     name: 'Somerset',
  //     code: 'NS23',
  //     isActive: true,
  //     interchange: [],
  //   },
  //   {
  //     id: 59,
  //     name: 'Dhoby Ghaut',
  //     code: 'NS24',
  //     isActive: true,
  //     interchange: [
  //       {
  //         id: 70,
  //         code: 'NE',
  //         color: 'purple',
  //         isActive: true,
  //       },
  //       {
  //         id: 83,
  //         code: 'CC',
  //         color: 'yellow',
  //         isActive: true,
  //       },
  //     ],
  //   },
  //   {
  //     id: 13,
  //     name: 'City Hall',
  //     code: 'NS25',
  //     isActive: true,
  //     interchange: [
  //       {
  //         id: 13,
  //         code: 'EW',
  //         color: 'green',
  //         isActive: true,
  //       },
  //     ],
  //   },
  //   {
  //     id: 14,
  //     name: 'Raffles Place',
  //     code: 'NS26',
  //     isActive: true,
  //     interchange: [
  //       {
  //         id: 14,
  //         code: 'EW',
  //         color: 'green',
  //         isActive: true,
  //       },
  //     ],
  //   },
  //   {
  //     id: 60,
  //     name: 'Marina Bay',
  //     code: 'NS27',
  //     isActive: true,
  //     interchange: [
  //       {
  //         id: 115,
  //         code: 'CC',
  //         color: 'yellow',
  //         isActive: false,
  //       },
  //       {
  //         id: 118,
  //         code: 'CE',
  //         color: 'yellow',
  //         isActive: true,
  //       },
  //       {
  //         id: 178,
  //         code: 'TE',
  //         color: 'brown',
  //         isActive: true,
  //       },
  //     ],
  //   },
  //   {
  //     id: 61,
  //     name: 'Marina South Pier',
  //     code: 'NS28',
  //     isActive: true,
  //     interchange: [],
  //   },
  // ];

  // listData = [
  //   {
  //     "id": 9,
  //     "name": "Jurong Region Line West",
  //     "code": "JW",
  //     "terminus": [
  //       "Choa Chu Kang",
  //       "Jurong Pier",
  //       "Peng Kang Hill"
  //     ]
  //   },
  //   {
  //     "id": 10,
  //     "name": "Jurong Region Line East",
  //     "code": "JE",
  //     "terminus": [
  //       "Tengah",
  //       "Pandan Reservoir"
  //     ]
  //   }
  // ]

  listData = [
    {
      id: 9,
      name: 'Jurong Region Line West',
      code: 'JW',
      currentStation: {
        id: 159,
        name: 'Tengah',
        code: 'JS3',
      },
      previousStation: {
        id: 158,
        name: 'Choa Chu Kang West',
        code: 'JS2',
        terminus: {
          id: [39],
          name: ['Choa Chu Kang'],
        },
      },
      nextStation: {
        id: 160,
        name: 'Hong Kah',
        code: 'JS4',
        terminus: {
          id: [175, 178],
          name: ['Jurong Pier', 'Peng Kang Hill'],
        },
      },
    },
    {
      id: 10,
      name: 'Jurong Region Line East',
      code: 'JE',
      currentStation: {
        id: 159,
        name: 'Tengah',
        code: 'JE',
      },
      nextStation: {
        id: 166,
        name: 'Tengah Plantation',
        code: 'JE1',
        terminus: {
          id: [171],
          name: ['Pandan Reservoir'],
        },
      },
    },
  ];
}

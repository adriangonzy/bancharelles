import React from "react";

import DateFnsUtils from '@date-io/date-fns';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment'


import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';



const reservationChart = {
  data: [
    {
      title: 'Jean',
      start: new Date(2021, 0, 12, 15, 0, 0),
      end: new Date(2021, 0, 23, 15, 0, 0),
      nombre: 2,
      valid: true,
      paye: true,
    },
    {
      title: 'Helene',
      start: new Date(2021, 0, 1, 15, 0, 0),
      end: new Date(2021, 0, 3, 15, 0, 0),
      nombre: 2,
      valid: false,
      paye: false,
    },
  ],
};

export default reservationChart;

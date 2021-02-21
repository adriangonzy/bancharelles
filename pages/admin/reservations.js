import React, { useState } from "react";
import MaterialTable from 'material-table';
import Admin from "layouts/Admin.js";

import Checkbox from '@material-ui/core/Checkbox';

import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

const table_columns = [
  {
    title: 'Nom', field: 'title',
    initialEditValue: 'Nom',
    validate: rowData => rowData.title === '' ? { isValid: false, helperText: 'Rentrez un nom.' } : true,
  },
  {
    title: 'Date de début', field: 'start',
    initialEditValue: new Date(),
    editComponent: ({value, onChange}) => (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          format="DD/MM/yyyy"
          value={moment(value, 'DD/MM/yyyy')}
          onChange={date => onChange(date.format('DD/MM/yyyy'))}
        />
      </MuiPickersUtilsProvider>
    )
  },
  {
    title: "Date de fin", field: 'end',
    initialEditValue: new Date(),
    validate: rowData => rowData.start > rowData.end ? { isValid: false, helperText: 'La date de fin doit etre après celle darrivée' } : true,
    editComponent: ({value, onChange}) => (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          format="DD/MM/yyyy"
          value={moment(value, 'DD/MM/yyyy')}
          onChange={date => onChange(date.format('DD/MM/yyyy'))}
        />
      </MuiPickersUtilsProvider>
    )
  },
  {
    title: "Nombre de personnes", field: 'nombre',
    type: 'numeric',
    initialEditValue: 1,
    validate: rowData => rowData.nombre > 0 ? true : {isValid: false, helperText: 'Rentrez un nombre.' },
  },
  {
    title: "Validé", field: 'valid',
    initialEditValue: false,
    render: rowData => (
      <Checkbox
        disabled
        checked={rowData.valid}
        onChange={e => {}}
      />
    ),
    editComponent: ({value, onChange}) => (
      <Checkbox
      checked={value}
      onChange={e => onChange(e.target.checked)}
      color="default"
    />
    )
  },
  {
    title: "Payé", field: 'paye',
    initialEditValue: false,
    render: rowData => (
      <Checkbox
        disabled
        checked={rowData.paye}
        onChange={e => {}}
      />
    ),
    editComponent: ({value, onChange}) => (
      <Checkbox
      checked={value}
      onChange={e => onChange(e.target.checked)}
      color="default"
    />
    )
  },
];

function Reservations(props) {

  const [reservations, updateReservations] = useState(props.reservations);

  return (
    <MaterialTable
      title="Liste des réservations"
      views={['month']}
      columns={table_columns}
      data={reservations.data}
      options={{
        draggable: false,
      }}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...reservations.data];
              data.push(newData);
              const newReservations = {...reservations, data};
              updateReservations(newReservations);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                const data = [...reservations.data];
                data[data.indexOf(oldData)] = newData;
                const newReservations = {...reservations, data};
                updateReservations(newReservations);
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...reservations.data];
              data.splice(data.indexOf(oldData), 1);
              const newReservations = {...reservations, data};
              updateReservations(newReservations);
            }, 600);
          }),
      }}
    />
  );
}

Reservations.getInitialProps = async (ctx) => {
  return {
    reservations: {
      data: [
        {
          title: 'Jean',
          start: '15/02/2021',
          end: '17/02/2021',
          nombre: 2,
          valid: true,
          paye: true,
        },
        {
          title: 'Helene',
          start: '03/02/2021',
          end: '07/02/2021',
          nombre: 2,
          valid: false,
          paye: false,
        },
      ],
    }
  }
}

Reservations.layout = Admin;

export default Reservations;

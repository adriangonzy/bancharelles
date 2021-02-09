import React from "react";

import Admin from "layouts/Admin.js";

import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
// core components
import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { Calendar, momentLocalizer } from 'react-big-calendar'

import reservationChart from "variables/charts.js";

const localizer = momentLocalizer(moment)

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

function createDate(liste) {
  var listeDates = [];
  for (const dataPoint of liste) {
    listeDates = listeDates.concat([
      {
        'title': dataPoint.title,
        'start': dataPoint.start,
        // 'end': new Date(dataPoint.end.getTime() + (1000 * 60 * 60 * 24))
        'end': dataPoint.end,
        'valid': dataPoint.valid,
        'paye': dataPoint.paye
      }
    ]);
  }
  return listeDates;
}


function eventStyleGetter(event, start, end) {
    // console.log(event);
    var backgroundColor = 'DarkSeaGreen'
    if (!event.paye) {
      backgroundColor = 'LightSalmon'
    }
    if (!event.valid) {
      backgroundColor = 'LightCoral'
    }
    var style = {
        backgroundColor: backgroundColor,
    };
    return {
        style: style
    };
}



function Calendrier() {
    const classes = useStyles();
    // const myEventsList = createDate(props.reservations.data)
    const myEventsList = createDate(reservationChart)
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardBody>
                <Calendar
                  localizer={localizer}
                  events={myEventsList}
                  defaultView='month'
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
                  eventPropGetter={eventStyleGetter}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Créez ou modifiez une réservation</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    Pour modifier une réservation, sélectionnez la sur le calendrier à gauche.
                    <CustomInput
                      labelText="Date de début (JJ/MM/AA)"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Date de fin (JJ/MM/AA)"
                      id="first-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Nom"
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Nombre de personnes"
                      id="country"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="info">Confirmer</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
}

Calendar.layout = Admin;

export default Calendar;

import "./App.css";
import { getPartners } from "./actions/get";
import { Component } from "react";
import { postCountries } from "./actions/post";
import { partners } from "./consts/partners";

class App extends Component {
  getAvilableDates(pList) {
    const dates = new Set();

    pList.forEach((p) => {
      p.availableDates.forEach((d) => dates.add(d));
    });

    return [...dates];
  }

  isTwoConsecDates(date1, date2) {
    return Date.parse(date2) - Date.parse(date1) === 86400000;
  }

  parsePartners(country, pList) {
    let maxAttendeeList = [];
    let startDate = null;

    let availableDates = this.getAvilableDates(pList);

    availableDates.sort((a, b) => {
      a = a.split("-").join("");
      b = b.split("-").join("");

      return a.localeCompare(b);
    });

    for (let i = 0; i < availableDates.length - 1; i++) {
      if (this.isTwoConsecDates(availableDates[i], availableDates[i + 1])) {
        let attendees = [];

        pList.forEach((p) => {
          if (
            p.availableDates.includes(availableDates[i]) &&
            p.availableDates.includes(availableDates[i + 1])
          ) {
            attendees.push(p.email);
          }
        });

        if (attendees.length > maxAttendeeList.length) {
          maxAttendeeList = attendees;
          startDate = availableDates[i];
        }
      }
    }

    return {
      attendeeCount: maxAttendeeList.length,
      attendees: maxAttendeeList,
      name: country,
      startDate: startDate,
    };
  }

  getCountries(partners) {
    let countryMap = {};

    partners.forEach((partner) => {
      const p = {
        email: partner.email,
        availableDates: partner.availableDates,
      };

      let pList = countryMap[partner.country];
      if (pList == null) {
        pList = [p];
      } else {
        pList.push(p);
      }
      countryMap[partner.country] = pList;
    });

    let countries = [];

    for (const country in countryMap) {
      countries.push(this.parsePartners(country, countryMap[country]));
    }

    return countries;
  }

  componentDidMount() {
    getPartners()
      .then((res) => {
        const countries = this.getCountries(res.partners);
        postCountries(countries)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err.response.data);
            console.log(err.response.status);
          });
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err.response.status);
      });
  }

  render() {
    return <div>HubSpot Poject</div>;
  }
}

export default App;

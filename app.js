//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.set('view-engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const KEY = "at_xb5PvRIvhKMwGYmy9MziWfjYMwFfa";

app.get("/", function(req, res) {
  const address = "8.8.8.8";
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${KEY}&ipAddress=${address}`;
  https.get(url, function(response) {
    response.on("data", function(data) {
      const parsedData = JSON.parse(data);
      const ip = parsedData.ip;
      const location = parsedData.location;
      const lat = location.lat;
      const lng = location.lng;
      const city = location.city;
      const region = location.region;
      const postalCode = location.postalCode;
      const timezone = location.timezone;
      const isp = parsedData.isp;
      console.log(lat);
      console.log(lng);
      res.render("index.ejs", {
        ipaddress: ip,
        location: `${city}, ${region}\n ${postalCode}`,
        timezone: timezone,
        isp: isp,
        lat: lat,
        lng: lng
       });
    });
  });

});

app.post("/", function(req, res) {
  console.log(req.body);
  const address = req.body.search;
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${KEY}&ipAddress=${address}`;
  https.get(url, function(response) {
    response.on("data", function(data) {
      const parsedData = JSON.parse(data);
      const ip = parsedData.ip;
      const location = parsedData.location;
      const city = location.city;
      const region = location.region;
      const postalCode = location.postalCode;
      const timezone = location.timezone;
      const isp = parsedData.isp;

      res.render("index.ejs", {
        ipaddress: ip,
        location: `${city}, ${region}\n ${postalCode}`,
        timezone: timezone,
        isp: isp
       });
    });
  });
});

app.listen("2000", function() {
  console.log("Server is running on port 2000");
});

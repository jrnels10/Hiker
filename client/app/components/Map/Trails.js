let lat;
let lon;
let trailName;
let trailImage;
let trailLength;
let trailSummary;
const displayTrails = props => {
    let marker = {};
    // marker.empty();
    
    // console.log(props.map)
    for (let i = 0; i < props.data.trails.length; i++) {
        // console.log(props.data.trails[i].latitude)
        lat = props.data.trails[i].latitude;
        // console.log(lat)
        lon = props.data.trails[i].longitude;

        trailName = props.data.trails[i].name;
        trailImage = props.data.trails[i].imgMedium;
        trailLength = props.data.trails[i].length;
        trailSummary = props.data.trails[i].summary;
        marker = L.marker([lat, lon])
        // console.log(marker)
        marker.bindPopup(`<div class="jumbotron trail-pop" id="trail-pic" style="background-image: url('${trailImage}')">
        <div class="info-container h-100">
        <div class="trail-stuff">
        <h1 class="display-4 trail-name">${trailName}</h1>
        <p class="trail-length m-0">${trailLength} miles</p>
        <hr class="my-2">
        <p class="trail-summary">${trailSummary}</p>
        </div>
        <div class="lead">
        <div class="btn btn-primary btn-lg" id="check-in" href="https://www.google.com/" role="button">Check In</div>
        </div>
        </div>
        </div>
        `).addTo(props.map);
    }
}


export default displayTrails;

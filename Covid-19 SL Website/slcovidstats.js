 fetch ("https://disease.sh/v3/covid-19/countries/Sri%20Lanka?yesterday=Sri%20Lanka&twoDaysAgo=Sri%20Lanka&strict=Sri%20Lanka&allowNull=Sri%20Lanka")
 .then ((Response)=> {
return Response.json();
 }) .then ((data) => {
document.getElementById("count_name").innerHTML = data.
country
document.getElementById("Count_flag").innerHTML = data.
flag
document.getElementById("totCases").innerHTML = data.
cases
document.getElementById("totDeaths").innerHTML = data.
deaths
document.getElementById("totRecovered").innerHTML = data.
recovered
document.getElementById("casesToday").innerHTML = data.
todayCases
document.getElementById("deathsToday").innerHTML = data.
todayDeaths
document.getElementById("recoveredToday").innerHTML = data.
todayRecovered
document.getElementById("activeCases").innerHTML = data.
active
document.getElementById("criticalCases").innerHTML = data.
critical
document.getElementById("totalTests").innerHTML = data.
tests
document.getElementById("casesPerMil").innerHTML = data.
casesPerOneMillion
document.getElementById("deathsPerMil").innerHTML = data.
deathsPerOneMillion
document.getElementById("testsPerMil").innerHTML = data.
testsPerOneMillion
document.getElementById("continent").innerHTML = data.
continent




 })


const COLORSCHEME = {
    confirmed: '#ff0000',
    recovered: '#008000',
    deaths: '#373c43',
    
}

const CASE_REPORT = {
    confirmed: 'confirmed',
    recovered: 'recovered',
    deaths: 'deaths',
     
}

let body = document.querySelector('body')

let countries_list

let global_chart, latest_chart, death_pie_chart, cases_pie_chart

window.onload = async () => {
 console.log('ready...')

 // // init Chart
 initCountryFilter()

await initGlobalChart()

await initLatestChart()

await initDeathPieChart()

await initCasesPieChart()

await loadData('Global')

await loadSelectCountryList()

    document.querySelector('#select-country-toggle').onclick = () => {
        document.querySelector('#select-country-list').classList.toggle('active')
    }

}

loadData = async (country) => {

startLoading()


await loadSummary(country)

await loadGlobalChart(country)

await loadLatestChart(country)

endLoading()
}

// Loader JS

startLoading = () => {
    body.classList.add('loading')
}

endLoading = () => {
    body.classList.remove('loading')
}

    // only init chart on page loaded first time

    isGlobal = (country) => {
    return country === 'Global'
}

numWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


showTotalConfirmed = (total) => {
document.querySelector('#total-confirmed').textContent = numWithCommas(total)
}


showTotalRecovered = (total) => {
document.querySelector('#total-recovered').textContent = numWithCommas(total)
}

showTotalDeaths = (total) => {
document.querySelector('#total-deaths').textContent = numWithCommas(total)
}

 

loadSummary = async (country) => {

    // filter country => Slug

    let summaryData = await covidApi.getSummary()

    let summary = summaryData.Global

    if (!isGlobal(country)) {

        summary = summaryData.Countries.filter(e => e.Slug === country)[0]
    }

    showTotalConfirmed(summary.TotalConfirmed)
    showTotalRecovered(summary.TotalRecovered)
    showTotalDeaths(summary.TotalDeaths)
     

    // Loading Deaths Pie Chart

    await loadDeathPieChart(Math.floor(summary.TotalDeaths / summary.TotalConfirmed * 100))

    // Loading Confirmed Pie Chart

    await loadCasesPieChart(Math.floor(summary.TotalConfirmed / summary.TotalConfirmed * 100))


    // Loading Countries Table

    let casesByCountries = summaryData.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)

    let countries_table_body = document.querySelector('#countries-table tbody')
    countries_table_body.innerHTML = ''

    for (let i = 0; i < 10; i++) {
let line = `
            <tr>
                <td>${casesByCountries[i].Country}</td>
                <td>${numWithCommas(casesByCountries[i].TotalConfirmed)}</td>
                <td>${numWithCommas(casesByCountries[i].NewConfirmed)}</td>
                <td>${numWithCommas(casesByCountries[i].TotalDeaths)}</td>
            </tr>
        `

countries_table_body.innerHTML += line
    }
}

// Global Chart Table

initGlobalChart = async () => {
let options = {
chart: {
     type: 'line'
},
colors: [COLORSCHEME.confirmed, COLORSCHEME.recovered, COLORSCHEME.deaths],
series: [],

xaxis: {
    categories: [],

    labels: {
        show: false
    }
  },


  grid: {
    show: false
  },

  stroke: {
    curve: 'smooth'
  }
}

global_chart = new ApexCharts(document.querySelector('#global-chart'), options)

global_chart.render()

}

renderData = (country_data) => {
 let res = []

 country_data.forEach(e => {
    res.push(e.Cases)
 })
return res

}

renderWorldData = (world_data, status) => {
 let res = []

 world_data.forEach (e => {
    switch (status) {
        case CASE_REPORT.confirmed:
        res.push(e.TotalConfirmed)
        break
        case CASE_REPORT.recovered:
        res.push(e.TotalRecovered)
        break
        case CASE_REPORT.deaths:
        res.push(e.TotalDeaths)
        break

         
    }
 })

 return res
}

loadGlobalChart = async (country) => {

    let labels = []

    let confirmed_data, recovered_data, deaths_data

    if (isGlobal(country)) {
        let world_data = await covidApi.getGlobalCompleteCases()

        world_data.sort((a, b) => new Date(a.Date) - new Date(b.Date))

        world_data.forEach(e => {
            let d = new Date(e.Date)
            labels.push(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)
        })

        confirmed_data = renderWorldData(world_data, CASE_REPORT.confirmed)
        recovered_data = renderWorldData(world_data, CASE_REPORT.recovered)
        deaths_data = renderWorldData(world_data, CASE_REPORT.deaths)
        


    }else {

        let confirmed = await covidApi.getCountryCompleteCases(country, CASE_REPORT.confirmed)
        let recovered = await covidApi.getCountryCompleteCases(country, CASE_REPORT.recovered)
        let deaths = await covidApi.getCountryCompleteCases(country, CASE_REPORT.deaths)
        


        confirmed_data = renderData(confirmed)
        recovered_data = renderData(recovered)
        deaths_data = renderData(deaths)
        

        confirmed.forEach(e => {
            let d = new Date(e.Date)
            labels.push(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)
        })
    }

    let series = [{
        name: 'Confirmed',
        data: confirmed_data
    },
    {
        name: 'Recovered',
        data: recovered_data
    },
    {
        name: 'Deaths',
        data: deaths_data
    }]


    global_chart.updateOptions({
        series: series,
        xaxis: {
            categories: labels
        }
    })

}


initLatestChart = async () => {
     let options = {
chart: {
     type: 'line'
},
colors: [COLORSCHEME.confirmed, COLORSCHEME.recovered, COLORSCHEME.deaths],
series: [],

xaxis: {
    categories: [],

    labels: {
        show: false
    }
  },


  grid: {
    show: false
  },

  stroke: {
    curve: 'smooth'
  }
}

latest_chart = new ApexCharts(document.querySelector('#latest-chart'), options)

latest_chart.render()

    }


    loadLatestChart = async (country) => {

        let labels = []

    let confirmed_data, recovered_data, deaths_data

    if (isGlobal(country)) {
        let world_data = await covidApi.getGlobalLatestCases()

        world_data.sort((a, b) => new Date(a.Date) - new Date(b.Date))

        world_data.forEach(e => {
            let d = new Date(e.Date)
            labels.push(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)
        })

        confirmed_data = renderWorldData(world_data, CASE_REPORT.confirmed)
        recovered_data = renderWorldData(world_data, CASE_REPORT.recovered)
        deaths_data = renderWorldData(world_data, CASE_REPORT.deaths)
        


    }else {

        let confirmed = await covidApi.getCountryLatestCases(country, CASE_REPORT.confirmed)
        let recovered = await covidApi.getCountryLatestCases(country, CASE_REPORT.recovered)
        let deaths = await covidApi.getCountryLatestCases(country, CASE_REPORT.deaths)
        


        confirmed_data = renderData(confirmed)
        recovered_data = renderData(recovered)
        deaths_data = renderData(deaths)
        

        confirmed.forEach(e => {
            let d = new Date(e.Date)
            labels.push(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)
        })
    }

    let series = [{
        name: 'Confirmed',
        data: confirmed_data
    },
    {
        name: 'Recovered',
        data: recovered_data
    },
    {
        name: 'Deaths',
        data: deaths_data
    }]


    latest_chart.updateOptions({
        series: series,
        xaxis: {
            categories: labels
        }
    })


    }

initDeathPieChart = async () => {
let options = {
chart: {
     type: 'radialBar',
     height: '350'
},

series: [],
labels: ['Death Rate'],
colors: [COLORSCHEME.deaths]
  
}

death_pie_chart = new ApexCharts(document.querySelector('#death-pie-chart'), options)

death_pie_chart.render()

    }


loadDeathPieChart = async (rate) => {

    death_pie_chart.updateSeries([rate])

}

initCasesPieChart = async () => {
let options = {
chart: {
     type: 'radialBar',
     height: '350'
},

series: [],
labels: ['Confirmed Rate'],
colors: [COLORSCHEME.confirmed]
  
}

cases_pie_chart = new ApexCharts(document.querySelector('#cases-pie-chart'), options)

cases_pie_chart.render()

    }


loadCasesPieChart = async (rate) => {

    cases_pie_chart.updateSeries([rate])

}


// // Select Country

renderSelectCountryList = (list) => {
let select_country_list = document.querySelector('#select-country-list')
select_country_list.querySelectorAll('div').forEach(e => e.remove())
list.forEach(e => {

    let item = document.createElement('div')
        item.classList.add('country-item')
        item.textContent = e.Country

        item.onclick = async () => {

            document.querySelector('#select-country span').textContent = e.Country
            select_country_list.classList.toggle('active')
            await loadData(e.Slug)

        }

          select_country_list.appendChild(item)
      })

}

loadSelectCountryList = async () => {

    let summaryData = await covidApi.getSummary()

    countries_list = summaryData.Countries

    let select_country_list = document.querySelector('#select-country-list')

    let item = document.createElement('div')
    item.classList.add('country-item')
    item.textContent = 'Global'

    item.onclick = async () => {

            document.querySelector('#select-country span').textContent = 'Global'
            select_country_list.classList.toggle('active')
            await loadData('Global')

    }

    select_country_list.appendChild(item)

    renderSelectCountryList(countries_list)

}

// country filter
initCountryFilter = () => {
    let input = document.querySelector('#select-country-list input')
    input.onkeyup = () => {
        let filtered = countries_list.filter(e => e.Country.toLowerCase().includes(input.value))
        renderSelectCountryList(filtered)
    }
}
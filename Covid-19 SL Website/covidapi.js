const covidApi = {
getSummary: async () => {
        return await fetchRequest(covidApiFinishPoints.summary())
    },

    getGlobalCompleteCases: async () => {

        return await fetchRequest(covidApiFinishPoints.globalCompleteCases())

    },

    getCountryCompleteCases: async (country, status) => {

        return await fetchRequest(covidApiFinishPoints.countryCompleteCases(country, status))

    },

    getGlobalLatestCases: async () => {
        return await fetchRequest(covidApiFinishPoints.globalLatestCases())
    },
    getCountryLatestCases: async (country, status) => {
        return await fetchRequest(covidApiFinishPoints.countryLatestCases(country, status))
    }

}

const covid_api_website = 'https://api.covid19api.com/'

const covidApiFinishPoints = {
    summary: () => {
        return getApiPath('summary')
    },

    globalCompleteCases: () => {
        return getApiPath('world')
    },

    countryCompleteCases: (country, status) => {

        let finish_point = `dayone/country/${country}/status/${status}`
        return getApiPath(finish_point)

    },

    countryLatestCases: (country, status) => {
        let date = getLatestRange(30)

        let finish_point = `country/${country}/status/${status}?from=${date.start_date}&to=${date.end_date}`

        return getApiPath(finish_point)

    },

    globalLatestCases: () => {
        let date = getLatestRange(30)

        let finish_point = `world?from=${date.start_date}&to=${date.end_date}`

        return getApiPath(finish_point)
    }
}


// get the date at days before today
getLatestRange = (days) => {

let d = new Date()

    let from_d = new Date(d.getTime() - (days * 24 * 60 * 60 * 1000))

    let to_date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`

    let from_date = `${from_d.getFullYear()}-${from_d.getMonth() + 1}-${from_d.getDate()}`

    return {
        start_date: from_date,
        end_date: to_date
    }
}


getApiPath = (finish_point) => {
    return covid_api_website + finish_point
}
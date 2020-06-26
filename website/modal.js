'use strict'

const DisplayWeatherData = (function() {
    const generateBtn = document.querySelector('[data-element=generate-btn]')
    const refreshBtn = document.querySelector('[data-element=refresh-btn]')
    const resultCard = document.querySelector('[data-element=resultCard]')
    const form = document.querySelector('[data-element=form]')
    const zipCode = document.querySelector('[data-element=zip]')
    const feelings = document.querySelector('[data-element=feelings]')
    const errorText = document.querySelector('[data-element=errorText]')

    const hideForm = function() {
        form.style.display = 'none'
        resultCard.style.display = 'block'
    }

    const refreshPage = function() {
        location.reload()
    }

    const openDataResults = () => {
        generateBtn.addEventListener('click', () => {
            if (zipCode.value != '' && feelings.value != ''){
                hideForm()
            } else {
                errorText.style.display = 'block'
            }
        })
    }

    const closeDataResults = () => {
        refreshBtn.onclick = refreshPage
    }

    const init = function() {
        openDataResults(),
        closeDataResults()
    }

    return {
        init: init,
    }

})()

document.addEventListener('DOMContentLoaded', DisplayWeatherData.init)
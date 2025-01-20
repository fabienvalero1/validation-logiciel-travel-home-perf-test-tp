module.exports = {
    'Contact form': function (browser) {
        browser
            .url('http://localhost:9090/contact')
            .waitForElementVisible('body', 1000)
            .assert.visible('input[name="firstName"]', 'Champ prénom visible')
            .assert.visible('input[name="lastName"]', 'Champ nom visible')
            .assert.visible('input[name="mobilePhone"]', 'Champ téléphone visible')
            .assert.visible('input[name="email"]', 'Champ email visible')
            .assert.visible('input[name="arrivedAt"]', 'Champ arrivée visible')
            .assert.visible('input[name="departureAt"]', 'Champ départ visible')
            .assert.visible('textarea[name="message"]', 'Champ message visible')
            .assert.visible('button[type="submit"]', 'Bouton Envoyer visible')
            .setValue('input[name="firstName"]', 'Jean')
            .setValue('input[name="lastName"]', 'Louis')
            .setValue('input[name="mobilePhone"]', '0610203040')
            .setValue('input[name="email"]', 'jean.louis@email.com')
            .setValue('input[name="arrivedAt"]', '2025-01-01')
            .setValue('input[name="departureAt"]', '2025-01-10')
            .setValue('textarea[name="message"]', 'Ceci est un message test.')
            .click('button[type="submit"]')
            .waitForElementVisible('body', 1000)
            .assert.urlContains('/contact', 'Reste sur la page de contact après la soumission')
            browser.end();
    },
};

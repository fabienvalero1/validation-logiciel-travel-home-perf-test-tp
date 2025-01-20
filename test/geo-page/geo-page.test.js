module.exports = {
    'Test de la page geo': async function (browser) {
        browser
        browser.url('http://localhost:9090/geo')
            .waitForElementVisible('header', 1000)
            .assert.textContains('header', 'IDEALEMENT SITUE')
            .assert.textContains('header', '30 mètres de la plage')
            .assert.visible('a.btn-dark', 'Le bouton de contact est visible')
            .waitForElementVisible('iframe', 1000)
            .assert.visible('iframe', 'La carte est visible')
            .click('a.btn-dark')
            .assert.urlContains('/contact', 'Le bouton de contact redirige bien vers la page de contact')
            browser.end();
    },
};

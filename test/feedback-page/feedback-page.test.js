module.exports = {
    'Test de la page feedback': function (browser) {
        browser
            .url('http://localhost:9090/feedback')
            .waitForElementVisible('body', 1000)
            .assert.visible('header', 'Le header de la page est visible')
            .assert.visible('form', 'Le formulaire est visible')
            .assert.visible('input[name="name"]', 'Le champ du prénom est visible')
            .assert.visible('textarea[name="message"]', 'Le champ du message est visible')
            .assert.visible('button[type="submit"]', 'Le bouton pour envoyer le formulaire est visible')
            .setValue('input[name="name"]', 'John Doe')
            .setValue('textarea[name="message"]', 'This is a test feedback message.')
            .click('button[type="submit"]')
            .waitForElementVisible('body', 5000)
            .assert.textContains('.card-header', 'John Doe', 'Le nom de l\'auteur est affiché correctement')
            .assert.textContains('.card-body', 'This is a test feedback message.', 'Le message est affiché correctement')
            browser.end();
    },
};
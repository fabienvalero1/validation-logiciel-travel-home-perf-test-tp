module.exports = {
    'Test de la page admin': function (browser) {
        const loginCredentials = {
            name: 'testadminuser',
            password: 'testadminuser',
        };

        browser
            .url('http://localhost:9090/admin')
            .waitForElementVisible('body', 1000)
            .setValue('input[name="name"]', loginCredentials.name)
            .setValue('input[name="password"]', loginCredentials.password)
            .click('button[type="submit"]')
            .pause(1000)
            .assert.urlContains('/admin', 'Redirection vers la page admin après connexion')
            .waitForElementVisible('body', 1000)
            .assert.urlContains('/admin', 'Accès autorisé à la page admin')
            .assert.visible('table', 'La table des messages est visible')
            .assert.textContains('th:nth-child(1)', 'dates', 'First table header contains "dates"')
            .assert.textContains('th:nth-child(2)', 'authors', 'Second table header contains "authors"')
            .assert.textContains('th:nth-child(3)', 'arrived -> departure', 'Third table header contains "arrived -> departure"')
            .assert.textContains('th:nth-child(4)', 'messages', 'Fourth table header contains "messages"')
            .assert.textContains('th:nth-child(5)', 'delete', 'Fifth table header contains "delete"')
            .assert.visible('.btn.btn-danger.disconnected', 'Le bouton pour se déconnecter est visible')
            .click('.disconnected')
            .pause(1000)
            .assert.urlContains('/login', 'Redirection vers la page de login après déconnexion')
            browser.end();
    },
};

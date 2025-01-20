// login-page.test.js

module.exports = {
    'Login des administrateurs': function (browser)
    {
        browser
            .url('http://localhost:9090/login')
            .waitForElementVisible('body', 5000)
            .assert.visible('input[name="name"]', 'Le champ du nom est visible')
            .assert.visible('input[name="password"]', 'Le champ du mot de passe est visible')
            .assert.visible('button[type="submit"]', 'Le bouton pour envoyer le formulaire est visible')
            .setValue('input[name="name"]', 'testadminuser')
            .setValue('input[name="password"]', 'testadminuser')
            .click('button[type="submit"]')
            .waitForElementVisible('body', 5000)
            .assert.urlContains('/admin', 'L\'utilisateur est bien redirigé sur la page admin')
            browser.end();
    },

    'Login des utilisateurs': function (browser)
    {
        browser
            .url('http://localhost:9090/login')
            .waitForElementVisible('body', 5000)
            .assert.visible('input[name="name"]', 'Le champ du nom est visible')
            .assert.visible('input[name="password"]', 'Le champ du mot de passe est visible')
            .assert.visible('button[type="submit"]', 'Le bouton pour envoyer le formulaire est visible')
            .setValue('input[name="name"]', 'testuser')
            .setValue('input[name="password"]', 'testuser')
            .click('button[type="submit"]')
            .waitForElementVisible('body', 5000)
            .assert.urlContains('/', 'L\'utilisateur est redirigé sur la page d\'accueil')
            browser.end();
    },

    'Login avec de mauvais identifiants': function (browser) {
        browser
            .url('http://localhost:9090/login')
            .waitForElementVisible('body', 5000)
            .assert.visible('input[name="name"]', 'Le champ du nom est visible')
            .assert.visible('input[name="password"]', 'Le champ du mot de passe est visible')
            .assert.visible('button[type="submit"]', 'Le bouton pour envoyer le formulaire est visible')
            .setValue('input[name="name"]', 'testuser')
            .setValue('input[name="password"]', 'wrongpassword')
            .click('button[type="submit"]')
            .waitForElementVisible('body', 5000)
            .assert.urlContains('/login', 'L\'utilisateur est bien redirigé sur la page de login')
            browser.end();
    },
};
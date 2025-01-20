module.exports = {
    'Home page test' : function (browser) {
        browser
            .url('http://localhost:9090')
            .waitForElementVisible('body', 5000)
            .assert.visible('.home--header-title', 'Le titre principal est visible')
            .assert.textContains('.home--header-title', 'A LOUER APPARTEMENT ROSAS')
            .assert.visible('#appartement-gallerie', 'La galerie d\'appartement est affichée')
            .assert.visible('#caracteristiques', 'La section des caractéristiques est affichée')
            .assert.visible('#tarifs', 'La section des tarifs est affichée')
            .click('a[href="/contact"]')
            .waitForElementVisible('body', 5000)
            .assert.urlContains('/contact', 'Redirection vers la page de contact')
            browser.end();
    },
};

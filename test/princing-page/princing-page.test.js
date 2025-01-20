module.exports = {
    'Tests de la page des tarifs': function (browser)
    {
        browser
            .url('http://localhost:9090/pricing')
            .waitForElementVisible('body', 1000, 'La page a bien été chargée.')
            .assert.visible('header', 'L’en-tête est visible.')
            .assert.textContains('h2.display-3', 'UN PRIX POUR\nTOUTES LES SAISONS', 'Le titre principal est correct.')
            .assert.textContains('h2.display-6', 'Venez séjourner à Rosas', 'Le sous-titre est correct.')
            .assert.textContains('p', 'De 460 € à 760 € / semaine', 'La plage de prix est correcte.')

            .assert.visible('#tarifs-pricing', 'La section des tarifs est visible.')
            .elements('css selector', '#tarifs-pricing .card', function (result) {
                browser.assert.strictEqual(result.value.length, 3, 'Il y a trois cartes de tarifs.')
            });

        browser.assert.textContains('.card:nth-child(1) .card-title', 'Basse saison', 'Le titre de la première carte est correct.')
            .assert.textContains('.card:nth-child(1) .card-text', '460 €', 'Le prix de la première carte est correct.')
            .assert.visible('.card:nth-child(1) img', 'L’image de la première carte est visible.')

            .end();
    }
};
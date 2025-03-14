
/**
 * Sample CSV templates for users to download
 */
export const getSampleCSV = (): string => {
  // Provide both comma and semicolon versions
  const semicolonVersion = `Kategooria;Tekst
Õpieesmärk;Hooliva ja arengut toetava õpikeskkonna loomine
Sammu nimi;Iga õpilase väärtustamine
Sammu kirjeldus;Annan märku, et iga õpilane on oluline ja väärtuslik
Edukriteerium;Lugupidav suhtumine: suhtun austusega erineva tausta, võimete ja huvidega õpilastesse
Edukriteerium;Kaasamine: loon kõigile õpilastele võimalusi klassiaruteludes osaleda
Edukriteerium;Tunnustamine: märkan ja tõstan esile iga õpilase andeid, tugevusi ja edusamme
Edukriteerium;Lugupidav keel ja käitumine: kasutan viisakat keelt ja käitumist kõigi õpilaste suhtes
Harjutusülesanne;Vaadake klassi nimekirja ja mõelge, mida te iga õpilase kohta teate
Harjutusülesanne;Koostage plaan, kuidas luua kõigile õpilastele võrdsed võimalused osaleda`;

  // Return the semicolon version
  return semicolonVersion;
};

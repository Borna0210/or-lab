---
title: Košarkaški klubovi
author: Borna Radojčić  
version: 1.0  
media type: CSV, JSON, SQL
licence: CC BY-NC-SA 4.0 
licence_desc:  Creative commons licencija daje mogućnost kopiranja mog dokumenta drugima, ali to ne smiju raditi u komercijalne svrhe i moraju biti transparentni prema javnosti o promjenama u dokumentu kao i o mom originalnom autorstvu dokumenta, također, moraju objaviti svoj dokument s istom licencom kao što sam sad ja  
language: Croatian, English
theme: Basketball 
publification date: '2021-10-30'
last modified: '2021-10-30'
atributes: 
  idklub: ID kluba  
  imeklub: Ime kluba  
  arenaklub: Arena u kojoj klub igra domaće utakmice 
  savdrzava: Američka savezna država u kojoj se klub nalazi  
  godosnutka: Godina osnutka kluba  
  imeigrac: Ime igrača određenog kluba  
  prezimeigrac: Prezime igrača određenog kluba  
  brojdresa: Broj na dresu igrača  
  pozicijaigrac: Pozicija na kojoj igrač igra (PG,SG,SF,PF,C)
  uni_hs_club: Sveučilište za koje je igrač igrao, ako je umjesto za sveučilište igrao u nekom klubu, piše ime kluba, a ako je direktno iz srednje škole došao u NBA, piše ime srednje škole
  imetrener: Ime trenera određenog kluba  
  prezimetrener: Prezime trenera određenog kluba  
---

# Readme.md 
### Ovdje možete saznati sve što vas zanima o tablicama u mojoj bazi podataka i informacijama koje su u njima zapisane.
---
## Klub
Popis 15 klubova u NBA-u, informacije koje imamo o njima su njihovo ime, ime njihove arene, godina njihovog osnutka, savezna država u kojoj igraju i jedinstveni identifikacijski broj svakog kluba.

## Igrač
Popis 3 igrača iz svakog od 15 klubova, podaci koje imamo o njima su njihovo ime, prezime, pozicija na kojoj igraju, broj na njihovom dresu i sveučilište za koje su igrali, ako nisu igrali za sveučilište onda piše ime srednje škole ili kluba iz kojeg su došli u NBA.

## Trener
Popis trenera svih 15 klubova s popisa, informacije koje imamo o njima su njihovo ime i prezime.

## Košarkaški_klubovi
Konačna tablica u kojoj imamo popis klubova s pripadajućim igračima i trenerom, povezani su atributom identifikacijskog broja kluba, nje nema u bazi podataka već je dobivena prirodnim spajanjem tri prethodne tablice i tako je zapisana u CSV i JSON datoteci.

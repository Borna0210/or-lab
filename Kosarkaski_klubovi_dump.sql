--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: igrac; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.igrac (
    imeigrac character varying(255) NOT NULL,
    prezimeigrac character varying(255) NOT NULL,
    brojdresa integer NOT NULL,
    pozicijaigrac character varying(2) NOT NULL,
    idklub integer NOT NULL
);


ALTER TABLE public.igrac OWNER TO postgres;

--
-- Name: klub; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.klub (
    idklub integer NOT NULL,
    imeklub character varying(255) NOT NULL,
    arenaklub character varying(255) NOT NULL,
    savdrzava character varying(255) NOT NULL,
    godosnutka integer NOT NULL
);


ALTER TABLE public.klub OWNER TO postgres;

--
-- Name: trener; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trener (
    idtrener integer NOT NULL,
    imetrener character varying(255) NOT NULL,
    prezimetrener character varying(255) NOT NULL,
    idklub integer NOT NULL
);


ALTER TABLE public.trener OWNER TO postgres;

--
-- Data for Name: igrac; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.igrac (imeigrac, prezimeigrac, brojdresa, pozicijaigrac, idklub) FROM stdin;
Kevin	Durant	7	SF	8
James	Harden	13	SG	8
Kyrie	Irving	11	PG	8
Derrick	Rose	4	PG	1
Julius	Randle	30	PF	1
Taj	Gibson	67	PF	1
Stephen	Curry	30	PG	2
Klay	Thompson	11	SG	2
Draymond	Green	23	PF	2
Giannis	Antetokuonmpo	34	PF	3
Khris	Middleton	22	SF	3
Jrue	Holiday	21	PG	3
Zach	LaVine	8	SG	4
Alex	Caruso	6	PG	4
LaMelo	Ball	2	PG	5
Miles	Bridges	0	SF	5
Gordon	Hayward	20	SF	5
Zion	Williamson	1	PF	6
Brandon	Ingram	14	SF	6
Josh	Hart	3	SG	6
LeBron	James	6	SF	7
Anthony	Davis	3	PF	7
Dwight	Howard	39	C	7
Jayson	Tatum	0	SF	9
Jaylen	Brown	7	SG	9
Marcus	Smart	36	PG	9
Devin	Booker	1	SG	10
Chris	Paul	3	PG	10
Kristaps	Porzingis	6	PF	11
Michael	Porter Jr.	1	SF	12
Jamal	Murray	27	PG	12
Trae	Young	11	PG	13
Kevin	Huerter	3	SG	13
John	Collins	20	PF	13
Ben	Simmons	25	PG	14
Joel	Embiid	21	C	14
Tobias	Harris	12	SF	14
Damian	Lillard	0	PG	15
CJ	McCollum	3	SG	15
Luka	Doncic	77	PG	11
Dario	Saric	20	PF	10
Boban	Marjanovic	51	C	11
Jusuf	Nurkic	27	C	15
Nikola	Jokic	15	C	12
Nikola	Vucevic	9	C	4
\.


--
-- Data for Name: klub; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.klub (idklub, imeklub, arenaklub, savdrzava, godosnutka) FROM stdin;
1	New York Knicks	Madison Square Garden	New York	1946
2	Golden State Warriors	Chase Center	California	1946
3	Milwaukee Bucks	Fiserv Forum	Wisconsin	1968
4	Chicago Bulls	United Center	Illinois	1966
5	Charlotte Hornets	Spectrum Center	North Carolina	1988
6	New Orleans Pelicans	Smoothie King Center	Lousiana	1988
7	LA Lakers	Staples Center	California	1947
8	Brooklyn Nets	Barclays Center	New York	1967
9	Boston Celtics	TD Garden	Massachusetts	1946
10	Phoenix Suns	Footprint Center	Arizona	1968
11	Dallas Mavericks	American Airlines Center	Texas	1980
12	Denver Nuggets	Ball Arena	Colorado	1967
13	Atlanta Hawks	State Farm Arena	Georgia	1946
14	Philadelphia 76ers	Wells Fargo Center	Pennsylvania	1946
15	Portland Trailblazers	Moda Center	Oregon	1970
\.


--
-- Data for Name: trener; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trener (idtrener, imetrener, prezimetrener, idklub) FROM stdin;
1	Chauncey	Billups	15
2	Doc	Rivers	14
3	Nate	McMillan	13
4	Michael	Malone	12
5	Jason	Kidd	11
6	Monty	Williams	10
7	Ime	Udoka	9
8	Steve	Nash	8
9	Frank	Vogel	7
10	Willie	Green	6
11	James	Borrego	5
12	Billy	Donovan	4
13	Mike	Budenholzer	3
14	Steve	Kerr	2
15	Tom	Thibodeau	1
\.


--
-- Name: igrac pkigrac; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.igrac
    ADD CONSTRAINT pkigrac PRIMARY KEY (brojdresa, idklub);


--
-- Name: klub pkklub; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.klub
    ADD CONSTRAINT pkklub PRIMARY KEY (idklub);


--
-- Name: trener pktrener; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trener
    ADD CONSTRAINT pktrener PRIMARY KEY (idtrener);


--
-- Name: trener uniqueidklub; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trener
    ADD CONSTRAINT uniqueidklub UNIQUE (idklub);


--
-- Name: igrac fkidklubigrac; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.igrac
    ADD CONSTRAINT fkidklubigrac FOREIGN KEY (idklub) REFERENCES public.klub(idklub);


--
-- Name: trener fkidklubtrener; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trener
    ADD CONSTRAINT fkidklubtrener FOREIGN KEY (idklub) REFERENCES public.klub(idklub);


--
-- PostgreSQL database dump complete
--


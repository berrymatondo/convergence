/*
  Warnings:

  - The values [METALS] on the enum `SectorList` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `symbol` to the `staticInfoCommo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IssuerList" AS ENUM ('SOVEREIGN', 'CORPORATE', 'INTERNATIONAL', 'SUPRANATIONAL');

-- CreateEnum
CREATE TYPE "MarketList" AS ENUM ('OECD', 'EMERGING');

-- CreateEnum
CREATE TYPE "CountryList" AS ENUM ('AFGHANISTAN', 'ALBANIA', 'ALGERIA', 'ANDORRA', 'ANGOLA', 'ANTIGUA_AND_BARBUDA', 'ARGENTINA', 'ARMENIA', 'AUSTRALIA', 'AUSTRIA', 'AZERBAIJAN', 'BAHAMAS', 'BAHRAIN', 'BANGLADESH', 'BARBADOS', 'BELARUS', 'BELGIUM', 'BELIZE', 'BENIN', 'BHUTAN', 'BOLIVIA', 'BOSNIA_AND_HERZEGOVINA', 'BOTSWANA', 'BRAZIL', 'BRUNEI', 'BULGARIA', 'BURKINA_FASO', 'BURUNDI', 'CABO_VERDE', 'CAMBODIA', 'CAMEROON', 'CANADA', 'CENTRAL_AFRICAN_REPUBLIC', 'CHAD', 'CHILE', 'CHINA', 'COLOMBIA', 'COMOROS', 'CONGO_DEMOCRATIC_REPUBLIC_OF_THE', 'CONGO_REPUBLIC_OF_THE', 'COSTA_RICA', 'CROATIA', 'CUBA', 'CYPRUS', 'CZECH_REPUBLIC', 'DENMARK', 'DJIBOUTI', 'DOMINICA', 'DOMINICAN_REPUBLIC', 'EAST_TIMOR', 'ECUADOR', 'EGYPT', 'EL_SALVADOR', 'EQUATORIAL_GUINEA', 'ERITREA', 'ESTONIA', 'ESWATINI', 'ETHIOPIA', 'FIJI', 'FINLAND', 'FRANCE', 'GABON', 'GAMBIA', 'GEORGIA', 'GERMANY', 'GHANA', 'GREECE', 'GRENADA', 'GUATEMALA', 'GUINEA', 'GUINEA_BISSAU', 'GUYANA', 'HAITI', 'HONDURAS', 'HUNGARY', 'ICELAND', 'INDIA', 'INDONESIA', 'IRAN', 'IRAQ', 'IRELAND', 'ISRAEL', 'ITALY', 'IVORY_COAST', 'JAMAICA', 'JAPAN', 'JORDAN', 'KAZAKHSTAN', 'KENYA', 'KIRIBATI', 'KOREA_NORTH', 'KOREA_SOUTH', 'KOSOVO', 'KUWAIT', 'KYRGYZSTAN', 'LAOS', 'LATVIA', 'LEBANON', 'LESOTHO', 'LIBERIA', 'LIBYA', 'LIECHTENSTEIN', 'LITHUANIA', 'LUXEMBOURG', 'MADAGASCAR', 'MALAWI', 'MALAYSIA', 'MALDIVES', 'MALI', 'MALTA', 'MARSHALL_ISLANDS', 'MAURITANIA', 'MAURITIUS', 'MEXICO', 'MICRONESIA', 'MOLDOVA', 'MONACO', 'MONGOLIA', 'MONTENEGRO', 'MOROCCO', 'MOZAMBIQUE', 'MYANMAR', 'NAMIBIA', 'NAURU', 'NEPAL', 'NETHERLANDS', 'NEW_ZEALAND', 'NICARAGUA', 'NIGER', 'NIGERIA', 'NORTH_MACEDONIA', 'NORWAY', 'OMAN', 'PAKISTAN', 'PALAU', 'PANAMA', 'PAPUA_NEW_GUINEA', 'PARAGUAY', 'PERU', 'PHILIPPINES', 'POLAND', 'PORTUGAL', 'QATAR', 'ROMANIA', 'RUSSIA', 'RWANDA', 'SAINT_KITTS_AND_NEVIS', 'SAINT_LUCIA', 'SAINT_VINCENT_AND_THE_GRENADINES', 'SAMOA', 'SAN_MARINO', 'SAO_TOME_AND_PRINCIPE', 'SAUDI_ARABIA', 'SENEGAL', 'SERBIA', 'SEYCHELLES', 'SIERRA_LEONE', 'SINGAPORE', 'SLOVAKIA', 'SLOVENIA', 'SOLOMON_ISLANDS', 'SOMALIA', 'SOUTH_AFRICA', 'SOUTH_SUDAN', 'SPAIN', 'SRI_LANKA', 'SUDAN', 'SURINAME', 'SWEDEN', 'SWITZERLAND', 'SYRIA', 'TAIWAN', 'TAJIKISTAN', 'TANZANIA', 'THAILAND', 'TOGO', 'TONGA', 'TRINIDAD_AND_TOBAGO', 'TUNISIA', 'TURKEY', 'TURKMENISTAN', 'TUVALU', 'UGANDA', 'UKRAINE', 'UNITED_ARAB_EMIRATES', 'UNITED_KINGDOM', 'UNITED_STATES', 'URUGUAY', 'UZBEKISTAN', 'VANUATU', 'VATICAN_CITY', 'VENEZUELA', 'VIETNAM', 'YEMEN', 'ZAMBIA', 'ZIMBABWE', 'EURO_ZONE', 'WEST_AFRICA_UEMOA');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CurrencyList" ADD VALUE 'AFN';
ALTER TYPE "CurrencyList" ADD VALUE 'ALL';
ALTER TYPE "CurrencyList" ADD VALUE 'DZD';
ALTER TYPE "CurrencyList" ADD VALUE 'AOA';
ALTER TYPE "CurrencyList" ADD VALUE 'XCD';
ALTER TYPE "CurrencyList" ADD VALUE 'ARS';
ALTER TYPE "CurrencyList" ADD VALUE 'AMD';
ALTER TYPE "CurrencyList" ADD VALUE 'AUD';
ALTER TYPE "CurrencyList" ADD VALUE 'AZN';
ALTER TYPE "CurrencyList" ADD VALUE 'BSD';
ALTER TYPE "CurrencyList" ADD VALUE 'BHD';
ALTER TYPE "CurrencyList" ADD VALUE 'BDT';
ALTER TYPE "CurrencyList" ADD VALUE 'BBD';
ALTER TYPE "CurrencyList" ADD VALUE 'BYN';
ALTER TYPE "CurrencyList" ADD VALUE 'BZD';
ALTER TYPE "CurrencyList" ADD VALUE 'XOF';
ALTER TYPE "CurrencyList" ADD VALUE 'BTN';
ALTER TYPE "CurrencyList" ADD VALUE 'BOB';
ALTER TYPE "CurrencyList" ADD VALUE 'BAM';
ALTER TYPE "CurrencyList" ADD VALUE 'BWP';
ALTER TYPE "CurrencyList" ADD VALUE 'BRL';
ALTER TYPE "CurrencyList" ADD VALUE 'BND';
ALTER TYPE "CurrencyList" ADD VALUE 'BGN';
ALTER TYPE "CurrencyList" ADD VALUE 'BIF';
ALTER TYPE "CurrencyList" ADD VALUE 'CVE';
ALTER TYPE "CurrencyList" ADD VALUE 'KHR';
ALTER TYPE "CurrencyList" ADD VALUE 'CAD';
ALTER TYPE "CurrencyList" ADD VALUE 'CLP';
ALTER TYPE "CurrencyList" ADD VALUE 'CNY';
ALTER TYPE "CurrencyList" ADD VALUE 'COP';
ALTER TYPE "CurrencyList" ADD VALUE 'KMF';
ALTER TYPE "CurrencyList" ADD VALUE 'CDF';
ALTER TYPE "CurrencyList" ADD VALUE 'CRC';
ALTER TYPE "CurrencyList" ADD VALUE 'HRK';
ALTER TYPE "CurrencyList" ADD VALUE 'CUP';
ALTER TYPE "CurrencyList" ADD VALUE 'CZK';
ALTER TYPE "CurrencyList" ADD VALUE 'DKK';
ALTER TYPE "CurrencyList" ADD VALUE 'DJF';
ALTER TYPE "CurrencyList" ADD VALUE 'DOP';
ALTER TYPE "CurrencyList" ADD VALUE 'EGP';
ALTER TYPE "CurrencyList" ADD VALUE 'ERN';
ALTER TYPE "CurrencyList" ADD VALUE 'SZL';
ALTER TYPE "CurrencyList" ADD VALUE 'ETB';
ALTER TYPE "CurrencyList" ADD VALUE 'FJD';
ALTER TYPE "CurrencyList" ADD VALUE 'GMD';
ALTER TYPE "CurrencyList" ADD VALUE 'GEL';
ALTER TYPE "CurrencyList" ADD VALUE 'GHS';
ALTER TYPE "CurrencyList" ADD VALUE 'GTQ';
ALTER TYPE "CurrencyList" ADD VALUE 'GNF';
ALTER TYPE "CurrencyList" ADD VALUE 'GYD';
ALTER TYPE "CurrencyList" ADD VALUE 'HTG';
ALTER TYPE "CurrencyList" ADD VALUE 'HNL';
ALTER TYPE "CurrencyList" ADD VALUE 'HUF';
ALTER TYPE "CurrencyList" ADD VALUE 'ISK';
ALTER TYPE "CurrencyList" ADD VALUE 'INR';
ALTER TYPE "CurrencyList" ADD VALUE 'IDR';
ALTER TYPE "CurrencyList" ADD VALUE 'IRR';
ALTER TYPE "CurrencyList" ADD VALUE 'IQD';
ALTER TYPE "CurrencyList" ADD VALUE 'ILS';
ALTER TYPE "CurrencyList" ADD VALUE 'JMD';
ALTER TYPE "CurrencyList" ADD VALUE 'JPY';
ALTER TYPE "CurrencyList" ADD VALUE 'JOD';
ALTER TYPE "CurrencyList" ADD VALUE 'KZT';
ALTER TYPE "CurrencyList" ADD VALUE 'KES';
ALTER TYPE "CurrencyList" ADD VALUE 'KPW';
ALTER TYPE "CurrencyList" ADD VALUE 'KRW';
ALTER TYPE "CurrencyList" ADD VALUE 'KWD';
ALTER TYPE "CurrencyList" ADD VALUE 'KGS';
ALTER TYPE "CurrencyList" ADD VALUE 'LAK';
ALTER TYPE "CurrencyList" ADD VALUE 'LBP';
ALTER TYPE "CurrencyList" ADD VALUE 'LSL';
ALTER TYPE "CurrencyList" ADD VALUE 'LRD';
ALTER TYPE "CurrencyList" ADD VALUE 'LYD';
ALTER TYPE "CurrencyList" ADD VALUE 'CHF';
ALTER TYPE "CurrencyList" ADD VALUE 'MGA';
ALTER TYPE "CurrencyList" ADD VALUE 'MWK';
ALTER TYPE "CurrencyList" ADD VALUE 'MYR';
ALTER TYPE "CurrencyList" ADD VALUE 'MVR';
ALTER TYPE "CurrencyList" ADD VALUE 'MRU';
ALTER TYPE "CurrencyList" ADD VALUE 'MUR';
ALTER TYPE "CurrencyList" ADD VALUE 'MXN';
ALTER TYPE "CurrencyList" ADD VALUE 'MDL';
ALTER TYPE "CurrencyList" ADD VALUE 'MNT';
ALTER TYPE "CurrencyList" ADD VALUE 'MAD';
ALTER TYPE "CurrencyList" ADD VALUE 'MZN';
ALTER TYPE "CurrencyList" ADD VALUE 'MMK';
ALTER TYPE "CurrencyList" ADD VALUE 'NAD';
ALTER TYPE "CurrencyList" ADD VALUE 'NPR';
ALTER TYPE "CurrencyList" ADD VALUE 'NZD';
ALTER TYPE "CurrencyList" ADD VALUE 'NIO';
ALTER TYPE "CurrencyList" ADD VALUE 'NGN';
ALTER TYPE "CurrencyList" ADD VALUE 'MKD';
ALTER TYPE "CurrencyList" ADD VALUE 'NOK';
ALTER TYPE "CurrencyList" ADD VALUE 'OMR';
ALTER TYPE "CurrencyList" ADD VALUE 'PKR';
ALTER TYPE "CurrencyList" ADD VALUE 'PAB';
ALTER TYPE "CurrencyList" ADD VALUE 'PGK';
ALTER TYPE "CurrencyList" ADD VALUE 'PYG';
ALTER TYPE "CurrencyList" ADD VALUE 'PEN';
ALTER TYPE "CurrencyList" ADD VALUE 'PHP';
ALTER TYPE "CurrencyList" ADD VALUE 'PLN';
ALTER TYPE "CurrencyList" ADD VALUE 'QAR';
ALTER TYPE "CurrencyList" ADD VALUE 'RON';
ALTER TYPE "CurrencyList" ADD VALUE 'RUB';
ALTER TYPE "CurrencyList" ADD VALUE 'RWF';
ALTER TYPE "CurrencyList" ADD VALUE 'WST';
ALTER TYPE "CurrencyList" ADD VALUE 'STN';
ALTER TYPE "CurrencyList" ADD VALUE 'SAR';
ALTER TYPE "CurrencyList" ADD VALUE 'RSD';
ALTER TYPE "CurrencyList" ADD VALUE 'SCR';
ALTER TYPE "CurrencyList" ADD VALUE 'SLL';
ALTER TYPE "CurrencyList" ADD VALUE 'SGD';
ALTER TYPE "CurrencyList" ADD VALUE 'SBD';
ALTER TYPE "CurrencyList" ADD VALUE 'SOS';
ALTER TYPE "CurrencyList" ADD VALUE 'ZAR';
ALTER TYPE "CurrencyList" ADD VALUE 'SSP';
ALTER TYPE "CurrencyList" ADD VALUE 'LKR';
ALTER TYPE "CurrencyList" ADD VALUE 'SDG';
ALTER TYPE "CurrencyList" ADD VALUE 'SRD';
ALTER TYPE "CurrencyList" ADD VALUE 'SEK';
ALTER TYPE "CurrencyList" ADD VALUE 'SYP';
ALTER TYPE "CurrencyList" ADD VALUE 'TWD';
ALTER TYPE "CurrencyList" ADD VALUE 'TJS';
ALTER TYPE "CurrencyList" ADD VALUE 'TZS';
ALTER TYPE "CurrencyList" ADD VALUE 'THB';
ALTER TYPE "CurrencyList" ADD VALUE 'TOP';
ALTER TYPE "CurrencyList" ADD VALUE 'TTD';
ALTER TYPE "CurrencyList" ADD VALUE 'TND';
ALTER TYPE "CurrencyList" ADD VALUE 'TRY';
ALTER TYPE "CurrencyList" ADD VALUE 'TMT';
ALTER TYPE "CurrencyList" ADD VALUE 'UGX';
ALTER TYPE "CurrencyList" ADD VALUE 'UAH';
ALTER TYPE "CurrencyList" ADD VALUE 'AED';
ALTER TYPE "CurrencyList" ADD VALUE 'GBP';
ALTER TYPE "CurrencyList" ADD VALUE 'UYU';
ALTER TYPE "CurrencyList" ADD VALUE 'UZS';
ALTER TYPE "CurrencyList" ADD VALUE 'VUV';
ALTER TYPE "CurrencyList" ADD VALUE 'VES';
ALTER TYPE "CurrencyList" ADD VALUE 'VND';
ALTER TYPE "CurrencyList" ADD VALUE 'YER';
ALTER TYPE "CurrencyList" ADD VALUE 'ZMW';
ALTER TYPE "CurrencyList" ADD VALUE 'ZWL';

-- AlterEnum
BEGIN;
CREATE TYPE "SectorList_new" AS ENUM ('AGRICULTURE', 'COMMUNICATION', 'CONSUMER', 'EDUCATION', 'ENERGY', 'FINANCE', 'FOOD', 'HEALTHCARE', 'INDUSTRIALS', 'LOGISTICS', 'MATERIALS', 'REAL_ESTATE', 'TECHNOLOGY', 'UTILITIES', 'OTHER');
ALTER TABLE "staticInfoCommo" ALTER COLUMN "sector" TYPE "SectorList_new" USING ("sector"::text::"SectorList_new");
ALTER TYPE "SectorList" RENAME TO "SectorList_old";
ALTER TYPE "SectorList_new" RENAME TO "SectorList";
DROP TYPE "SectorList_old";
COMMIT;

-- AlterTable
ALTER TABLE "staticInfoCommo" ADD COLUMN     "symbol" TEXT NOT NULL;
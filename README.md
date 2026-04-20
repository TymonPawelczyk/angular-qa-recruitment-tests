# Projekt E2E - Rekrutacja

Projekt został oparty o **Playwright** z językiem **TypeScript** i zaprojektowany zgodnie z najlepszymi branżowymi praktykami tworzenia oprogramowania testowego (Page Object Model, Custom Fixtures, Data-Driven Testing, CI/CD).

## Wymagania

- **Node.js**: v22.12.0
- **npm**: 10.9.0

## Szybki start (Uruchomienie projektu)

1. **Instalacja zależności:**
   W głównym katalogu projektu uruchom:

   ```bash
   npm install
   ```

   _Uwaga: Instalacja pobierze Playwright oraz domyślną przeglądarkę (Chromium). Jeśli przeglądarki nie zostały pobrane automatycznie, uruchom `npx playwright install`._

2. **Uruchomienie testów (tryb headless):**
   ```bash
   npm test
   ```

## Dostępne skrypty NPM

W pliku `package.json` zdefiniowano szereg pomocnych aliasów:

- `npm test` – Uruchamia wszystkie testy w tle (Chromium).
- `npm run test:ui` – Uruchamia testy z interaktywnym interfejsem graficznym Playwright (pozwala śledzić kroki, podglądać "time travel" i lokatory).
- `npm run test:headed` – Uruchamia testy z widocznym oknem przeglądarki.
- `npm run test:report` – Otwiera w przeglądarce raport HTML wygenerowany po ostatnim przebiegu testów.
- `npm run lint` – Uruchamia analizę statyczną kodu za pomocą **ESLint**.
- `npm run format` – Formatuje kod w całym projekcie przy użyciu **Prettier**.

## Architektura rozwiązania

Aby zapewnić maksymalną czytelność, utrzymywalność i skalowalność testów, projekt został podzielony na kilka kluczowych warstw:

1. **Page Object Model (POM)** (`/pages`)
   Logika interakcji z elementami strony (lokatory, kliknięcia, wypełnianie pól) została wydzielona do dedykowanych klas dla każdego widoku (`FormPage`, `NavigationPage`, `StepperPage`, `WelcomePage`). Dzięki temu same testy są wolne od szczegółów implementacyjnych HTML.

2. **Custom Fixtures** (`/fixtures`)
   Skonfigurowano własne Fixtures Playwrighta (plik `fixtures/index.ts`), które automatycznie inicjalizują i wstrzykują obiekty POM bezpośrednio do testów. Pozwala to uniknąć powtarzania kodu (np. `new FormPage(page)`) w każdym bloku `beforeEach`.

3. **Data-Driven Testing** (`/data`)
   Dane testowe (np. imiona, adresy wypełniające formularze) zostały oddzielone od kodu testów i przeniesione do pliku `test-data.ts`. Zwiększa to czytelność asercji oraz ułatwia modyfikację i rozszerzanie przypadków testowych.

4. **Linting i formatowanie** (`.prettierrc`, `eslint.config.mjs`)
   Projekt używa rygorystycznych zasad sprawdzania jakości kodu (ESLint + plugin Playwright) oraz automatycznego formatowania (Prettier), by zachować spójny standard.

5. **Ciągła Integracja (CI/CD)** (`.github/workflows`)
   Dodano gotowy plik konfiguracyjny `playwright.yml` dla **GitHub Actions**. Przy każdym pushu do gałęzi `main` (oraz dla Pull Requestów), GitHub automatycznie instaluje środowisko, uruchamia testy i udostępnia wygenerowany raport HTML (Playwright Report) w sekcji Artifacts jako plik `.zip`. Projekt ma również ustawione nagrywanie wideo w przypadku błędu (`video: 'retain-on-failure'`), co jest kluczowe podczas debugowania testów w środowisku CI.

## Zaimplementowane Scenariusze (8 testów)

W ramach zadania zaprojektowano następujące przypadki pokrywające pełną funkcjonalność aplikacji:

1. **Strona powitalna (`tests/welcome.spec.ts`)**
   - Weryfikacja zmiany wyświetlanego tekstu w "konsoli" strony głównej w reakcji na klikanie przycisków akcji z sekcji "Next Steps" (np. _Angular Material_, _Build for Production_).

2. **Nawigacja (`tests/navigation.spec.ts`)**
   - Sprawdzenie widoczności głównego bannera.
   - Pomyślne przejścia pomiędzy podstronami (`Welcome`, `Form`, `Stepper`) przy pomocy górnego menu nawigacyjnego.

3. **Formularz "Hero Form" (`tests/form.spec.ts`)**
   - Poprawne wypełnienie i wysłanie formularza. Walidacja nowego widoku (ekran podsumowania wysłanych danych).
   - Weryfikacja działania przycisku "New Hero" i poprawnego resetowania stanu pól.

4. **Wieloetapowy formularz "Stepper" (`tests/stepper.spec.ts`)**
   - Kompletne "Happy Path": przejście przez wszystkie kroki formularza (Name -> Address -> Done) oraz weryfikacja poprawności zebranych danych na ekranie podsumowującym.
   - Nawigacja wstecz: przetestowanie przycisku "Back" z kroku 2 do kroku 1 i weryfikacja utrzymania uprzednio wpisanego stanu (danych).
   - Pełny reset procesu (przycisk "Reset") z weryfikacją wyczyszczenia zebranych danych formularza i powrotu do zakładki startowej.

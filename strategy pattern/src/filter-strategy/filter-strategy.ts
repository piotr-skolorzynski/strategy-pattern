/*
Ten zapis to wzorzec ReadOnly Object Enum (często używany jako alternatywa dla tradycyjnych enum). 
Oto co dzieje się krok po kroku:
1. Obiekt jako słownik: Tworzysz obiekt FilterOption, który mapuje czytelne klucze (np. Even) 
na konkretne wartości tekstowe (np. 'even').
2. as const (Const Assertion): To kluczowy element. Informuje on TypeScript, że:
Wszystkie pola są tylko do odczytu (readonly).
Wartości nie są traktowane jako ogólne stringi, ale jako konkretne typy literalne 
(np. Even to dokładnie 'even', a nie po prostu string).
3. Typowanie: Dzięki temu zapisowi możesz w łatwy sposób wyciągnąć unię typów dla swoich funkcji:
type FilterType = typeof FilterOption[keyof typeof FilterOption];
// Wynik: "even" | "odd" | "positive" | "negative"
Dlaczego tak, a nie zwykły enum?
Wiele osób woli to rozwiązanie, ponieważ enum w TS ma swoje specyficzne zachowania (np. trudniejsze mapowanie), a zwykły obiekt z as const jest czystym kodem JavaScript po skompilowaniu i zachowuje pełne bezpieczeństwo typów.
*/
export const FilterOption = {
    Even: 'even',
    Odd: 'odd',
    Possitive: 'positive',
    Negative: 'negative'
} as const;

export type FilterOption = typeof FilterOption[keyof typeof FilterOption];

class FilterStrategy {
    #filterringStrategies = new Map<string, (v: number, idx?:number, collection?: number[]) => boolean>([
        [FilterOption.Even, (v: number) => v % 2 === 0],
        [FilterOption.Odd, (v: number) => v % 2 !== 0],
        [FilterOption.Possitive, (v: number) => v > 0],
        [FilterOption.Negative, (v: number) => v < 0]
    ]);

    public select(collection: number[], strategy: string): number[] | null {
        if(!collection.length || !this.#filterringStrategies.has(strategy))
        {
            return null;
        }

        const predicate = this.#filterringStrategies.get(strategy);

        return predicate ? collection.filter(predicate) : null;
    }
}

export const filteringStrategy = new FilterStrategy();
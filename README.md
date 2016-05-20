# errors-in-ydkjs-scope-closures-book

> Problem ze składnią ES6 znaleziony na stronie 84 w książce: ["Tajniki języka JavaScript. Zakresy i domknięcia"][1].

## Problemy

Problem leży w tym, że kod z książki się nie uruchomi.  Lista 5 błędów:

1. pierwszy problem to ścieżki, do plików lokalnych trzeba odnosić się poprzez `.` na początku
2. nie ma w specyfikacji `ECMAScript 6` słowa operatora `module` (taki w stylu import)
3. nie ma takiej składni eksportowania jak `export hello;` ([lista dostępnych możliwości][2]), trzeba eksportować tak `export {hello};`
4. nie można zmienić nazwy importowanego modułu `import foo from "./foo";`, należy wskazać, że API z pliku `foo.js`, będzie w obiekcie poprzez takie kod: `import * as foo from "./foo";` ([lista wszystkich możliwości importowania][3])
5. jeżeli chcemy z modułu wyciągnąć tylko jedną funkcję to trzeba opakować ja w `curly braces`, zamiast `import hello from "bar";` trzeba `import {hello} from "bar";`

## Jak przetestować?

Przed przystąpieniem do testów należy uruchomić:

```
npm install
```

* Jak uruchomić działające przykłady?
    
    ```
    npm run build:works
    ```

* Jak zweryfikować, że oryginalne nie działają?
    
    ```
    npm run build:original
    ```

## Źródła (prosto z książki)

`bar.js`

```js
function hello(who) {
    return "Pozwól, że się przedstawię: " + who;
}

export hello;
```

`foo.js`

```js
// Import jedynie funkcji hello() z modułu "bar"
import hello from "bar";

var hungry = "hipopotam";

function awesome() {
    console.log(
        hello( hungry ).toUpperCase()
    );
}

export awesome;
```

`baz.js`

```js
// Import całych modułów "foo" i "bar"
module foo from "foo";
module bar from "bar";

console.log(
    bar.hello( "nosorożec" )
); // Pozwól, że się przedstawię: nosorożec

foo.awesome(); // POZWÓL, ŻE SIĘ PRZEDSTAWIĘ: HIPOPOTAM
```

## Poprawiony kod

`bar.js`

```js
function hello(who) {
    return "Pozwól, że się przedstawię: " + who;
}

export {hello};
```

`foo.js`

```js
// Import jedynie funkcji hello() z modułu "bar"
import {hello} from "./bar";

var hungry = "hipopotam";

function awesome() {
    console.log(
        hello( hungry ).toUpperCase()
    );
}

export {awesome};
```

`baz.js`

```js
// Import całych modułów "foo" i "bar"
import * as foo from "./foo";
import * as bar from "./bar";

console.log(
    bar.hello( "nosorożec" )
); // Pozwól, że się przedstawię: nosorożec

foo.awesome(); // POZWÓL, ŻE SIĘ PRZEDSTAWIĘ: HIPOPOTAM
```

[1]: http://helion.pl/ksiazki/tajniki-jezyka-javascript-zakresy-i-domkniecia-kyle-simpson,tjszak.htm
[2]: http://www.ecma-international.org/ecma-262/6.0/index.html#table-42
[3]: http://www.ecma-international.org/ecma-262/6.0/index.html#table-40

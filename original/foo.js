// Import jedynie funkcji hello() z modułu "bar"
import hello from "bar";

var hungry = "hipopotam";

function awesome() {
    console.log(
        hello( hungry ).toUpperCase()
    );
}

export awesome;

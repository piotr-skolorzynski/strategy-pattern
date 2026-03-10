
const DOWN_RANGE = -100;
const UP_RANGE = 100;
const ITERATIONS = 20;

const getRandomInt = () :number =>  Math.floor(Math.random() * (UP_RANGE - DOWN_RANGE + 1)) + DOWN_RANGE;

export const generateRandomIntegers = (): number[] => {
    const numbers = [];
    for (let i = 0; i < ITERATIONS; i++)
    {
        numbers.push(getRandomInt());
    }

    return Array.from(new Set(numbers)).sort((a: number,b: number) => a - b);
} 
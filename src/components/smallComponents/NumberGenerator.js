export const numberGenerator = () => {
    const newNumbers = [];
    for (let i = 0; i < 5; i++) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        newNumbers.push(randomNumber);
    }
    const numbers = (newNumbers.join(""));
    return numbers
};
class EventSimulator {
    constructor(eventMap){
        // check if the eventMap is array and its not empty
        if(!Array.isArray(eventMap) || eventMap.length === 0 ){
            throw new Error("Invalid input : EventMap must be an non-empty array");
        }
        
        // check if the probability is valid for the eventMap
        const isValidProbability = eventMap.every(e => {
            const probability = Object.values(e)[0];
            return typeof probability === 'number' && probability >= 0 && probability <=100;
        })

        if(!isValidProbability){
            throw new Error("Invalid probability: Probalities should be a number between 0 and 100");
        }
    
        this.eventMap = eventMap;
        this.tot_probability = this.probabilityCalc();
    }

    //calculates the total probability
    probabilityCalc() {
        return this.eventMap.reduce((acc, e) => acc + Object.values(e)[0], 0);
    }

    // Simulate all the events
    simulateEvents() {
        
        // check if the total probalities add upto 100
        if(!this.tot_probability === 100 || !this.tot_probability === 0){
            throw new Error("Invalid Event Probabilities: Probabalities should add up to 100")
        }

        const random = Math.random() * this.tot_probability;
        let currentProbability = 0;

        //Loop through each event to get outcome based on the probability
        for(const e of this.eventMap){
            const outcome = Object.keys(e);
            const probability = Object.values(e);
            currentProbability += probability

            if(random <= currentProbability){
                return outcome;
            }
        }
    }
}


// Example Usage
const coinOutcomes = [
    {"Head" : 35},
    {"Tail" : 65}, 
]

const coinSimulator = new EventSimulator(coinOutcomes);
// console.log(coinSimulator.simulateEvents());
console.log("\nFlipping a biased coin");

try{
    for(let i = 0; i < 5; i++){
        const outcome = coinSimulator.simulateEvents();   
        console.log(`Outcome ${i + 1}: ${outcome}`);
    }
} catch(error) {
    console.error("Error : ", error.message);
}
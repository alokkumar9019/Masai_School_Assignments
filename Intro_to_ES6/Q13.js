/* Given an array of people objects like:
const people = [ { name: "Alice", address: { city: "New York", street: { name: "Broadway", number: 123 } } }, { name: "Bob", address: { city: "Los Angeles", street: { name: "Sunset Boulevard", number: 456 } } } ];

Use multi-level destructuring to extract:
name of each person.
city and street name from the address.
Return an array of strings in the format: "Alice lives in New York on Broadway".
Example Input:

const people = [ { name: "Alice", address: { city: "New York", street: { name: "Broadway", number: 123 } } }, { name: "Bob", address: { city: "Los Angeles", street: { name: "Sunset Boulevard", number: 456 } } } ]

Example Output:
["Alice lives in New York on Broadway", "Bob lives in Los Angeles on Sunset Boulevard"] */

const people = [ { name: "Alice", address: { city: "New York", street: { name: "Broadway", number: 123 } } }, { name: "Bob", address: { city: "Los Angeles", street: { name: "Sunset Boulevard", number: 456 } } } ];

const res=[];
for(const person of people){
    let {
        name,
        address:{ 
            city, 
            street: {name: streetName }
        }
    } = person;
    res.push(`${name} lives in ${city} on ${streetName}`);
}

console.log(res);
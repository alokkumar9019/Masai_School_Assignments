/* Given a user object with the following structure:
const user = { id: 123, profile: { name: "John Doe", address: { city: "Los Angeles", zipcode: "90001" } } };

Use destructuring along with optional chaining to extract:
id from the user object.
name from the profile.
city and zipcode from the address.
If any of the properties are missing (e.g., no address object), return "Information not available" for the missing field.
Return a string in the following format: "User John Doe (ID: 123) lives in Los Angeles (ZIP: 90001)". If some data is missing, adjust the sentence accordingly, for example: "User John Doe (ID: 123) lives in Los Angeles (ZIP: Information not available)".
Example Input: const user = { id: 123, profile: { name: "John Doe", address: { city: "Los Angeles", zipcode: "90001" } } };

Example Output:

"User John Doe (ID: 123) lives in Los Angeles (ZIP: 90001)" */

const user = { id: 123, profile: { name: "John Doe", address: { city: "Los Angeles", zipcode: "90001" } } };

let {
    id="Information not available",
    profile: {
        name="Information not available",
        address: {
            city="Information not available",
            zipcode="Information not available"
        } ={}
    } ={}
} = user;
let res = `User ${name} (ID:${id}) lives in ${city} (ZIP: ${zipcode})`;
console.log(res);
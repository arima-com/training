// let hobbies = ['Sports', 'Cooking'];
let hobbies: (string|number)[] = ['Sports', 'Cooking'];

hobbies.push('Reading');
hobbies.push(10);

// let users: (string|number)[];
let users: Array<string|number>;

users = [1, 'Max'];
users = [30, 20];
users = ['Smith', 'John'];

let possibleResults: [number, number]; // [1, -1]

possibleResults = [1, 2];
// possibleResults = [1, 2, 3];

let user: {
    name: string;
    age: number|string;
    hobbies: string[];
    role: {
        description: string;
        id: number;
    }
} = {
    name: 'Max',
    age: 'inifinity',
    hobbies: ['Sports', 'Cooking'],
    role: {
        description: 'Developer',
        id: 1
    }
};
